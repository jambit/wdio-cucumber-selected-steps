import {
    defineTypedStep,
    paramType,
    expectDisplayed,
    expectEnabled,
    expectSelected,
    expectExists,
    expectSameTextAs,
    expectText,
    expectTextContains,
    expectEmpty,
    expectProperty,
    expectSize,
    expectOffset,
    expectWithinViewport,
    expectClass,
    expectFocus,
    click,
    addValue,
    setValue,
    clearValue,
    dragElement,
    pressKey,
    scrollTo,
    selectOption,
    selectOptionByIndex,
    moveTo,
} from '../support';

defineTypedStep(
    /^the element "([^"]+)" is( not)? displayed$/,
    [
        paramType.element,
        paramType.bool,
    ],
    expectDisplayed,
);

defineTypedStep(
    /^the element "([^"]+)" is( not)? enabled$/,
    [
        paramType.element,
        paramType.bool,
    ],
    expectEnabled,
);

defineTypedStep(
    /^the (?:element|checkbox|radio) "([^"]+)" is( not)? selected$/,
    [
        paramType.element,
        paramType.bool,
    ],
    expectSelected,
);

defineTypedStep(
    /^the element "([^"]+)" (exists|does not exist)(?: exactly (\d+) times)?$/,
    [
        paramType.elements,
        paramType.bool.setTrue('does not exist'),
        paramType.int.optional,
    ],
    expectExists,
);

defineTypedStep(
    /^the element "([^"]+)" (has|does not have) the same text as the element "([^"]+)"$/,
    [
        paramType.element,
        paramType.bool.setTrue('does not have'),
        paramType.element,
    ],
    expectSameTextAs,
);

defineTypedStep(
    /^the (button|element) "([^"]+)" (matches|does not match) the text "([^"]*)"$/,
    [
        paramType.string,
        paramType.element,
        paramType.bool.setTrue('does not match'),
        paramType.string,
    ],
    expectText,
);

defineTypedStep(
    /^the (button|element) "([^"]+)" (contains|does not contain) the text "([^"]+)"$/,
    [
        paramType.string,
        paramType.element,
        paramType.bool.setTrue('does not contain'),
        paramType.string,
    ],
    expectTextContains,
);

defineTypedStep(
    /^the (button|element) "([^"]+)" is( not)? empty$/,
    [
        paramType.string,
        paramType.element,
        paramType.bool,
    ],
    expectEmpty,
);

defineTypedStep(
    /^the( css)? attribute "([^"]+)" of the element "([^"]+)" is( not)? "([^"]*)"$/,
    [
        paramType.bool,
        paramType.string,
        paramType.element,
        paramType.bool,
        paramType.string,
    ],
    expectProperty,
);

defineTypedStep(
    /^the (width|height) of the element "([^"]+)" is( not)? (\d+)px$/,
    [
        paramType.string,
        paramType.element,
        paramType.bool,
        paramType.int,
    ],
    expectSize,
);

defineTypedStep(
    /^the element "([^"]+)" is( not)? positioned at (\d+)px on the (x|y) axis$/,
    [
        paramType.element,
        paramType.bool,
        paramType.float,
        paramType.string,
    ],
    expectOffset,
);

defineTypedStep(
    /^the element "([^"]+)" is( not)? within the viewport$/,
    [
        paramType.element,
        paramType.bool,
    ],
    expectWithinViewport,
);

defineTypedStep(
    /^the element "([^"]+)" (has|does not have) the class "([^"]+)"$/,
    [
        paramType.element,
        paramType.bool.setTrue('does not have'),
        paramType.string,
    ],
    expectClass,
);

defineTypedStep(
    /^the element "([^"]+)" is( not)? focused$/,
    [
        paramType.element,
        paramType.bool,
    ],
    expectFocus,
);

defineTypedStep(
    /^I (click|double-click) on the (?:link|button|element|checkbox|radio) "([^"]+)"$/,
    [
        paramType.string,
        paramType.element,
    ],
    click,
);

defineTypedStep(
    /^I append "([^"]+)" to the inputfield "([^"]+)"$/,
    [
        paramType.string,
        paramType.element,
    ],
    addValue,
);

defineTypedStep(
    /^I set the inputfield "([^"]+)" to "([^"]+)"$/,
    [
        paramType.element,
        paramType.string,
    ],
    setValue,
);

defineTypedStep(
    /^I clear the inputfield "([^"]+)"$/,
    [
        paramType.element,
    ],
    clearValue,
);

defineTypedStep(
    /^I drag the element "([^"]+)" to the element "([^"]+)"$/,
    [
        paramType.element,
        paramType.element,
    ],
    dragElement,
);

defineTypedStep(
    /^I press "([^"]+)"$/,
    [
        paramType.string,
    ],
    pressKey,
);

defineTypedStep(
    /^I scroll to the element "([^"]+)"$/,
    [
        paramType.element,
    ],
    scrollTo,
);

defineTypedStep(
    /^I select the option with the (name|value|text) "([^"]+)" for the element "([^"]+)"$/,
    [
        paramType.string,
        paramType.string,
        paramType.element,
    ],
    selectOption,
);

defineTypedStep(
    /^I select the (\d+)(?:st|nd|rd|th) option for the element "([^"]+)"$/,
    [
        paramType.int,
        paramType.element,
    ],
    selectOptionByIndex,
);

defineTypedStep(
    /^I move to the element "([^"]+)"(?: with an offset of (\d+),(\d+))?$/,
    [
        paramType.element,
        paramType.int.optional,
        paramType.int.optional,
    ],
    moveTo,
);
