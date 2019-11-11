import { ElementQuery } from './elementQuery';

const FIRST_WORD_REGEX = /^[\S]+\s*/;
const HOST_PART = /http(s?):\/\/[^/]*/;

/**
 * Turn the first character of the supplied string to upper-case.
 * @param text  The text to change
 */
export const ucFirst = (text: string) => text[0].toUpperCase() + text.substring(1);

/**
 * Remove the first word of the supplied string (including whitespace).
 * @param text  The text to change
 */
export const dropFirstWord = (text: string) => text.replace(FIRST_WORD_REGEX, '');

/**
 * Get the last element of a list
 * @param list  The list to use
 */
export const lastOf = <T>(list: T[]) => list[list.length - 1];

/**
 * Get the current url or path (if type !== 'url')
 * @param type  The type
 */
export const getUrlOrPath = (type: 'url' | 'path') => {
    const url = browser.getUrl();
    return type === 'url' ? url : url.replace(HOST_PART, '');
};

/**
 * Get the text or value of an element or button
 * @param  type        Element type
 * @param  element   The element query
 * @returns The element value if type is not 'button', but the tagname is input, select or textarea. Otherwise the element text.
 */
export const getTextOrValue = (type: 'element' | 'button', element: ElementQuery) => {
    let command: 'getText' | 'getValue' = 'getText';

    const foundElement = element();
    if (type !== 'button') {
        const tagName = foundElement.getTagName().toLowerCase();
        switch (tagName) {
            case 'input':
            case 'select':
            case 'textarea':
                command = 'getValue';
                break;
            default:
                break;
        }
    }

    return foundElement[command]().toString();
};
