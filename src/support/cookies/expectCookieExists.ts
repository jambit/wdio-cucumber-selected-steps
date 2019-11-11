import { expect } from 'chai';

/**
 * Check if a cookie with the given name exists
 * @param name      The name of the cookie
 * @param reverse   Check for opposite state
 */
export default (name: string, reverse: boolean) => {
    const cookies = browser.getCookies([name]);

    if (reverse) {
        expect(cookies).to.have.length(0, `Expected cookie "${name}" not to exists but it does`);
    } else {
        expect(cookies).to.have.length(1, `Expected cookie "${name}" to exists but it does not`);
    }
};
