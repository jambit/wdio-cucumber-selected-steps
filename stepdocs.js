const fs = require('fs');
const supportDocs = require('./docs/raw.json');

const STEP_REGEX = /\/\^([^$/]*)\$\/,\s*\[([^\]]*)\],([^);]*)\);/g;
const PARAMS_REGEX = /paramType\.([^,]*),/g;

const SET_BOOL_REGEX = /^bool\.set(True|False)\(([^)]+)\)$/;

function getSupportDoc(method) {
    const doc = supportDocs.find(e => e.name === method);
    if (!doc) {
        throw new Error(`Method '${method}' not found in docs/raw.json`);
    }
    return doc;
}

function getSupportParamDescriptions(doc) {
    return doc.params.map(param => param.description.children[0].children[0].value);
}

function getSupportParamTypes(doc) {
    return doc.params.map(param => param.type);
}

function getSupportDescription(doc) {
    return doc.description.children[0].children[0].value;
}

function extractParamTypes(paramsStr, doc, method) {
    PARAMS_REGEX.lastIndex = 0;

    const paramTypes = [];
    let m = PARAMS_REGEX.exec(paramsStr);
    while (m) {
        const [, paramType] = m;
        paramTypes.push(paramType);
        m = PARAMS_REGEX.exec(paramsStr);
    }
    const descriptions = getSupportParamDescriptions(doc);
    if (descriptions.length !== paramTypes.length) {
        throw new Error(`'${method}' has parameter length mismatch between step definition and support method`);
    }
    const types = getSupportParamTypes(doc);
    if (types.length !== paramTypes.length) {
        throw new Error(`'${method}' has parameter length mismatch between step definition and support method`);
    }

    return paramTypes.map((name, index) => ({
        name,
        description: descriptions[index],
        type: types[index],
    }));
}

function extractStepsFromFile(file) {
    const data = fs.readFileSync(`./src/steps/${file}`);
    STEP_REGEX.lastIndex = 0;

    const steps = [];
    let m = STEP_REGEX.exec(data);
    while (m) {
        const [, regex, paramsStr, methodStr] = m;
        const methodParts = methodStr.split(',');
        methodParts.pop();
        const method = methodParts.pop().trim();
        const doc = getSupportDoc(method);
        steps.push({
            regex,
            params: extractParamTypes(paramsStr, doc, method),
            description: getSupportDescription(doc),
            options: methodParts.join(','),
            method,
        });
        m = STEP_REGEX.exec(data);
    }
    return steps;
}

function paramTypeToMarkdown(paramType) {
    const match = SET_BOOL_REGEX.exec(paramType.name);
    let namePart;
    if (match) {
        namePart = `\`bool\` -> \`${match[1].toLowerCase()}\` = \`${match[2]}\` and \`false\` = anything else`;
    } else if(paramType.name === 'string' && paramType.type && paramType.type.type === 'UnionType') {
        const types = paramType.type.elements.map(s=> JSON.stringify(s.value)).join(' | ');
        namePart = `\`${paramType.name}\` -> \`${types}\``;
    } else {
        namePart = `\`${paramType.name}\``;
    }
    const description = paramType.description.replace(/elements? query/, 'selector key');
    return `  * ${namePart}\n    * ${description}`;
}

const stepOptionsToMarkdown = options => (!options ? '' : `
* **Step options:**
  * \`${options.replace(/\s+/g, ' ').trim()}\``);

const files = fs.readdirSync('./src/steps');
const markdown = files.map((file) => {
    const fileTitle = file.replace('.ts', '');
    const stepToMarkdown = (step, index) => `- [\`${step.regex}\`](STEPS.md#${fileTitle}-step-${index})\\
-> ${step.description}`;
    const steps = extractStepsFromFile(file);
    return `## ${fileTitle}\n\n${steps.map(stepToMarkdown).join('\n')}`;
}).join('\n');
const markdownFull = files.map((file) => {
    const fileTitle = file.replace('.ts', '');
    const stepToFullMarkdown = (step, index) => `### \`${step.regex}\`<a name="${fileTitle}-step-${index}"></a>

${step.description}

* **ParamTypes:**
${step.params.map(paramTypeToMarkdown).join('\n')}
* **Calls:**
  * \`${step.method}()\`${stepOptionsToMarkdown(step.options)}
    `;

    const steps = extractStepsFromFile(file);
    return `## ${fileTitle}\n\n${steps.map(stepToFullMarkdown).join('\n')}`;
}).join('\n');

const readme = fs.readFileSync('README.md').toString();

const START_LINE = '\n# List of included steps\n\n';
const start = readme.indexOf(START_LINE);
const end = readme.indexOf('\n\n# ', start + 1);
const before = readme.substr(0, start + START_LINE.length);
const after = readme.substr(end);

const prefixNotice = 'All of these steps can be used with `Given`, `When`, `Then` and `And`.\n\n';

fs.writeFileSync('./README.md', `${before}${prefixNotice}${markdown.trim()}${after}`);

fs.writeFileSync('./STEPS.md', `# Detailed list of included steps\n\n${prefixNotice}${markdownFull}`);
