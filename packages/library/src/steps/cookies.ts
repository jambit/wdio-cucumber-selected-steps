import {
    defineTypedStep,
    paramType,
    expectCookieValue,
    expectCookieExists,
    setCookie,
    deleteCookie,
} from '../support';

defineTypedStep(
    /^the cookie "([^"]+)" (has|does not have) the value "([^"]*)"$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not have'),
        paramType.string,
    ],
    expectCookieValue,
);

defineTypedStep(
    /^the cookie "([^"]+)" (exists|does not exist)$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not exist'),
    ],
    expectCookieExists,
);

defineTypedStep(
    /^I set the cookie "([^"]+)" to "([^"]*)"$/,
    [
        paramType.string,
        paramType.string,
    ],
    setCookie,
);

defineTypedStep(
    /^I delete the cookie "([^"]+)"$/,
    [
        paramType.string,
    ],
    deleteCookie,
);
