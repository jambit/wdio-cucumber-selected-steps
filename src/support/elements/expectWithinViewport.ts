import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element is displayed inside the current viewport
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isDisplayed = element().isDisplayedInViewport();

    if (reverse) {
        expect(isDisplayed).to.not.equal(true, `Expected the element "${element}" to be outside the viewport`);
    } else {
        expect(isDisplayed).to.equal(true, `Expected the element "${element}" to be inside the viewport`);
    }
};
