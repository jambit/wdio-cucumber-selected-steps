import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check if the given element has the given class
 * @param element           The element query
 * @param reverse           Check for opposite state
 * @param expectedClassName The class name to check
 */
export default (element: ElementQuery, reverse: boolean, expectedClassName: string): void => {
    const classList = element().getProperty('classList');

    if (reverse) {
        failMessage(() => expect(classList).not.toContain(expectedClassName),
            `Element "${element}" should not have the class "${expectedClassName}"`);
    } else {
        failMessage(() => expect(classList).toContain(expectedClassName),
            `Element "${element}" should have the class "${expectedClassName}"`);
    }
};
