import { ElementQuery } from '../elementQuery';

/**
 * Scroll the page to the given element
 * @param element   The element query
 */
export default (element: ElementQuery) => element().scrollIntoView();
