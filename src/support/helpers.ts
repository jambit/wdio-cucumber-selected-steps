const FIRST_WORD_REGEX = /^[\S]+\s*/;
const HOST_PART = /http(s?):\/\/[^/]*/;

/**
 * Turn the first character of the supplied string to upper-case.
 * @param text  The text to change
 */
export const ucFirst = (text: string): string => text[0].toUpperCase() + text.substring(1);

/**
 * Remove the first word of the supplied string (including whitespace).
 * @param text  The text to change
 */
export const dropFirstWord = (text: string): string => text.replace(FIRST_WORD_REGEX, '');

/**
 * Get the last element of a list
 * @param list  The list to use
 */
export const lastOf = <T>(list: T[]): T => list[list.length - 1];

/**
 * Get the current url or path (if type !== 'url')
 * @param type  The type
 */
export const getUrlOrPath = (type: 'url' | 'path'): string => {
    const url = browser.getUrl();
    return type === 'url' ? url : url.replace(HOST_PART, '');
};

/**
 * Get the text of an element
 * @param  element   The element
 * @returns The element text depending on the specified text method.
 * @see setupTextMethod()
 */
export const getText =
    global.selectedStepsTextMethod === 'textContent'
        ? (element: WebdriverIO.Element) => element.getProperty('textContent') as string
        : (element: WebdriverIO.Element) => element.getText();

/**
 * Get the text or value of an element or button
 * @param  type      Element type
 * @param  element   The element
 * @returns The element value if type is not 'button', but the tagname is input, select or textarea. Otherwise the element text.
 */
export const getTextOrValue = (type: 'element' | 'button', element: WebdriverIO.Element): string => {
    if (type !== 'button') {
        const tagName = element.getTagName().toLowerCase();
        switch (tagName) {
            case 'input':
            case 'select':
            case 'textarea':
                return element.getValue();
            default:
                break;
        }
    }

    return getText(element);
};
