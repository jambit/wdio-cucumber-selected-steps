import {
    defineTypedStep,
    paramType,
    pause,
    waitFor,
    waitForURL,
} from '../support';

defineTypedStep(
    /^I pause for (\d+)ms$/,
    [
        paramType.int,
    ],
    pause,
);

defineTypedStep(
    /^I wait(?: (\d+)ms)? for the (?:link|button|element|checkbox|radio) "([^"]+)"(?: to( not)? (exist|be checked|be enabled|be selected|be displayed|have a text|have a value|match the text|match the value)(?: "([^"]+)")?)?$/,
    [
        paramType.int.optional,
        paramType.element,
        paramType.bool,
        paramType.string.optional,
        paramType.string.optional,
    ],
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    waitFor,
);

defineTypedStep(
    /^I wait(?: (\d+)ms) for the (url|path) to( not)? (contain|match) "([^"]+)"$/,
    [
        paramType.int,
        paramType.string,
        paramType.bool,
        paramType.string,
        paramType.string,
    ],
    waitForURL,
);
