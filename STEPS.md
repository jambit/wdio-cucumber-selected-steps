# Detailed List of Included Steps

All of these steps can be used with `Given`, `When`, `Then` and `And`.

## alert

### `(an alertbox|a confirmbox|a prompt) (appears|does not appear)`<a name="alert-step-fa18e8bc"></a>

Check if a modal was opened

* **ParamTypes:**
  * `string` -> `"an alertbox" | "a confirmbox" | "a prompt"`
    * The type of modal that is expected
  * `bool` -> `true` = `'does not appear'` and `false` = anything else
    * Check for opposite state
* **Calls:**
  * `expectAlert()`

### `(an alertbox|a confirmbox|a prompt) (matches|does not match) the text "([^"]*)"`<a name="alert-step-bf6a8a5f"></a>

Check the text of a modal

* **ParamTypes:**
  * `string` -> `"an alertbox" | "a confirmbox" | "a prompt"`
    * The type of modal that is expected
  * `bool` -> `true` = `'does not match'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The text to check against
* **Calls:**
  * `expectAlertText()`

### `I (accept|dismiss) the (alertbox|confirmbox|prompt)`<a name="alert-step-50286141"></a>

Handle an alertbox/confirmbox/prompt

* **ParamTypes:**
  * `string` -> `"accept" | "dismiss"`
    * Action to perform
  * `string` -> `"alertbox" | "confirmbox" | "prompt"`
    * Type of modal
* **Calls:**
  * `handleAlert()`

### `I enter "([^"]*)" into the prompt`<a name="alert-step-237c1beb"></a>

Enter text into the current prompt

* **ParamTypes:**
  * `string`
    * The text to enter into the prompt
* **Calls:**
  * `setPromptText()`

## cookies

### `the cookie "([^"]+)" (has|does not have) the value "([^"]*)"`<a name="cookies-step-66c088e1"></a>

Check the content of a cookie against a given value

* **ParamTypes:**
  * `string`
    * The name of the cookie
  * `bool` -> `true` = `'does not have'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The value to check against
* **Calls:**
  * `expectCookieValue()`

### `the cookie "([^"]+)" (exists|does not exist)`<a name="cookies-step-6fddba16"></a>

Check if a cookie with the given name exists

* **ParamTypes:**
  * `string`
    * The name of the cookie
  * `bool` -> `true` = `'does not exist'` and `false` = anything else
    * Check for opposite state
* **Calls:**
  * `expectCookieExists()`

### `I set the cookie "([^"]+)" to "([^"]*)"`<a name="cookies-step-b2ef2208"></a>

Set a given cookie to a given value. When the cookies does not exist it will be created

* **ParamTypes:**
  * `string`
    * The name of the cookie
  * `string`
    * The value of the cookie
* **Calls:**
  * `setCookie()`

### `I delete the cookie "([^"]+)"`<a name="cookies-step-1a6e1de4"></a>

Delete a cookie

* **ParamTypes:**
  * `string`
    * The name of the cookie to delete
* **Calls:**
  * `deleteCookie()`

## delay

### `I pause for (\d+)ms`<a name="delay-step-fdb80b80"></a>

Pause execution for a given number of milliseconds

* **ParamTypes:**
  * `int`
    * Number of milliseconds to pause
* **Calls:**
  * `pause()`

### `I wait(?: (\d+)ms)? for the (?:link|button|element|checkbox|radio) "([^"]+)"(?: to( not)? (exist|be checked|be enabled|be selected|be displayed|have a text|have a value|match the text|match the value|contain the text)(?: "([^"]+)")?)?`<a name="delay-step-c682b20d"></a>

Wait for the given element to be checked, enabled, selected, displayed, match/contain a text, match a value or to exist

* **ParamTypes:**
  * `int.optional`
    * Wait duration (optional)
  * `element`
    * Element getter
  * `bool`
    * Check for opposite state
  * `string.optional`
    * State to check for
  * `string.optional`
    * The value to check for (in case of "match/contain the text/value")
* **Calls:**
  * `waitFor()`
* **Step options:**
* `{ wrapperOptions: { retry: 3, }, }`

### `I wait(?: (\d+)ms) for the (url|path) to( not)? (contain|match) "([^"]+)"`<a name="delay-step-a74e5fe7"></a>

Wait for the url or path to contain or match the specified value

* **ParamTypes:**
  * `int`
    * Wait duration (optional)
  * `string` -> `"url" | "path"`
    * The type to check (url or path)
  * `bool`
    * Check for opposite state
  * `string`
    * State to check for (contain or match)
  * `string`
    * The value to check for
* **Calls:**
  * `waitForURL()`

## elements

### `the element "([^"]+)" is( not)? displayed`<a name="elements-step-6ff1c921"></a>

Check if the given element is (not) displayed

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectDisplayed()`

### `the element "([^"]+)" is( not)? enabled`<a name="elements-step-16ea4871"></a>

