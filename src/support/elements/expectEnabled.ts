import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element is enabled
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    if (reverse) {
        failMessage(() => expect(element()).not.toBeEnabled(), `Expected the element "${element}" not to be enabled`);
    } else {
        failMessage(() => expect(element()).toBeEnabled(), `Expected the element "${element}" to be enabled`);
    }
};
