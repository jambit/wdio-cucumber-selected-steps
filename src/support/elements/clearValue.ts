import { ElementQuery } from '../elementQuery';

/**
 * Clear the value of a given input field
 * @param element   The element query
 */
export default (element: ElementQuery) => element().clearValue();
