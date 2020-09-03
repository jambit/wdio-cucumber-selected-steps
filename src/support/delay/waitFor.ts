import { ElementQuery } from '../elementQuery';
import { getText } from '../helpers';
import { failMessage } from '../failMessage';

const STATE_HANDLERS = {
    'be checked': (element: ElementQuery, timeout: number, reverse: boolean) => browser.waitUntil(
        () => element().isSelected() !== reverse,
        {
            timeout,
            timeoutMsg: `Element "${element}" ${reverse ? 'did not get checked within' : 'was still checked after'} ${timeout}ms`,
        },
    ),
    'be selected': (element: ElementQuery, timeout: number, reverse: boolean) => browser.waitUntil(
        () => element().isSelected() !== reverse,
        {
            timeout,
            timeoutMsg: `Element "${element}" ${reverse ? 'did not get selected within' : 'was still selected after'} ${timeout}ms`,
        },
    ),
    'be enabled': (element: ElementQuery, timeout: number, reverse: boolean) => element().waitForEnabled({ timeout, reverse }),
    'be displayed': (element: ElementQuery, timeout: number, reverse: boolean) => element().waitForDisplayed({ timeout, reverse }),
    'have a text': (element: ElementQuery, timeout: number, reverse: boolean) => browser.waitUntil(
        () => (getText(element()) !== '') !== reverse,
        {
            timeout,
            timeoutMsg: `Element "${element}" ${reverse ? 'still had text' : 'still had no text'} after ${timeout}ms`,
        },
    ),
    'match the text': (element: ElementQuery, timeout: number, reverse: boolean, value?: string) => browser.waitUntil(
        () => (getText(element()) === value) !== reverse,
        {
            timeout,
            timeoutMsg: `Text of the element "${element}" did not change within ${timeout}ms ${reverse ? 'from' : 'to'} "${value}"`,
        },
    ),
    'contain the text': (element: ElementQuery, timeout: number, reverse: boolean, value?: string) => browser.waitUntil(
        () => (getText(element()).includes(value || '')) !== reverse,
        {
            timeout,
            timeoutMsg: `Text of the element "${element}" did not change within ${timeout}ms to ${reverse ? 'not contain' : 'contain'} "${value}"`,
        },
    ),
    'have a value': (element: ElementQuery, timeout: number, reverse: boolean) => browser.waitUntil(
        () => (element().getValue() !== '') !== reverse,
        {
            timeout,
            timeoutMsg: `Element "${element}" ${reverse ? 'still had a value' : 'still had no value'} after ${timeout}ms`,
        },
    ),
    'match the value': (element: ElementQuery, timeout: number, reverse: boolean, value?: string) => browser.waitUntil(
        () => (element().getValue() === value) !== reverse,
        {
            timeout,
            timeoutMsg: `Value of the element "${element}" did not change within ${timeout}ms ${reverse ? 'from' : 'to'} "${value}"`,
        },
    ),
    exist: (element: ElementQuery, timeout: number, reverse: boolean) => element().waitForExist({ timeout, reverse }),
};
const STATES = Object.keys(STATE_HANDLERS);

type State = keyof typeof STATE_HANDLERS;

/**
 * Wait for the given element to be checked, enabled, selected, displayed, match/contain a text, match a value or to exist
 * @param [timeout=3000]    Wait duration (optional)
 * @param element           Element getter
 * @param reverse           Check for opposite state
 * @param [state=exist]     State to check for
 * @param value             The value to check for (in case of "match/contain the text/value")
 *
 * @todo make fallback timeout configurable
 */
export default (timeout: number | undefined, element: ElementQuery, reverse: boolean, state?: State, value?: string): void => {
    if (state) {
        failMessage(() => expect(STATES).toContain(state), `Invalid state: '${state}. Valid states are: ${STATES.join(', ')}'`);
    }
    const handler = STATE_HANDLERS[state || 'exist'];
    handler(element, timeout || 3000, reverse, value);
};
