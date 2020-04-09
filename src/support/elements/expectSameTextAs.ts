import { ElementQuery } from '../elementQuery';
import { getText } from '../helpers';
import { failMessage } from '../failMessage';

/**
 * Compare the contents of two elements with each other
 * @param element1  The element query for the first element
 * @param reverse   Check for opposite state
 * @param element2  The element query for the second element
 */
export default (element1: ElementQuery, reverse: boolean, element2: ElementQuery) => {
    const text1 = getText(element1());
    const text2 = getText(element2());

    if (reverse) {
        failMessage(() => expect(text1).not.toBe(text2), `Expected text of "${element1}" not to be "${text1}"`);
    } else {
        failMessage(() => expect(text1).toBe(text2), `Expected text of "${element1}" to be "${text1}" but found "${text2}"`);
    }
};
