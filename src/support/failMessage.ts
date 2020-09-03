/**
 * When an exception has been thrown, this will ensure its message will be changed.
 * @param fn        A callback that might throw an exception
 * @param message   The message that should be set on the error object.
 */
export const failMessage = (fn: () => void, message: string): void => {
    try {
        fn();
    } catch (e) {
        e.message = message;
        if (e.matcherResult) {
            e.matcherResult.message = () => message;
        }
        throw e;
    }
};
