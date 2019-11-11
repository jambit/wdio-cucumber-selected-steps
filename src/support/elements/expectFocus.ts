import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element has the focus
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isFocused = element().isFocused();

    if (reverse) {
        expect(isFocused).to.not.equal(true, `Expected the element "${element}" to not be focused, but it is`);
    } else {
        expect(isFocused).to.equal(true, `Expected the element "${element}" to not be focused, but it is`);
    }
};
