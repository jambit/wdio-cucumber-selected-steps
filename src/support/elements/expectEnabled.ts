import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element is enabled
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (element: ElementQuery, reverse: boolean) => {
    const isEnabled = element().isEnabled();

    if (reverse) {
        expect(isEnabled).to.not.equal(true, `Expected the element "${element}" not to be enabled`);
    } else {
        expect(isEnabled).to.equal(true, `Expected the element "${element}" to be enabled`);
    }
};
