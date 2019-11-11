import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element has the given class
 * @param element           The element query
 * @param reverse           Check for opposite state
 * @param expectedClassName The class name to check
 */
export default (element: ElementQuery, reverse: boolean, expectedClassName: string) => {
    const classesList = element().getAttribute('className').split(' ');

    if (reverse) {
        expect(classesList).to.not.include(expectedClassName, `Element "${element}" should not have the class "${expectedClassName}"`);
    } else {
        expect(classesList).to.include(expectedClassName, `Element "${element}" should have the class "${expectedClassName}"`);
    }
};
