import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check the dimensions of the given element
 * @param dimension     Dimension to check
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedSize  Expected size
 */
export default (dimension: 'width' | 'height', element: ElementQuery, reverse: boolean, expectedSize: number) => {
    const elementSize = element().getSize()[dimension];

    if (reverse) {
        expect(elementSize).to.not.equal(expectedSize, `The element "${element}" should not have a ${dimension} of ${expectedSize}px`);
    } else {
        expect(elementSize).to.equal(
            expectedSize,
            `The element "${element}" should have a ${dimension} of ${expectedSize}px, but is ${elementSize}px`,
        );
    }
};
