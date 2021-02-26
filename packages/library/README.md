# Description

This library ships a set of common steps for writing cucumber feature files for use with [webdriver.io](https://webdriver.io/).

It is based on the official [boilerplate](https://github.com/webdriverio/cucumber-boilerplate), but has been rewritten to bring several improvements:
- Cleaned up sentences
  - Proper english
  - Each sentence can be used correctly in any sentence type (`Given`, `When`, `Then` and `And`).
- No need to write CSS and XPath selectors in `.feature` files.
  - Files are written in separate selector files instead: json, yaml and javascript modules (default export) are supported.
  - This makes sentences more readable for non-developers.
  - This allows to change selectors at one place rather than in multiple `.feature` files when the selectors change.
  - You can even combine multiple selector names in the sentences to select child elements.
    - for example: `'User Table -> User Row X -> Role Column` (where each of the parts separated by " -> " are individual selectors)
- Values extracted from the regular expression are passed through converters before they are passed to the callback.
  - For example to convert text to boolean, integer or floating point values.
  - `string`, `int`, `float`, `bool`, `selector`, `element` and `elements` are supported out of the box.
  - You can write your own.
- Support logic for built-in steps can be reused in custom step definitions.
 - For example if you write a login step definition it can use the `setValue()` and `click()` support helpers.

# How to Use

## Requirements

[Webdriver.io V7 with Cucumber Framework](https://github.com/webdriverio/).

## Setup

Take a look at the [sample project](https://github.com/jambit/wdio-cucumber-selected-steps-demo)

The most important steps are:
- Install the project: `npm install @jambit/wdio-cucumber-selected-steps`
- Install babel (`@babel/core`, `@babel/preset-env` and `@babel/register`)
- Adjust the wdio.conf.js file (see below)

### wdio.conf.js Adjustments
```JavaScript
// This is needed, since the project uses ES6 modules.
require("@babel/register")({
    // This will override `node_modules` ignoring - you can alternatively pass
    // an array of strings to be explicitly matched or a regex / glob
    ignore: [
        // Gherkin, however, is not compatible with babel, so ignore it.
        'node_modules/gherkin/**/*.js'
    ],
});

// At the top:
const setupSelectors = require('@jambit/wdio-cucumber-selected-steps').setupSelectors;

exports.config = {
    //...
    cucumberOpts: {
        //...
        require: [
            // Add the selected steps to cucumber:
            './node_modules/@jambit/wdio-cucumber-selected-steps/lib/steps/*.js',
            // ...
        ],
        //...
    },
    // ...
    before: function (capabilities, specs) {
        // Setup the path to your selectors:
        setupSelectors([
            './src/selectors/*.js'
        ]);
        // ...
    },
```

#### wdio.conf.js Adjustments for Selector Replacements
In some cases, you want to set up some variables in the config to be used in the test.
This can be useful when you need to create data on a remote server during tests and later access them.
If you need those variables to be in the selector files, you can now easily do this!

```JavaScript
const { setupSelectors, setupTextMethod } = require('@jambit/wdio-cucumber-selected-steps');

exports.config = {
    // ...
    before: function (capabilities, specs) {
        // Setup the path to your selectors:
        setupSelectors(...);
        setSelectorVariable("TEST_ID", Date.now().toString());
        // ...
    },
```

In your selector files, you can now use `{{TEST_ID}}` inside of your selector files:

```yml
---
My Selector: ".data-1-{{TEST_ID}}"
My Selector Nested:
  foo: ".data-2-{{TEST_ID}}"
  bar: ".data-3-{{TEST_ID}}"
```

Any value, which is a text (even in a nested object or array) will be replaced with the defined replacement.
You can even specify a function to generate a value:

```JavaScript
        setSelectorVariable("RANDOM", () => Math.random());
```

This function will be called freshly for every text value to be replaced.

#### wdio.conf.js Adjustments for Text Method
Additionally, you can configure the text method used. By default, wdio uses `element.getText()`, which will return the transformed text. I.e. if you set your css to upper-case some text, you will get the upper-case version of the text. If you want to get the non-transformed version, you would have to test the attribute `textContent`. To make this more convenient, you can configure the default behavior.

```JavaScript
const { setupSelectors, setupTextMethod } = require('@jambit/wdio-cucumber-selected-steps');

exports.config = {
    // ...
    before: function (capabilities, specs) {
        // Setup the path to your selectors:
        setupSelectors(...);
        setupTextMethod('textContent');
        // ...
    },
```

If you want to use this logic in your custom steps, use our `getText()` helper.

## Creating Selector Files

In `src/selectors` (of course, you can change the path), create `.js` files that export a map as default like this:

```javascript
export default {
    'Header': '#header',
    'Header - Username': '#header .username',
    'Edit User Dialog - Title': '//h3[@class=\'.dialog__title\' and text()=\'Edit User\']',
};
```

You can write these files as `.json` or `.yaml` as well. Writing it in javascript has the advantage, that you can use functions as selectors as well.

The key can be used in `.feature` files wherever `paramType.selector/element/elements` is used:
- `paramType.selector` will pass this value through `getSelector()`, which will return the value from the selector files.
- `paramType.element` will pass this value through `elementQuery()`, which will return a function, that returns the `WebdriverIO.Element`.
- `paramType.elements` will pass this value through `elementsQuery()`, which will return a function, that returns `WebdriverIO.Element[]`.
- `paramType.element` and `paramType.elements` also override `toString()`, so it can easily be used to print out the selector key (i.e. what is written in the `.feature` files ).

## Visual Studio Code Support:

If you use the [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) extension, you can set it up like this:
```json
{
    "cucumberautocomplete.steps": [
        "node_modules/@jambit/wdio-cucumber-selected-steps/lib/steps/*.js",
        "cucumberautocomplete.syncfeatures": "src/features/*.feature",
        "src/steps/*.js"
    ],
    "cucumberautocomplete.gherkinDefinitionPart": "(Given|When|Then|defineTypedStep)\\("
}
```

## Using Steps

Assuming you know [Gherkin syntax](https://cucumber.io/docs/gherkin/), you should be ready to go. Here is an example:
```gherkin
    Given I open the url "/"
    And   the element "Header" exists
    And   the element "Header - Username" matches the text "Zaphod Beeblebrox"
    When  I click on the element "Header - Username"
    And   I wait for the element "Edit User Dialog - Title" to exist
    Then  ...
```

# List of Included Steps

All of these steps can be used with `Given`, `When`, `Then` and `And`.

## alert

- [`(an alertbox|a confirmbox|a prompt) (appears|does not appear)`](STEPS.md#alert-step-fa18e8bc)\
-> Check if a modal was opened
- [`(an alertbox|a confirmbox|a prompt) (matches|does not match) the text "([^"]*)"`](STEPS.md#alert-step-bf6a8a5f)\
-> Check the text of a modal
- [`I (accept|dismiss) the (alertbox|confirmbox|prompt)`](STEPS.md#alert-step-50286141)\
-> Handle an alertbox/confirmbox/prompt
- [`I enter "([^"]*)" into the prompt`](STEPS.md#alert-step-237c1beb)\
-> Enter text into the current prompt

## cookies

- [`the cookie "([^"]+)" (has|does not have) the value "([^"]*)"`](STEPS.md#cookies-step-66c088e1)\
-> Check the content of a cookie against a given value
- [`the cookie "([^"]+)" (exists|does not exist)`](STEPS.md#cookies-step-6fddba16)\
-> Check if a cookie with the given name exists
- [`I set the cookie "([^"]+)" to "([^"]*)"`](STEPS.md#cookies-step-b2ef2208)\
-> Set a given cookie to a given value. When the cookies does not exist it will be created
- [`I delete the cookie "([^"]+)"`](STEPS.md#cookies-step-1a6e1de4)\
-> Delete a cookie

## delay

- [`I pause for (\d+)ms`](STEPS.md#delay-step-fdb80b80)\
-> Pause execution for a given number of milliseconds
- [`I wait(?: (\d+)ms)? for the (?:link|button|element|checkbox|radio) "([^"]+)"(?: to( not)? (exist|be checked|be enabled|be selected|be displayed|have a text|have a value|match the text|match the value|contain the text)(?: "([^"]+)")?)?`](STEPS.md#delay-step-c682b20d)\
-> Wait for the given element to be checked, enabled, selected, displayed, match/contain a text, match a value or to exist
- [`I wait(?: (\d+)ms)? for the (url|path) to( not)? (contain|match) "([^"]+)"`](STEPS.md#delay-step-30adba18)\
-> Wait for the url or path to contain or match the specified value

## elements

- [`the element "([^"]+)" is( not)? displayed`](STEPS.md#elements-step-6ff1c921)\
-> Check if the given element is (not) displayed
- [`the element "([^"]+)" is( not)? enabled`](STEPS.md#elements-step-16ea4871)\
-> Check if the given element is enabled
- [`the (?:element|checkbox|radio) "([^"]+)" is( not)? selected`](STEPS.md#elements-step-65845e00)\
-> Check the selected state of the given element
- [`the element "([^"]+)" (exists|does not exist)(?: exactly (\d+) times)?`](STEPS.md#elements-step-42fd8dee)\
-> Check if the given element exists in the DOM one or more times
- [`the element "([^"]+)" (has|does not have) the same text as the element "([^"]+)"`](STEPS.md#elements-step-93d034db)\
-> Compare the contents of two elements with each other
- [`the (button|element) "([^"]+)" (matches|does not match) the text "([^"]*)"`](STEPS.md#elements-step-130fe842)\
-> Check if the given elements text is the same as the given text
- [`the (button|element) "([^"]+)" (contains|does not contain) the text "([^"]+)"`](STEPS.md#elements-step-5a76f1c6)\
-> Check if the given elements contains text
- [`the (button|element) "([^"]+)" is( not)? empty`](STEPS.md#elements-step-612c2b2a)\
-> Check if the given element is empty
- [`the( css)? attribute "([^"]+)" of the element "([^"]+)" is( not)? "([^"]*)"`](STEPS.md#elements-step-3836bd63)\
-> Check the given property of the given element
- [`the (width|height) of the element "([^"]+)" is( not)? (\d+)px`](STEPS.md#elements-step-2e258bbd)\
-> Check the dimensions of the given element
- [`the element "([^"]+)" is( not)? positioned at (\d+)px on the (x|y) axis`](STEPS.md#elements-step-9b32e7c8)\
-> Check the offset of the given element
- [`the element "([^"]+)" is( not)? within the viewport`](STEPS.md#elements-step-2bd759fb)\
-> Check if the given element is displayed inside the current viewport
- [`the element "([^"]+)" (has|does not have) the class "([^"]+)"`](STEPS.md#elements-step-be35c059)\
-> Check if the given element has the given class
- [`the element "([^"]+)" is( not)? focused`](STEPS.md#elements-step-46ce1465)\
-> Check if the given element has the focus
- [`I (click|double-click) on the (?:link|button|element|checkbox|radio) "([^"]+)"`](STEPS.md#elements-step-acada9ec)\
-> Perform a click action on the given element
- [`I append "([^"]+)" to the inputfield "([^"]+)"`](STEPS.md#elements-step-87a0511f)\
-> Add a value to the current element value
- [`I set the inputfield "([^"]+)" to "([^"]+)"`](STEPS.md#elements-step-3f31c9a4)\
-> Set the value of the given input field to a new value
- [`I clear the inputfield "([^"]+)"`](STEPS.md#elements-step-eea5e2da)\
-> Clear the value of a given input field
- [`I drag the element "([^"]+)" to the element "([^"]+)"`](STEPS.md#elements-step-25a8dcfa)\
-> Drag an element to a given destination
- [`I press "([^"]+)"`](STEPS.md#elements-step-11282daf)\
-> Perform a key press
- [`I scroll to the element "([^"]+)"`](STEPS.md#elements-step-d3153ee9)\
-> Scroll the page to the given element
- [`I select the option with the (name|value|text) "([^"]+)" for the element "([^"]+)"`](STEPS.md#elements-step-d3901829)\
-> Select an option of a select element
- [`I select the (\d+)(?:st|nd|rd|th) option for the element "([^"]+)"`](STEPS.md#elements-step-4f726cea)\
-> Select an option from a select element by it's index
- [`I move to the element "([^"]+)"(?: with an offset of (\d+),(\d+))?`](STEPS.md#elements-step-81f2ec13)\
-> Move to the given element with an optional offset on an X and Y position

## windows

- [`I open the (url|path) "([^"]*)"`](STEPS.md#windows-step-fecfca55)\
-> Open the given URL
- [`the title (matches|does not match) the text "([^"]*)"`](STEPS.md#windows-step-7c77520a)\
-> Check the title of the current browser window
- [`the title (contains|does not contain) the text "([^"]+)"`](STEPS.md#windows-step-ca32951e)\
-> Check the title of the current browser window contains expected text/title
- [`the (url|path) (matches|does not match) "([^"]*)"`](STEPS.md#windows-step-6c257b1e)\
-> Check if the current URL or path matches the given value
- [`the (url|path) (contains|does not contain) "([^"]+)"`](STEPS.md#windows-step-b0392498)\
-> Check if the given string is in the URL path
- [`I set the screen size to (\d+) by (\d+)px`](STEPS.md#windows-step-14d6a1a4)\
-> Resize the browser window
- [`I close all but the first (?:window|tab)`](STEPS.md#windows-step-9301c911)\
-> Close all tabs but the first one.
- [`a new (?:window|tab) (appears|does not appear)`](STEPS.md#windows-step-e5d88e61)\
-> Check if a new window or tab is opened
- [`the (url|path) "([^"]*)" is opened in a new (?:tab|window)`](STEPS.md#windows-step-9b7dd123)\
-> Check if the given URL or path was opened in a new window
- [`I close the last opened (?:window|tab)`](STEPS.md#windows-step-f49c4c6f)\
-> Close the last opened window
- [`I focus the last opened (?:window|tab)`](STEPS.md#windows-step-3d2ec86)\
-> Focus the last opened window

# Writing Your Own Steps

## Support Helpers

The step definitions above implement their logic in methods found in the [src/support](src/support) folder. These methods can be reused, if you want to write your own step definitions. Have a look at the [docs](https://jambit.github.io/wdio-cucumber-selected-steps/) file for a list of methods.

These methods can be imported like this:

```javascript
import { selectOption } from '@jambit/wdio-cucumber-selected-steps/lib/support';
```

## Writing Your Own Steps

Say, you want to do a bit more than just one of the elemental things above. Just write your own step definition to re-use that logic.

Example login step (ideally split into separate files, but here in one for simplicity):
```javascript
import { defineTypedStep, setValue, paramType, click } from '@jambit/wdio-cucumber-selected-steps/lib/support';
// ...

const loginStep = (user) => {
    const credentials = CREDENTIALS[user];
    if (!credentials) {
        throw new Error("User " + user + " is not implemented!");
    }
    setValue(getSelector('Login Page - Login Name Input'), credentials.user);
    setValue(getSelector('Login Page - Login Password Input'), credentials.password);
    click('click', getSelector('Login Page - Submit'));
};

defineTypedStep(
    /^I log in as "(user|admin)"$/,
    [
        paramType.string,
    ],
    loginStep,
);
```

`defineTypedStep` is a special method that takes these parameters:
* `{RegExp | string}`         *pattern* The regular expression used to match the step
* `{ParamType[]}`             *types*   The param types used to map the expression matches to actual values
* `{StepDefinitionOptions}`   *options* The options to use *(optional)*
* `{StepDefinitionCode}`      *code*    The function to execute

Apart from the types array, this is the same as in normal cucumber. The types array is used to perform a transformation of the strings that the regex returns.

These are the built-in ParamTypes. Use `<property>.optional` instead if the parameter is optional (for example `paramType.string.optional`).
* `paramType.string`      The parameter is expected to be a `string`. No conversion done.
* `paramType.int`         The parameter is expected to be an `integer`. `parseInt()` is applied.
* `paramType.float`       The parameter is expected to be a `float`. `parseFloat()` is applied.
* `paramType.bool`        The parameter is expected to be a `boolean` value. `!!` is applied.
* `paramType.selector`    The parameter is expected to be a selector key. `getSelector()` is applied.
* `paramType.element`     The parameter is expected to be a selector key. `elementQuery()` is applied.
* `paramType.elements`    The parameter is expected to be a selector key. `elementsQuery()` is applied.

If your boolean value is one of two strings, for example `(contains|does not contain)`, then you can specify this like this:
```JavaScript
// Either:
paramType.bool.setTrue('does not contain'),
// Or:
paramType.bool.setFalse('contains'),
```

If you want to avoid always adding the same prefix/suffix for a `paramType.selector/element(s)`, you can use the `.format()` option:
```JavaScript
paramType.selector.format("Prefix{{VALUE}}Suffix"),
```

In this case, if your value received from the .feature file was "FooBar", then it would become "PrefixFooBarSuffix" before being evaluated.

You can even write your own paramTypes. Just have a look at the built-in ones: [src/support/paramType.ts](src/support/paramType.ts).

For samples of how steps can look, just take a look at the [src/steps](src/steps) folder of this library. The logic implementation resides in the [src/support](src/support) folder.

## Documenting Your Own Steps

The documentation for the steps included in this project are automatically generated using the package `@jambit/wdio-cucumber-selected-steps-stepdoc`.
This tool was tailored to be used with this project, but you might be able to use it for your tests as well.

# License

Licensed under MIT
