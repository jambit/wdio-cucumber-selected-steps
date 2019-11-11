import { expect } from 'chai';
import focusLastOpenedWindow from './focusLastOpenedWindow';
import expectNewWindow from './expectNewWindow';
import { getUrlOrPath } from '../helpers';

/**
 * Check if the given URL or path was opened in a new window
 * @param type          The type to check
 * @param expectedValue The expected value to match against
 */
export default (type: 'url' | 'path', expectedValue: string) => {
    expectNewWindow();
    focusLastOpenedWindow();

    const value = getUrlOrPath(type);

    expect(value).to.equal(expectedValue, `Expected new window to have ${type} ${expectedValue} but was: ${value}`);
};
