import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element has the focus
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean): void => {
    if (reverse) {
        failMessage(() => expect(element()).not.toBeFocused(), `Expected the element "${element}" to not be focused, but it is`);
    } else {
        failMessage(() => expect(element()).toBeFocused(), `Expected the element "${element}" to not be focused, but it is`);
    }
};
