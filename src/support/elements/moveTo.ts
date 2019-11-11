import { ElementQuery } from '../elementQuery';

/**
 * Move to the given element with an optional offset on an X and Y position
 * @param element   The element query
 * @param x         X coordinate to move to
 * @param y         Y coordinate to move to
 */
export default (element: ElementQuery, x: number, y: number) => element().moveTo(x, y);
