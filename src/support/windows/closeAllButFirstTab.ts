/**
 * Close all tabs but the first one.
 */
export default () => {
    const windowHandles = browser.getWindowHandles();

    windowHandles.slice(1).forEach((handle) => {
        browser.switchToWindow(handle);
        browser.closeWindow();
    });
    browser.switchToWindow(windowHandles[0]);
};