Check if the given element is enabled

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectEnabled()`

### `the (?:element|checkbox|radio) "([^"]+)" is( not)? selected`<a name="elements-step-65845e00"></a>

Check the selected state of the given element

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectSelected()`

### `the element "([^"]+)" (exists|does not exist)(?: exactly (\d+) times)?`<a name="elements-step-42fd8dee"></a>

Check if the given element exists in the DOM one or more times

* **ParamTypes:**
  * `elements`
    * The selector key
  * `bool` -> `true` = `'does not exist'` and `false` = anything else
    * Check for opposite state
  * `int.optional`
    * Check if the element exists exactly this number of times
* **Calls:**
  * `expectExists()`

### `the element "([^"]+)" (has|does not have) the same text as the element "([^"]+)"`<a name="elements-step-93d034db"></a>

Compare the contents of two elements with each other

* **ParamTypes:**
  * `element`
    * The selector key for the first element
  * `bool` -> `true` = `'does not have'` and `false` = anything else
    * Check for opposite state
  * `element`
    * The selector key for the second element
* **Calls:**
  * `expectSameTextAs()`

### `the (button|element) "([^"]+)" (matches|does not match) the text "([^"]*)"`<a name="elements-step-130fe842"></a>

Check if the given elements text is the same as the given text

* **ParamTypes:**
  * `string` -> `"element" | "button"`
    * Element type
  * `element`
    * The selector key
  * `bool` -> `true` = `'does not match'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The text to validate against
* **Calls:**
  * `expectText()`

### `the (button|element) "([^"]+)" (contains|does not contain) the text "([^"]+)"`<a name="elements-step-5a76f1c6"></a>

Check if the given elements contains text

* **ParamTypes:**
  * `string` -> `"element" | "button"`
    * Element type
  * `element`
    * The selector key
  * `bool` -> `true` = `'does not contain'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The text to check against
* **Calls:**
  * `expectTextContains()`

### `the (button|element) "([^"]+)" is( not)? empty`<a name="elements-step-612c2b2a"></a>

Check if the given element is empty

* **ParamTypes:**
  * `string` -> `"element" | "button"`
    * Element type
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectEmpty()`

### `the( css)? attribute "([^"]+)" of the element "([^"]+)" is( not)? "([^"]*)"`<a name="elements-step-3836bd63"></a>

Check the given property of the given element

* **ParamTypes:**
  * `bool`
    * Whether to check for a CSS property or an attribute
  * `string`
    * The name of the attribute to check
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
  * `string`
    * The value to match against
* **Calls:**
  * `expectProperty()`

### `the (width|height) of the element "([^"]+)" is( not)? (\d+)px`<a name="elements-step-2e258bbd"></a>

Check the dimensions of the given element

* **ParamTypes:**
  * `string` -> `"width" | "height"`
    * Dimension to check
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
  * `int`
    * Expected size
* **Calls:**
  * `expectSize()`

### `the element "([^"]+)" is( not)? positioned at (\d+)px on the (x|y) axis`<a name="elements-step-9b32e7c8"></a>

Check the offset of the given element

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
  * `float`
    * The position to check against
  * `string` -> `"x" | "y"`
    * The axis to check on
* **Calls:**
  * `expectOffset()`

### `the element "([^"]+)" is( not)? within the viewport`<a name="elements-step-2bd759fb"></a>

Check if the given element is displayed inside the current viewport

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectWithinViewport()`

### `the element "([^"]+)" (has|does not have) the class "([^"]+)"`<a name="elements-step-be35c059"></a>

Check if the given element has the given class

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool` -> `true` = `'does not have'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The class name to check
* **Calls:**
  * `expectClass()`

### `the element "([^"]+)" is( not)? focused`<a name="elements-step-46ce1465"></a>

Check if the given element has the focus

* **ParamTypes:**
  * `element`
    * The selector key
  * `bool`
    * Check for opposite state
* **Calls:**
  * `expectFocus()`

### `I (click|double-click) on the (?:link|button|element|checkbox|radio) "([^"]+)"`<a name="elements-step-acada9ec"></a>

Perform a click action on the given element

* **ParamTypes:**
  * `string`
    * The action to perform
  * `element`
    * The selector key
* **Calls:**
  * `click()`

### `I append "([^"]+)" to the inputfield "([^"]+)"`<a name="elements-step-87a0511f"></a>

Add a value to the current element value

* **ParamTypes:**
  * `string`
    * The value to add to the element
  * `element`
    * The selector key
* **Calls:**
  * `addValue()`

### `I set the inputfield "([^"]+)" to "([^"]+)"`<a name="elements-step-3f31c9a4"></a>

Set the value of the given input field to a new value

* **ParamTypes:**
  * `element`
    * The selector key
  * `string`
    * The value to set the element to
* **Calls:**
  * `setValue()`

### `I clear the inputfield "([^"]+)"`<a name="elements-step-eea5e2da"></a>

Clear the value of a given input field

* **ParamTypes:**
  * `element`
    * The selector key
* **Calls:**
  * `clearValue()`

