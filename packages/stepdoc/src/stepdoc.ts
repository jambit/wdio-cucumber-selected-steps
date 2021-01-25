#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import documentation, { Comment } from 'documentation';
import nunjucks from 'nunjucks';
import MurmurHash3 from 'imurmurhash';
import {
    StepDocConfig,
    StepDocExecutionConfig,
} from './configTypes';
import {
    TemplateData,
    StepFile,
    StepParam,
    Step,
} from './templateTypes';

const STEP_REGEX = /\/\^([^$/]*)\$\/,\s*\[([^\]]*)\],([^);]*)\);/g;
const PARAMS_REGEX = /paramType\.([^,]*),?/g;
const SET_BOOL_REGEX = /^bool\.set(True|False)\(([^)]+)\)$/;
const FILE_TITLE_REGEX = /^.*\/(.*)\.ts$/;

function parseStepParams(paramsStr: string, comment: Comment, method: string): StepParam[] {
    PARAMS_REGEX.lastIndex = 0;

    const paramTypes: string[] = [];
    let m = PARAMS_REGEX.exec(paramsStr);
    while (m) {
        const [, paramType] = m;
        paramTypes.push(paramType);
        m = PARAMS_REGEX.exec(paramsStr);
    }
    const descriptions = comment.params.map((param) => param.description.children[0].children[0].value);
    if (descriptions.length !== paramTypes.length) {
        throw new Error(`'${method}' has parameter length mismatch between step definition and comment descriptions`);
    }
    const types = comment.params.map((param) => param.type);
    if (types.length !== paramTypes.length) {
        throw new Error(`'${method}' has parameter length mismatch between step definition and comment param types`);
    }

    return paramTypes.map((name, index) => {
        const match = SET_BOOL_REGEX.exec(name);
        const param: StepParam = {
            type: name,
            description: descriptions[index].replace(/elements? query/, 'selector key'),
        };
        const type = types[index];

        if (match) {
            const matching = match[1] === 'True';
            param.bool = {
                matching: matching ? 'true' : 'false',
                match: match[2],
                notMatching: matching ? 'false' : 'true',
            };
        } else if (name === 'string' && type && type.type === 'UnionType') {
            param.union = type.elements.map((s) => JSON.stringify(s.value));
        }
        return param;
    });
}

function parseStepFile(file: string, comments: Comment[]): StepFile {
    const data = fs.readFileSync(file, 'utf-8');
    STEP_REGEX.lastIndex = 0;

    const match = FILE_TITLE_REGEX.exec(file);
    if (!match) {
        throw new Error(`File path '${file}' did not match regular expression ${FILE_TITLE_REGEX}`);
    }
    const title = match[1];
    const steps: Step[] = [];
    let m = STEP_REGEX.exec(data);
    while (m) {
        const [, regex, paramsStr, optionsAndFunctionStr] = m;
        const optionsAndFunctionsParts = optionsAndFunctionStr.split(',');
        const remainder = optionsAndFunctionsParts.pop()!.trim();
        const functionName = remainder || optionsAndFunctionsParts.pop()?.trim();
        if (!functionName) {
            throw new Error(`Could not detect function name for regex '${regex}'`);
        }
        const comment = comments.find((e) => e.name === functionName);
        if (!comment) {
            throw new Error(`Comment '${functionName}' not found in documentation data`);
        }
        steps.push({
            regex,
            anchor: `${title}-step-${MurmurHash3(regex).result().toString(16)}`,
            params: parseStepParams(paramsStr, comment, functionName),
            description: comment.description.children[0].children[0].value,
            options: optionsAndFunctionsParts.join(',').replace(/\s+/g, ' ').trim(),
            functionName,
        });
        m = STEP_REGEX.exec(data);
    }
    return {
        title,
        steps,
    };
}

const buildArgs = (input: string, extensions: string[]) => ({
    'parse-extension': extensions,
    pe: extensions,
    parseExtension: extensions,
    external: null,
    input: glob.sync(input),
});

async function execute(config: StepDocExecutionConfig, files: StepFile[]) {
    let before = '';
    let after = '';
    if (config.replaceStart) {
        const readme = fs.readFileSync(config.file, 'utf-8');
        const start = readme.indexOf(config.replaceStart);
        if (start === -1) {
            throw new Error(`Could not find replaceStart: '${config.replaceStart}'`);
        }
        before = readme.substr(0, start + config.replaceStart.length);
        if (config.replaceEnd) {
            const end = readme.indexOf(config.replaceEnd, start + 1);
            if (end === -1) {
                throw new Error(`Could not find replaceEnd: '${config.replaceEnd}'`);
            }
            after = readme.substr(end);
        }
    }

    const data: TemplateData = {
        files,
        context: config.context,
    };

    const templatePath = config.templatePath || path.join(__dirname, '..', 'templates');
    const rendered = nunjucks.configure(templatePath, config.options || {}).render(config.template, data);

    fs.writeFileSync(config.file, `${before}${rendered}${after}`);
}

async function run(config: StepDocConfig) {
    try {
        const argv = buildArgs(config.supportFiles, ['ts']);
        const comments: Comment[] = await documentation.build(argv.input, argv);

        const fileData = glob.sync(config.stepFiles).map((file) => parseStepFile(file, comments));
        await Promise.all(config.executions.map((executionConfig) => execute(executionConfig, fileData)));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run(JSON.parse(fs.readFileSync(`${process.cwd()}/stepdoc.json`, 'utf-8')));
