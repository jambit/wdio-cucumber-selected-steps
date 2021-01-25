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

Please refer to the [library readme](./packages/library/README.md)

# Developer Notes

There's an issue with yarn and the executable flags for stepdoc in this monorepo. This should only happen in this monorepo, since it includes the stepdoc project.

So after you've build all projects, you'll need to run `chmod +x packages/stepdoc/bin/stepdoc.js` (or your platform equivalent) in order to make the `yarn docs` command work correctly.

# License

Licensed under MIT
