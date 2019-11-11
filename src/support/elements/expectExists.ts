import { expect } from 'chai';
import { ElementsQuery } from '../elementQuery';

/**
 * Check if the given element exists in the DOM one or more times
 * @param elements  The elements query
 * @param reverse   Check for opposite state
 * @param exactly   Check if the element exists exactly this number of times
 */
export default (elements: ElementsQuery, reverse: boolean, exactly?: number) => {
    if (reverse) {
        expect(elements()).to.have.lengthOf(0, `The Element "${elements}" should not exist on the page`);
    } else if (exactly) {
        expect(elements()).to.have.lengthOf(exactly, `Elements "${elements}" should exist exactly ${exactly} time(s)`);
    } else {
        expect(elements()).to.have.length.of.at.least(1, `Elements "${elements}" should exist at least once on the page`);
    }
};
