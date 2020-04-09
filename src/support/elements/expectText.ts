import { getTextOrValue } from '../helpers';
import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given elements text is the same as the given text
 * @param type          Element type
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedText  The text to validate against
 */
export default (type: 'element' | 'button', element: ElementQuery, reverse: boolean, expectedText: string) => {
    const text = getTextOrValue(type, element());

    if (reverse) {
        failMessage(() => expect(text).not.toBe(expectedText), `Expected the ${type} "${element}" to not match the text "${expectedText}"`);
    } else {
        failMessage(() => expect(text).toBe(expectedText), `Expected the ${type} "${element}" to match the text "${expectedText}"`);
    }
};
