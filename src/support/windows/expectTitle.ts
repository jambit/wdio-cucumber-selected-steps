import { failMessage } from '../failMessage';

/**
 * Check the title of the current browser window
 * @param reverse       Check for opposite state
 * @param expectedTitle The expected title
 */
export default (reverse: boolean, expectedTitle: string) => {
    const title = browser.getTitle();

    if (reverse) {
        failMessage(() => expect(title).not.toBe(expectedTitle), `Expected title to not be "${expectedTitle}"`);
    } else {
        failMessage(() => expect(title).toBe(expectedTitle), `Expected title to be "${expectedTitle}" but was "${title}"`);
    }
};
