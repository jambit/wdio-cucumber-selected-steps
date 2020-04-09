import { getTextOrValue } from '../helpers';
import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element is empty
 * @param type      Element type
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (type: 'element' | 'button', element: ElementQuery, reverse: boolean) => {
    const text = getTextOrValue(type, element());

    if (reverse) {
        failMessage(() => expect(text).not.toBe(''), `Expected the element "${element}" not to be empty`);
    } else {
        failMessage(() => expect(text).toBe(''), `Expected the element "${element}" to be empty`);
    }
};
