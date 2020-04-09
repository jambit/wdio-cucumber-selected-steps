import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element is displayed inside the current viewport
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isDisplayed = element().isDisplayedInViewport();

    if (reverse) {
        failMessage(() => expect(isDisplayed).not.toBe(true), `Expected the element "${element}" to be outside the viewport`);
    } else {
        failMessage(() => expect(isDisplayed).toBe(true), `Expected the element "${element}" to be inside the viewport`);
    }
};
