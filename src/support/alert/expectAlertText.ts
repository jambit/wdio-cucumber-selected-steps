import { assert, expect } from 'chai';
import { ucFirst, dropFirstWord } from '../helpers';

/**
 * Check the text of a modal
 * @param type          The type of modal that is expected
 * @param reverse       Check for opposite state
 * @param expectedText  The text to check against
 */
export default (type: 'an alertbox' | 'a confirmbox' | 'a prompt', reverse: boolean, expectedText: string) => {
    try {
        const text = browser.getAlertText();

        if (reverse) {
            expect(text).to.not.equal(expectedText, `Expected the text of the ${dropFirstWord(type)} not to equal "${expectedText}"`);
        } else {
            expect(text).to.equal(
                expectedText,
                `Expected the text of the ${dropFirstWord(type)} to equal "${expectedText}", instead found "${text}"`,
            );
        }
    } catch (e) {
        assert.fail(`${ucFirst(type)} was not opened when it should have been opened`);
    }
};
