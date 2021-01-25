import { lastOf } from '../helpers';

/**
 * Focus the last opened window
 */
export default (): void => browser.switchToWindow(lastOf(browser.getWindowHandles()));
