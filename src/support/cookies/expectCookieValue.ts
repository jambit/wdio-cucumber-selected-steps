import { expect } from 'chai';

/**
 * Check the content of a cookie against a given value
 * @param name          The name of the cookie
 * @param reverse       Check for opposite state
 * @param expectedValue The value to check against
 */
export default (name: string, reverse: boolean, expectedValue: string) => {
    const cookies = browser.getCookies([name]);

    expect(cookies).to.have.length(1, `Expected exactly one cookie with name "${name}"`);
    const cookie = cookies[0];
    expect(cookie.name).to.equal(name, `Cookie name should be "${name}"`);

    if (reverse) {
        expect(cookie.value).to.not.equal(expectedValue, `expected cookie "${name}" not to have value "${expectedValue}"`);
    } else {
        expect(cookie.value).to.equal(expectedValue, `expected cookie "${name}" to have value "${expectedValue}" but got "${cookie.value}"`);
    }
};
