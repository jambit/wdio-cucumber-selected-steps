import { ucFirst } from '../helpers';
import { failMessage } from '../failMessage';

/**
 * Check if a modal was opened
 * @param type      The type of modal that is expected
 * @param reverse   Check for opposite state
 */
export default (type: 'an alertbox' | 'a confirmbox' | 'a prompt', reverse: boolean): void => {
    const open = browser.isAlertOpen();
    if (open && !reverse) {
        failMessage(() => expect(reverse).toBe(false), `${ucFirst(type)} was opened when it shouldn't have been`);
    } else if (!open && reverse) {
        failMessage(() => expect(reverse).toBe(true), `${ucFirst(type)} was not opened when it should have been`);
    }
};
