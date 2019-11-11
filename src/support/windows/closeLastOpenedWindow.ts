import { lastOf } from '../helpers';

/**
 * Close the last opened window
 */
export default () => {
    const handles = browser.getWindowHandles();
    browser.switchToWindow(lastOf(handles));

    browser.closeWindow();
    browser.switchToWindow(handles[0]); // fixme: suboptimal, improve...
};
