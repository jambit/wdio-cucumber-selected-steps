import { expect } from 'chai';

/**
 * Check the title of the current browser window contains expected text/title
 * @param reverse       Check for opposite state
 * @param expectedTitle The expected title
 */
export default (reverse: boolean, expectedTitle: string) => {
    const title = browser.getTitle();

    if (reverse) {
        expect(title).to.not.contain(expectedTitle, `Expected title to not contain "${expectedTitle}"`);
    } else {
        expect(title).to.contain(expectedTitle, `Expected title to contain "${expectedTitle}" but it didn't: "${title}"`);
    }
};
