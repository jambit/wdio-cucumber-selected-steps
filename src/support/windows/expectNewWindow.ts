import { failMessage } from '../failMessage';

/**
 * Check if a new window or tab is opened
 * @param reverse Check for opposite state
 */
export default (reverse?: boolean) => {
    const windowHandles = browser.getWindowHandles();

    if (reverse) {
        failMessage(() => expect(windowHandles).toHaveLength(1), 'A new window has been opened');
    } else {
        failMessage(() => expect(windowHandles).not.toHaveLength(1), 'A new window should not have been opened');
    }
};
