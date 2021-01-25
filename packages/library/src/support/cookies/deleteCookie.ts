/**
 * Delete a cookie
 * @param name  The name of the cookie to delete
 */
export default (name: string): void => browser.deleteCookies([name]);
