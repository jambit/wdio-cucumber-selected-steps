import { ElementsQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element exists in the DOM one or more times
 * @param elements  The elements query
 * @param reverse   Check for opposite state
 * @param exactly   Check if the element exists exactly this number of times
 */
export default (elements: ElementsQuery, reverse: boolean, exactly?: number) => {
    const count = elements().length;

    if (reverse) {
        failMessage(() => expect(count).toBe(0), `The Element "${elements}" should not exist on the page`);
    } else if (exactly) {
        failMessage(() => expect(count).toBe(exactly), `Elements "${elements}" should exist exactly ${exactly} time(s)`);
    } else {
        failMessage(() => expect(count).toBeGreaterThan(0), `Elements "${elements}" should exist at least once on the page`);
    }
};
