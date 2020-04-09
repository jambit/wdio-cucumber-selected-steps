import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

/**
 * Check the given property of the given element
 * @param checkCSS      Whether to check for a CSS property or an attribute
 * @param attrName      The name of the attribute to check
 * @param element       The element query
 * @param reverse       Check for opposite state
 * @param expectedValue The value to match against
 */
export default (checkCSS: boolean, attrName: string, element: ElementQuery, reverse: boolean, expectedValue: string) => {
    const command = checkCSS ? 'getCSSProperty' : 'getAttribute';
    const attrType = checkCSS ? 'CSS attribute' : 'Attribute';

    let attributeValue = element()[command](attrName);

    /**
     * when getting something with a color or font-weight WebdriverIO returns a
     * object but we want to assert against a string
     */
    if (attrName.match(/(font-size|line-height|display|color|font-weight)/)) {
        // @ts-ignore
        attributeValue = attributeValue.value;
    }
    attributeValue = attributeValue.toString();

    if (reverse) {
        failMessage(() => expect(attributeValue).not.toBe(expectedValue),
            `${attrType} "${attrName}" of the element "${element}" should not match "${expectedValue}"`);
    } else {
        failMessage(() => expect(attributeValue).toBe(expectedValue),
            `${attrType} "${attrName}" of the element "${element}" should match "${expectedValue}", but is "${attributeValue}"`);
    }
};
