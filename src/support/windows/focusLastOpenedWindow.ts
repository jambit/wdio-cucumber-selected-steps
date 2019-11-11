import { lastOf } from '../helpers';

/**
 * Focus the last opened window
 */
export default () => browser.switchToWindow(lastOf(browser.getWindowHandles()));
