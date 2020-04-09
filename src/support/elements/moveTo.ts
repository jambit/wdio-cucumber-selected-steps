import { ElementQuery } from '../elementQuery';

/**
 * Move to the given element with an optional offset on an X and Y position
 * @param element   The element query
 * @param xOffset   X coordinate to move to
 * @param yOffset   Y coordinate to move to
 */
export default (element: ElementQuery, xOffset: number, yOffset: number) => element().moveTo({ xOffset, yOffset });
