import { expect } from 'chai';
import { getUrlOrPath } from '../helpers';

/**
 * Check if the given string is in the URL path
 * @param type          The type to check
 * @param reverse       Check for opposite state
 * @param expectedPart  The string to check for
 */
export default (type: 'url' | 'path', reverse: boolean, expectedPart: string) => {
    const value = getUrlOrPath(type);

    if (reverse) {
        expect(value).to.not.contain(expectedPart, `Expected ${type} "${value}" to not contain "${expectedPart}"`);
    } else {
        expect(value).to.contain(expectedPart, `Expected ${type} "${value}" to contain "${expectedPart}"`);
    }
};
