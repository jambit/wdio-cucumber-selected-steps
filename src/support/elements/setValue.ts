import { ElementQuery } from '../elementQuery';

/**
 * Set the value of the given input field to a new value
 * @param element   The element query
 * @param value     The value to set the element to
 */
export default (element: ElementQuery, value: string) => element().setValue(value);
