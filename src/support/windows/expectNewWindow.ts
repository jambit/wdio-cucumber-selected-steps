import { expect } from 'chai';

/**
 * Check if a new window or tab is opened
 * @param reverse Check for opposite state
 */
export default (reverse?: boolean) => {
    const windowHandles = browser.getWindowHandles();

    if (reverse) {
        expect(windowHandles.length).to.equal(1, 'A new window has been opened');
    } else {
        expect(windowHandles.length).to.not.equal(1, 'A new window should not have been opened');
    }
};
