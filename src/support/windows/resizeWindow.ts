/**
 * Resize the browser window
 * @param width     The width of the window to resize to
 * @param height    The height of the window to resize to
 */
export default (width: number, height: number): void => {
    browser.setWindowSize(width, height);
};
