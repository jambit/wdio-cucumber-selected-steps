import { failMessage } from '../failMessage';

/**
 * Check the content of a cookie against a given value
 * @param name          The name of the cookie
 * @param reverse       Check for opposite state
 * @param expectedValue The value to check against
 */
export default (name: string, reverse: boolean, expectedValue: string): void => {
    const cookies = browser.getCookies([name]);

    failMessage(() => expect(cookies).toHaveLength(1), `Expected exactly one cookie with name "${name}"`);
    const cookie = cookies[0];
    failMessage(() => expect(cookie.name).toBe(name), `Cookie name should be "${name}"`);

    if (reverse) {
        failMessage(() => expect(cookie.value).not.toBe(expectedValue), `expected cookie "${name}" not to have value "${expectedValue}"`);
    } else {
        failMessage(() => expect(cookie.value).toBe(expectedValue),
            `expected cookie "${name}" to have value "${expectedValue}" but got "${cookie.value}"`);
    }
};
