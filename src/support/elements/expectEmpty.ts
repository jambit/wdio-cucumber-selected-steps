import { expect } from 'chai';
import { getTextOrValue } from '../helpers';
import { ElementQuery } from '../elementQuery';

/**
 * Check if the given element is empty
 * @param type      Element type
 * @param element   The element query
 * @param reverse   Check for opposite state
 */
export default (type: 'element' | 'button', element: ElementQuery, reverse: boolean) => {
    const text = getTextOrValue(type, element);

    if (reverse) {
        expect(text).to.not.equal('');
    } else {
        expect(text).to.equal('');
    }
};
