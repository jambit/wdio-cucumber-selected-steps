import { failMessage } from '../failMessage';

/**
 * Check the title of the current browser window contains expected text/title
 * @param reverse       Check for opposite state
 * @param expectedTitle The expected title
 */
export default (reverse: boolean, expectedTitle: string): void => {
    const title = browser.getTitle();
    const contains = title.includes(expectedTitle);

    if (reverse) {
        failMessage(() => expect(contains).not.toBe(true), `Expected title to not contain "${expectedTitle}"`);
    } else {
        failMessage(() => expect(contains).toBe(true), `Expected title to contain "${expectedTitle}" but it didn't: "${title}"`);
    }
};
