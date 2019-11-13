import { expect } from 'chai';
import { getTextOrValue } from '../helpers';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given elements contains text
 * @param type          Element type
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedText  The text to check against
 */
export default (type: 'element' | 'button', element: ElementQuery, reverse: boolean, expectedText: string) => {
    const text = getTextOrValue(type, element());

    if (reverse) {
        expect(text).to.not.contain(expectedText);
    } else {
        expect(text).to.contain(expectedText);
    }
};
