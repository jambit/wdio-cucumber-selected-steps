import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element is (not) displayed
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isDisplayed = element().isDisplayed();

    if (reverse) {
        expect(isDisplayed).to.not.equal(true, `Expected the element "${element}" not to be displayed`);
    } else {
        expect(isDisplayed).to.equal(true, `Expected the element "${element}" to be displayed`);
    }
};
