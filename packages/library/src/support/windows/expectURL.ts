import { getUrlOrPath } from '../helpers';
import { failMessage } from '../failMessage';

/**
 * Check if the current URL or path matches the given value
 * @param type          The type to check
 * @param reverse       Check for opposite state
 * @param expectedValue The expected value to match against
 */
export default (type: 'url' | 'path', reverse: boolean, expectedValue: string): void => {
    const value = getUrlOrPath(type);

    if (reverse) {
        failMessage(() => expect(value).not.toBe(expectedValue), `expected ${type} to not be "${value}"`);
    } else {
        failMessage(() => expect(value).toBe(expectedValue), `expected ${type} to be "${expectedValue}" but was "${value}"`);
    }
};
