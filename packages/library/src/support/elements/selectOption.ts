import { ElementQuery } from '../elementQuery';
import { failMessage } from '../failMessage';

const TYPE_HANDLERS = {
    name: (element: ElementQuery, value: string) => element().selectByAttribute('name', value),
    value: (element: ElementQuery, value: string) => element().selectByAttribute('value', value),
    text: (element: ElementQuery, value: string) => element().selectByVisibleText(value),
};
const TYPES = Object.keys(TYPE_HANDLERS);

type Type = keyof typeof TYPE_HANDLERS;

/**
 * Select an option of a select element
 * @param type      Type of method to select by
 * @param value     Value to select by
 * @param element   The element query
 */
export default (type: Type, value: string, element: ElementQuery): void => {
    failMessage(() => expect(TYPES).toContain(type), `Invalid type: '${type}'. Valid types are: ${TYPES.join(', ')}'`);
    const handler = TYPE_HANDLERS[type];
    handler(element, value);
};
