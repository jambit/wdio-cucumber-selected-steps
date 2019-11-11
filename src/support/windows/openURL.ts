/**
 * Open the given URL
 * @param type  Type of navigation
 * @param url   The URL or path to navigate to
 */
export default (type: 'url' | 'path', url: string) => browser.url((type === 'url') ? url : browser.options.baseUrl + url);
