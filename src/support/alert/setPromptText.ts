/**
 * Enter text into the current prompt
 * @param value The text to enter into the prompt
 */
export default (value: string): void => {
    try {
        browser.sendAlertText(value);
    } catch (e) {
        throw new Error('A prompt was not open when it should have been open');
    }
};
