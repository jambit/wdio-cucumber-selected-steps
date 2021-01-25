import {
    defineTypedStep,
    paramType,
    openURL,
    expectTitle,
    expectTitleContains,
    expectURL,
    expectURLContains,
    resizeWindow,
    closeAllButFirstTab,
    expectNewWindow,
    expectNewWindowURL,
    closeLastOpenedWindow,
    focusLastOpenedWindow,
} from '../support';

defineTypedStep(
    /^I open the (url|path) "([^"]*)"$/,
    [
        paramType.string,
        paramType.string,
    ],
    openURL,
);

defineTypedStep(
    /^the title (matches|does not match) the text "([^"]*)"$/,
    [
        paramType.bool.setTrue('does not match'),
        paramType.string,
    ],
    expectTitle,
);

defineTypedStep(
    /^the title (contains|does not contain) the text "([^"]+)"$/,
    [
        paramType.bool.setTrue('does not contain'),
        paramType.string,
    ],
    expectTitleContains,
);

defineTypedStep(
    /^the (url|path) (matches|does not match) "([^"]*)"$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not match'),
        paramType.string,
    ],
    expectURL,
);

defineTypedStep(
    /^the (url|path) (contains|does not contain) "([^"]+)"$/,
    [
        paramType.string,
        paramType.bool.setTrue('does not contain'),
        paramType.string,
    ],
    expectURLContains,
);

defineTypedStep(
    /^I set the screen size to (\d+) by (\d+)px$/,
    [
        paramType.int,
        paramType.int,
    ],
    resizeWindow,
);

defineTypedStep(
    /^I close all but the first (?:window|tab)$/,
    [],
    closeAllButFirstTab,
);

defineTypedStep(
    /^a new (?:window|tab) (appears|does not appear)$/,
    [
        paramType.bool.setTrue('does not appear'),
    ],
    expectNewWindow,
);

defineTypedStep(
    /^the (url|path) "([^"]*)" is opened in a new (?:tab|window)$/,
    [
        paramType.string,
        paramType.string,
    ],
    expectNewWindowURL,
);

defineTypedStep(
    /^I close the last opened (?:window|tab)$/,
    [],
    closeLastOpenedWindow,
);

defineTypedStep(
    /^I focus the last opened (?:window|tab)$/,
    [],
    focusLastOpenedWindow,
);
