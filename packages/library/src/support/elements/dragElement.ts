import { ElementQuery } from '../elementQuery';

/**
 * Drag an element to a given destination
 * @param source        The element query for the source element
 * @param destination   The element query for the destination element
 */
export default (source: ElementQuery, destination: ElementQuery): void => source().dragAndDrop(destination());
