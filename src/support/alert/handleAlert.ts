import { expect } from 'chai';

const ACTION_HANDLERS = {
    accept: () => browser.acceptAlert(),
    dismiss: () => browser.dismissAlert(),
};
const ACTIONS = Object.keys(ACTION_HANDLERS);
const TYPES = ['alertbox', 'confirmbox', 'prompt'];

/**
 * Handle an alertbox/confirmbox/prompt
 * @param action    Action to perform
 * @param type      Type of modal
 */
export default (action: 'accept' | 'dismiss', type: 'alertbox' | 'confirmbox' | 'prompt') => {
    expect(action).to.be.oneOf(ACTIONS, `Invalid action: '${action}. Valid actions are: ${ACTIONS.join(', ')}'`);
    expect(type).to.be.oneOf(TYPES, `Invalid type: '${type}. Valid types are: ${TYPES.join(', ')}'`);

    // Alert boxes can't be dismissed, this causes Chrome to crash during tests
    const handler = (type === 'alertbox') ? ACTION_HANDLERS.accept : ACTION_HANDLERS[action];
    handler();
};
