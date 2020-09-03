/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import path from 'path';
import glob from 'glob';
import fs from 'fs';
import yaml from 'js-yaml';

// FIXME: Keep in sync with global.d.ts!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectorData = string | number | boolean | null | ((...args: any) => any) | SelectorData[] | { [s: string]: SelectorData };
export type SelectorVarValue = string | number | (() => string | number);
export type SelectedStepsTextMethod = 'getText' | 'textContent';

interface SelectorMap {
    [s: string]: SelectorData;
}

const mappers: { [s: string]: (file: string) => SelectorMap } = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    js: (file) => require(file).default,
    json: (file) => JSON.parse(fs.readFileSync(file, 'utf8')),
    yaml: (file) => yaml.safeLoad(fs.readFileSync(file, 'utf8')) as unknown as SelectorMap,
};
// alias
mappers.yml = mappers.yaml;

global.getSelector = () => {
    throw new Error('Selectors have not been set up yet!');
};

export const setupSelectors = (patterns: string[]): void => {
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
    global.getSelector = (key: string) => {
        const selector = selectors[key];
        if (!selector) {
            throw new Error(`Missing selector definition for "${key}"`);
        }
        return replacePlaceholders(selector);
    };
};

const placeholders: Array<{ search: string; replace: SelectorVarValue; }> = [];
function replacePlaceholders(selector: SelectorData): SelectorData {
    if (typeof selector === 'string') {
        return placeholders.reduce((result, placeholder) => {
            const value = typeof placeholder.replace === 'function' ? placeholder.replace() : placeholder.replace;
            return result.split(placeholder.search).join(value.toString());
        }, selector);
    }
    if (Array.isArray(selector)) {
        return selector.map(replacePlaceholders);
    }
    if (selector && typeof selector === 'object') {
        return Object.keys(selector).reduce((acc, key) => {
            acc[key] = replacePlaceholders(selector[key]);
            return acc;
        }, {} as { [s: string]: SelectorData });
    }
    return selector;
}

export const setSelectorVariable = (key: string, replace: SelectorVarValue): void => {
    const search = `{{${key}}}`;
    const existing = placeholders.find((p) => p.search === search);
    if (existing) {
        existing.replace = replace;
    } else {
        placeholders.push({
            search,
            replace,
        });
    }
};

global.setSelectorVariable = setSelectorVariable;

global.selectedStepsTextMethod = 'getText';

export const setupTextMethod = (method: SelectedStepsTextMethod): void => {
    global.selectedStepsTextMethod = method;
};
