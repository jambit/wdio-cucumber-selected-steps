import { getTextOrValue } from '../helpers';
import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given elements contains text
 * @param type          Element type
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedText  The text to check against
 */
export default (type: 'element' | 'button', element: ElementQuery, reverse: boolean, expectedText: string): void => {
    const text = getTextOrValue(type, element());
    const contains = text.includes(expectedText);

    if (reverse) {
        failMessage(() => expect(contains).not.toBe(true),
            `Expected the ${type} "${element}" to not contain the text "${expectedText}", but it does.`);
    } else {
        failMessage(() => expect(contains).toBe(true),
            `Expected the ${type} "${element}" to contain the text "${expectedText}", but found "${text}"`);
    }
};
