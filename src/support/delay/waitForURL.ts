import { expect } from 'chai';
import { getUrlOrPath } from '../helpers';

const STATE_HANDLERS = {
    contain: (ms: number, type: 'url' | 'path', reverse: boolean, expectedValue: string) => browser.waitUntil(
        () => getUrlOrPath(type).includes(expectedValue) !== reverse,
        ms,
        `The ${type} did not change within ${ms}ms to a value ${reverse ? 'not ' : ''}containing "${expectedValue}"`,
    ),
    match: (ms: number, type: 'url' | 'path', reverse: boolean, expectedValue: string) => browser.waitUntil(
        () => (getUrlOrPath(type) === expectedValue) !== reverse,
        ms,
        `The ${type} did not change within ${ms}ms ${reverse ? 'from' : 'to'} "${expectedValue}"`,
    ),
};
const STATES = Object.keys(STATE_HANDLERS);

type State = keyof typeof STATE_HANDLERS;

/**
 * Wait for the url or path to contain or match the specified value
 * @param [ms=3000]     Wait duration (optional)
 * @param type          The type to check (url or path)
 * @param reverse       Check for opposite state
 * @param state         State to check for (contain or match)
 * @param expectedValue The value to check for
 *
 * @todo make fallback ms configurable
 * @todo add some tests that use this
 */
export default (ms: number | undefined, type: 'url' | 'path', reverse: boolean, state: State, expectedValue: string) => {
    expect(state).to.be.oneOf(STATES, `Invalid state: '${state}. Valid states are: ${STATES.join(', ')}'`);
    const handler = STATE_HANDLERS[state];
    handler(ms || 3000, type, reverse, expectedValue);
};
