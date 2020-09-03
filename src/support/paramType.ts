import { elementQuery, elementsQuery } from './elementQuery';

/**
 * Conversion function for input values from .feature files
 */
export interface ParamType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: string): any;
}

/**
 * Conversion function for input values from .feature files, with possibility to use optional.
 */
export interface ParamTypeWithOptional extends ParamType {
    /** Use if the parameter can be undefined */
    optional: ParamType;
}

/**
 * Conversion function for input values from .feature files, with possibility to use optional.
 */
export interface ParamTypeBool extends ParamTypeWithOptional {
    /** The parameter is expected to be a string. If it matches `trueValue`, true is returned, otherwise false. */
    setTrue(trueValue: string): ParamTypeWithOptional;
    /** The parameter is expected to be a string. If it matches `falseValue`, false is returned, otherwise true. */
    setFalse(falseValue: string): ParamTypeWithOptional;
}

/**
 * Helper to add an 'optional' method to the function to make a parameter optional.
 * @param fn The function to add the 'optional' attribute to.
 */
export function addOptional(fn: ParamType): ParamTypeWithOptional {
    return Object.assign(fn, { optional: (value: string) => (value ? fn(value) : undefined) });
}

/**
 * Built-in ParamTypes. Use <property>.optional() instead if it is optional.
 */
export const paramType = {
    /** The parameter is expected to be a `string`. No conversion done. */
    string: addOptional((value) => value),
    /** The parameter is expected to be an `integer`. `parseInt()` is applied. */
    int: addOptional((value) => parseInt(value, 10)),
    /** The parameter is expected to be a `float`. `parseFloat()` is applied. */
    float: addOptional((value) => parseFloat(value)),
    /** The parameter is expected to be a `boolean` value. `!!` is applied. */
    bool: Object.assign(addOptional((value) => !!value), {
        setTrue: (trueValue: string) => addOptional((value) => value === trueValue),
        setFalse: (falseValue: string) => addOptional((value) => value !== falseValue),
    }) as ParamTypeBool,
    /** The parameter is expected to be a selector key. `getSelector()` is applied. */
    selector: addOptional((value) => global.getSelector(value)),
    /** The parameter is expected to be a selector key. `elementQuery()` is applied. */
    element: addOptional((value) => elementQuery(value)),
    /** The parameter is expected to be a selector key. `elementsQuery()` is applied. */
    elements: addOptional((value) => elementsQuery(value)),
};
