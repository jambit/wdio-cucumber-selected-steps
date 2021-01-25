import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element is (not) displayed
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean): void => {
    if (reverse) {
        failMessage(() => expect(element()).not.toBeDisplayed(), `Expected the element "${element}" not to be displayed`);
    } else {
        failMessage(() => expect(element()).toBeDisplayed(), `Expected the element "${element}" to be displayed`);
    }
};
