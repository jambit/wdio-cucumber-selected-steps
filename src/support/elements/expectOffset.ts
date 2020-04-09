import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check the offset of the given element
 * @param element           The element query
 * @param reverse           Check for opposite state
 * @param expectedPosition  The position to check against
 * @param axis              The axis to check on
 */
export default (element: ElementQuery, reverse: boolean, expectedPosition: number, axis: 'x' | 'y') => {
    const location = element().getLocation(axis);

    if (reverse) {
        failMessage(() => expect(location).not.toBe(expectedPosition),
            `The element "${element}" should not be positioned at ${expectedPosition}px on the ${axis} axis`);
    } else {
        failMessage(() => expect(location).toBe(expectedPosition),
            `The element "${element}" should be positioned at ${expectedPosition}px on the ${axis} axis, but was found at ${location}px`);
    }
};
