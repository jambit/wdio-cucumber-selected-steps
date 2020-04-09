import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check the selected state of the given element
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isSelected = element().isSelected();

    if (reverse) {
        failMessage(() => expect(isSelected).not.toBe(true), `Expected the element "${element}" to not be selected`);
    } else {
        failMessage(() => expect(isSelected).toBe(true), `Expected the element "${element}" to be selected`);
    }
};
