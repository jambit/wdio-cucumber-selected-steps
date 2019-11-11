import { expect } from 'chai';
import { getUrlOrPath } from '../helpers';

/**
 * Check if the current URL or path matches the given value
 * @param type          The type to check
 * @param reverse       Check for opposite state
 * @param expectedValue The expected value to match against
 */
export default (type: 'url' | 'path', reverse: boolean, expectedValue: string) => {
    const value = getUrlOrPath(type);

    if (reverse) {
        expect(value).to.not.equal(expectedValue, `expected ${type} to not be "${value}"`);
    } else {
        expect(value).to.equal(expectedValue, `expected ${type} to be "${expectedValue}" but was "${value}"`);
    }
};
