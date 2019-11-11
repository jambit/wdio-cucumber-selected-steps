import { expect } from 'chai';
import { ElementQuery } from '../elementQuery';

const ACTION_HANDLERS = {
    click: (element: ElementQuery) => element().click(),
    'double-click': (element: ElementQuery) => element().doubleClick(),
};
const ACTIONS = Object.keys(ACTION_HANDLERS);

type Action = keyof typeof ACTION_HANDLERS;

/**
 * Perform a click action on the given element
 * @param action      The action to perform
 * @param element     The element query
 */
export default (action: Action, element: ElementQuery) => {
    expect(action).to.be.oneOf(ACTIONS, `Invalid action: '${action}. Valid actions are: ${ACTIONS.join(', ')}'`);
    const handler = ACTION_HANDLERS[action];
    handler(element);
};
