import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Compare the contents of two elements with each other
 * @param element1  The element query for the first element
 * @param reverse   Check for opposite state
 * @param element2  The element query for the second element
 */
export default (element1: ElementQuery, reverse: boolean, element2: ElementQuery) => {
    const text1 = element1().getText();
    const text2 = element2().getText();

    if (reverse) {
        expect(text1).to.not.equal(text2, `Expected text of "${element1}" not to be "${text1}"`);
    } else {
        expect(text1).to.equal(text2, `Expected text of "${element1}" to be "${text1}" but found "${text2}"`);
    }
};
