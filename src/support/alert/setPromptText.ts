import { assert } from 'chai';

/**
 * Enter text into the current prompt
 * @param value The text to enter into the prompt
 */
export default (value: string) => {
    try {
        browser.sendAlertText(value);
    } catch (e) {
        assert.fail('A prompt was not open when it should have been open');
    }
};
