import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check the dimensions of the given element
 * @param dimension     Dimension to check
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedSize  Expected size
 */
export default (dimension: 'width' | 'height', element: ElementQuery, reverse: boolean, expectedSize: number): void => {
    const elementSize = element().getSize(dimension) as number;

    if (reverse) {
        failMessage(() => expect(elementSize).not.toBe(expectedSize), `The element "${element}" should not have a ${dimension} of ${expectedSize}px`);
    } else {
        failMessage(() => expect(elementSize).toBe(expectedSize),
            `The element "${element}" should have a ${dimension} of ${expectedSize}px, but is ${elementSize}px`);
    }
};
