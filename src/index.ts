/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import path from 'path';
import glob from 'glob';
import fs from 'fs';
import yaml from 'js-yaml';

interface SelectorMap {
    [s: string]: string | Function;
}

const mappers: { [s: string]: (file: string) => SelectorMap } = {
    js: (file) => require(file).default,
    json: (file) => JSON.parse(fs.readFileSync(file, 'utf8')),
    yaml: (file) => yaml.safeLoad(fs.readFileSync(file, 'utf8')),
};
// alias
mappers.yml = mappers.yaml;

export const setupSelectors = (patterns: string[]) => {
    const cwd = process.cwd();
    const importedSelectors = patterns
        .map((pattern) => glob.sync(pattern))
        .reduce((acc, value) => acc.concat(value), [])
        .map((file) => {
            const extension = file.split('.').pop()!;
            const mapper = mappers[extension];
            if (!mapper) {
                throw new Error(`Unknown file type for selector file: "${file}"`);
            }
            return mapper(path.join(cwd, file));
        });

    const selectors: SelectorMap = Object.assign({}, ...importedSelectors);
    global.getSelector = (key) => {
        const selector = selectors[key];
        if (!selector) {
            throw new Error(`Missing selector definition for "${key}"`);
        }
        return selector;
    };
    return global.getSelector;
};

global.selectedStepsTextMethod = 'getText';

export const setupTextMethod = (method: 'getText' | 'textContent') => {
    global.selectedStepsTextMethod = method;
};
