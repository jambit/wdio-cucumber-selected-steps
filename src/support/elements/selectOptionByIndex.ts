import { ElementQuery } from '../elementQuery';

/**
 * Select an option from a select element by it's index
 * @param index     The index of the option
 * @param element   The element query
 */
export default (index: number, element: ElementQuery) => element().selectByIndex(index);
