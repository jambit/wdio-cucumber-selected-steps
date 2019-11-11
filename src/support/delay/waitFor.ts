import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

const STATE_HANDLERS = {
    'be checked': (element: ElementQuery, ms: number, reverse: boolean) => browser.waitUntil(
        () => element().isSelected() !== reverse,
        ms,
        `Element "${element}" ${reverse ? 'did not get checked within' : 'was still checked after'} ${ms}ms`,
    ),
    'be selected': (element: ElementQuery, ms: number, reverse: boolean) => browser.waitUntil(
        () => element().isSelected() !== reverse,
        ms,
        `Element "${element}" ${reverse ? 'did not get selected within' : 'was still selected after'} ${ms}ms`,
    ),
    'be enabled': (element: ElementQuery, ms: number, reverse: boolean) => element().waitForEnabled(ms, reverse),
    'be displayed': (element: ElementQuery, ms: number, reverse: boolean) => element().waitForDisplayed(ms, reverse),
    'have a text': (element: ElementQuery, ms: number, reverse: boolean) => browser.waitUntil(
        () => (element().getText() !== '') !== reverse,
        ms,
        `Element "${element}" ${reverse ? 'still had text' : 'still had no text'} after ${ms}ms`,
    ),
    'match the text': (element: ElementQuery, ms: number, reverse: boolean, value?: string) => browser.waitUntil(
        () => (element().getText() === value) !== reverse,
        ms,
        `Text of the element "${element}" did not change within ${ms}ms ${reverse ? 'from' : 'to'} "${value}"`,
    ),
    'have a value': (element: ElementQuery, ms: number, reverse: boolean) => browser.waitUntil(
        () => (element().getValue() !== '') !== reverse,
        ms,
        `Element "${element}" ${reverse ? 'still had a value' : 'still had no value'} after ${ms}ms`,
    ),
    'match the value': (element: ElementQuery, ms: number, reverse: boolean, value?: string) => browser.waitUntil(
        () => (element().getValue() === value) !== reverse,
        ms,
        `Value of the element "${element}" did not change within ${ms}ms ${reverse ? 'from' : 'to'} "${value}"`,
    ),
    exist: (element: ElementQuery, ms: number, reverse: boolean) => element().waitForExist(ms, reverse),
};
const STATES = Object.keys(STATE_HANDLERS);

type State = keyof typeof STATE_HANDLERS;

/**
 * Wait for the given element to be checked, enabled, selected, displayed, contain a text, contain a value or to exist
 * @param [ms=3000]     Wait duration (optional)
 * @param element       Element getter
 * @param reverse       Check for opposite state
 * @param [state=exist] State to check for
 * @param value         The value to check for (in case of "match the text/value")
 *
 * @todo make fallback ms configurable
 */
export default (ms: number | undefined, element: ElementQuery, reverse: boolean, state?: State, value?: string) => {
    if (state) {
        expect(state).to.be.oneOf(STATES, `Invalid state: '${state}. Valid states are: ${STATES.join(', ')}'`);
    }
    const handler = STATE_HANDLERS[state || 'exist'];
    handler(element, ms || 3000, reverse, value);
};
