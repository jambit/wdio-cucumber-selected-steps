import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check the selected state of the given element
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isSelected = element().isSelected();

    if (reverse) {
        expect(isSelected).to.not.equal(true, `Expected the element "${element}" to not be selected`);
    } else {
        expect(isSelected).to.equal(true, `Expected the element "${element}" to be selected`);
    }
};
