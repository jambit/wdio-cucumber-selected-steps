import { ElementQuery } from '../elementQuery';

/**
 * Add a value to the current element value
 * @param value     The value to add to the element
 * @param element   The element query
 */
export default (value: string, element: ElementQuery) => element().addValue(value);
