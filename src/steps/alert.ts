import {
    defineTypedStep,
    paramType,
    expectAlert,
    expectAlertText,
    handleAlert,
    setPromptText,
} from '../support';

defineTypedStep(
    /^(an alertbox|a confirmbox|a prompt) (appears|does not appear)$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not appear'),
    ],
    expectAlert,
);

defineTypedStep(
    /^(an alertbox|a confirmbox|a prompt) (matches|does not match) the text "([^"]*)"$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not match'),
        paramType.string,
    ],
    expectAlertText,
);

defineTypedStep(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    [
        paramType.string,
        paramType.string,
    ],
    handleAlert,
);

defineTypedStep(
    /^I enter "([^"]*)" into the prompt$/,
    [
        paramType.string,
    ],
    setPromptText,
);
