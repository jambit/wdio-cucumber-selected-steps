import { getUrlOrPath } from '../helpers';
import { failMessage } from '../failMessage';

const STATE_HANDLERS = {
    contain: (timeout: number, type: 'url' | 'path', reverse: boolean, expectedValue: string) => browser.waitUntil(
        () => getUrlOrPath(type).includes(expectedValue) !== reverse,
        {
            timeout,
            timeoutMsg: `The ${type} did not change within ${timeout}ms to a value ${reverse ? 'not ' : ''}containing "${expectedValue}"`,
        },
    ),
    match: (timeout: number, type: 'url' | 'path', reverse: boolean, expectedValue: string) => browser.waitUntil(
        () => (getUrlOrPath(type) === expectedValue) !== reverse,
        {
            timeout,
            timeoutMsg: `The ${type} did not change within ${timeout}ms ${reverse ? 'from' : 'to'} "${expectedValue}"`,
        },
    ),
};
const STATES = Object.keys(STATE_HANDLERS);

type State = keyof typeof STATE_HANDLERS;

/**
 * Wait for the url or path to contain or match the specified value
 * @param [timeout=3000]    Wait duration (optional)
 * @param type              The type to check (url or path)
 * @param reverse           Check for opposite state
 * @param state             State to check for (contain or match)
 * @param expectedValue     The value to check for
 *
 * @todo make fallback timeout configurable
 * @todo add some tests that use this
 */
export default (timeout: number | undefined, type: 'url' | 'path', reverse: boolean, state: State, expectedValue: string) => {
    failMessage(() => expect(STATES).toContain(state), `Invalid state: '${state}. Valid states are: ${STATES.join(', ')}'`);
    const handler = STATE_HANDLERS[state];
    handler(timeout || 3000, type, reverse, expectedValue);
};
