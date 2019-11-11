/**
 * Set a given cookie to a given value. When the cookies does not exist it will be created
 * @param name    The name of the cookie
 * @param value   The value of the cookie
 */
export default (name: string, value: string) => browser.setCookies({ name, value });
