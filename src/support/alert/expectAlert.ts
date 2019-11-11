import { assert } from 'chai';
import { ucFirst } from '../helpers';

/**
 * Check if a modal was opened
 * @param type      The type of modal that is expected
 * @param reverse   Check for opposite state
 */
export default (type: 'an alertbox' | 'a confirmbox' | 'a prompt', reverse: boolean) => {
    const open = browser.isAlertOpen();
    if (open && !reverse) {
        assert.isFalse(reverse, `${ucFirst(type)} was opened when it shouldn't have been`);
    } else if (!open && reverse) {
        assert.isTrue(reverse, `${ucFirst(type)} was not opened when it should have been`);
    }
};
