import { expect } from 'chai';

/**
 * Check the title of the current browser window
 * @param reverse       Check for opposite state
 * @param expectedTitle The expected title
 */
export default (reverse: boolean, expectedTitle: string) => {
    const title = browser.getTitle();

    if (reverse) {
        expect(title).to.not.equal(expectedTitle, `Expected title to not be "${expectedTitle}"`);
    } else {
        expect(title).to.equal(expectedTitle, `Expected title to be "${expectedTitle}" but was "${title}"`);
    }
};
