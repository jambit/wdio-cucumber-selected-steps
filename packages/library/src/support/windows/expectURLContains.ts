import { getUrlOrPath } from '../helpers';
import { failMessage } from '../failMessage';

/**
 * Check if the given string is in the URL path
 * @param type          The type to check
 * @param reverse       Check for opposite state
 * @param expectedPart  The string to check for
 */
export default (type: 'url' | 'path', reverse: boolean, expectedPart: string): void => {
    const value = getUrlOrPath(type);
    const contains = value.includes(expectedPart);

    if (reverse) {
        failMessage(() => expect(contains).not.toBe(true), `Expected ${type} "${value}" to not contain "${expectedPart}"`);
    } else {
        failMessage(() => expect(contains).toBe(true), `Expected ${type} "${value}" to contain "${expectedPart}"`);
    }
};