### `I drag the element "([^"]+)" to the element "([^"]+)"`<a name="elements-step-25a8dcfa"></a>

Drag an element to a given destination

* **ParamTypes:**
  * `element`
    * The selector key for the source element
  * `element`
    * The selector key for the destination element
* **Calls:**
  * `dragElement()`

### `I press "([^"]+)"`<a name="elements-step-11282daf"></a>

Perform a key press

* **ParamTypes:**
  * `string`
    * The key to press
* **Calls:**
  * `pressKey()`

### `I scroll to the element "([^"]+)"`<a name="elements-step-d3153ee9"></a>

Scroll the page to the given element

* **ParamTypes:**
  * `element`
    * The selector key
* **Calls:**
  * `scrollTo()`

### `I select the option with the (name|value|text) "([^"]+)" for the element "([^"]+)"`<a name="elements-step-d3901829"></a>

Select an option of a select element

* **ParamTypes:**
  * `string`
    * Type of method to select by
  * `string`
    * Value to select by
  * `element`
    * The selector key
* **Calls:**
  * `selectOption()`

### `I select the (\d+)(?:st|nd|rd|th) option for the element "([^"]+)"`<a name="elements-step-4f726cea"></a>

Select an option from a select element by it's index

* **ParamTypes:**
  * `int`
    * The index of the option
  * `element`
    * The selector key
* **Calls:**
  * `selectOptionByIndex()`

### `I move to the element "([^"]+)"(?: with an offset of (\d+),(\d+))?`<a name="elements-step-81f2ec13"></a>

Move to the given element with an optional offset on an X and Y position

* **ParamTypes:**
  * `element`
    * The selector key
  * `int.optional`
    * X coordinate to move to
  * `int.optional`
    * Y coordinate to move to
* **Calls:**
  * `moveTo()`

## windows

### `I open the (url|path) "([^"]*)"`<a name="windows-step-fecfca55"></a>

Open the given URL

* **ParamTypes:**
  * `string` -> `"url" | "path"`
    * Type of navigation
  * `string`
    * The URL or path to navigate to
* **Calls:**
  * `openURL()`

### `the title (matches|does not match) the text "([^"]*)"`<a name="windows-step-7c77520a"></a>

Check the title of the current browser window

* **ParamTypes:**
  * `bool` -> `true` = `'does not match'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The expected title
* **Calls:**
  * `expectTitle()`

### `the title (contains|does not contain) the text "([^"]+)"`<a name="windows-step-ca32951e"></a>

Check the title of the current browser window contains expected text/title

* **ParamTypes:**
  * `bool` -> `true` = `'does not contain'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The expected title
* **Calls:**
  * `expectTitleContains()`

### `the (url|path) (matches|does not match) "([^"]*)"`<a name="windows-step-6c257b1e"></a>

Check if the current URL or path matches the given value

* **ParamTypes:**
  * `string` -> `"url" | "path"`
    * The type to check
  * `bool` -> `true` = `'does not match'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The expected value to match against
* **Calls:**
  * `expectURL()`

### `the (url|path) (contains|does not contain) "([^"]+)"`<a name="windows-step-b0392498"></a>

Check if the given string is in the URL path

* **ParamTypes:**
  * `string` -> `"url" | "path"`
    * The type to check
  * `bool` -> `true` = `'does not contain'` and `false` = anything else
    * Check for opposite state
  * `string`
    * The string to check for
* **Calls:**
  * `expectURLContains()`

### `I set the screen size to (\d+) by (\d+)px`<a name="windows-step-14d6a1a4"></a>

Resize the browser window

* **ParamTypes:**
  * `int`
    * The width of the window to resize to
  * `int`
    * The height of the window to resize to
* **Calls:**
  * `resizeWindow()`

### `I close all but the first (?:window|tab)`<a name="windows-step-9301c911"></a>

Close all tabs but the first one.

* **No params**
* **Calls:**
  * `closeAllButFirstTab()`

### `a new (?:window|tab) (appears|does not appear)`<a name="windows-step-e5d88e61"></a>

Check if a new window or tab is opened

* **ParamTypes:**
  * `bool` -> `true` = `'does not appear'` and `false` = anything else
    * Check for opposite state
* **Calls:**
  * `expectNewWindow()`

### `the (url|path) "([^"]*)" is opened in a new (?:tab|window)`<a name="windows-step-9b7dd123"></a>

Check if the given URL or path was opened in a new window

* **ParamTypes:**
  * `string` -> `"url" | "path"`
    * The type to check
  * `string`
    * The expected value to match against
* **Calls:**
  * `expectNewWindowURL()`

### `I close the last opened (?:window|tab)`<a name="windows-step-f49c4c6f"></a>

Close the last opened window

* **No params**
* **Calls:**
  * `closeLastOpenedWindow()`

### `I focus the last opened (?:window|tab)`<a name="windows-step-3d2ec86"></a>

Focus the last opened window

* **No params**
* **Calls:**
  * `focusLastOpenedWindow()`
