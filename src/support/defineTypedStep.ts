import { defineStep, StepDefinitionCode, StepDefinitionOptions } from 'cucumber';

import { ParamType } from './paramType';

function wrapStep(paramTypes: ParamType[], fn: Function): StepDefinitionCode {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function wrapped(this: any, ...args: any[]) {
        return fn.apply(this, paramTypes.map((paramType, index) => paramType(args[index])));
    }
    Object.defineProperty(wrapped, 'name', { value: fn.name });
    Object.defineProperty(wrapped, 'length', { value: paramTypes.length });
    return wrapped;
}

/**
 * Define a typed step
 * @param pattern   The regular expression used to match the step
 * @param types     The param types used to map the expression matches to actual values
 * @param options   The options to use (optional)
 * @param code      The function to execute
 * @see paramType
 */
export function defineTypedStep(pattern: RegExp | string, types: ParamType[], options: StepDefinitionOptions, code?: StepDefinitionCode): void;
export function defineTypedStep(pattern: RegExp | string, types: ParamType[], options: StepDefinitionCode): void;
export function defineTypedStep(
    pattern: RegExp | string,
    types: ParamType[],
    options: StepDefinitionOptions | StepDefinitionCode,
    code?: StepDefinitionCode,
) {
    if (typeof options === 'function') {
        defineStep(pattern, wrapStep(types, options));
    } else {
        defineStep(pattern, options, wrapStep(types, code!));
    }
}
