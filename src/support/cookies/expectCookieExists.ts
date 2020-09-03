import { failMessage } from '../failMessage';

/**
 * Check if a cookie with the given name exists
 * @param name      The name of the cookie
 * @param reverse   Check for opposite state
 */
export default (name: string, reverse: boolean): void => {
    const cookies = browser.getCookies([name]);

    if (reverse) {
        failMessage(() => expect(cookies).toHaveLength(0), `Expected cookie "${name}" not to exists but it does`);
    } else {
        failMessage(() => expect(cookies).toHaveLength(1), `Expected cookie "${name}" to exists but it does not`);
    }
};
