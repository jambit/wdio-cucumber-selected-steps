import { failMessage } from '../failMessage';

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
export default (action: 'accept' | 'dismiss', type: 'alertbox' | 'confirmbox' | 'prompt'): void => {
    failMessage(() => expect(ACTIONS).toContain(action), `Invalid action: '${action}. Valid actions are: ${ACTIONS.join(', ')}'`);
    failMessage(() => expect(TYPES).toContain(type), `Invalid type: '${type}. Valid types are: ${TYPES.join(', ')}'`);

    // Alert boxes can't be dismissed, this causes Chrome to crash during tests
    const handler = (type === 'alertbox') ? ACTION_HANDLERS.accept : ACTION_HANDLERS[action];
    handler();
};
