import { ucFirst, dropFirstWord } from '../helpers';
import { failMessage } from '../failMessage';

/**
 * Check the text of a modal
 * @param type          The type of modal that is expected
 * @param reverse       Check for opposite state
 * @param expectedText  The text to check against
 */
export default (type: 'an alertbox' | 'a confirmbox' | 'a prompt', reverse: boolean, expectedText: string): void => {
    try {
        const text = browser.getAlertText();

        if (reverse) {
            failMessage(() => expect(text).not.toBe(expectedText), `Expected the text of the ${dropFirstWord(type)} not to equal "${expectedText}"`);
        } else {
            failMessage(() => expect(text).toBe(expectedText),
                `Expected the text of the ${dropFirstWord(type)} to equal "${expectedText}", instead found "${text}"`);
        }
    } catch (e) {
        throw new Error(`${ucFirst(type)} was not opened when it should have been opened`);
    }
};
