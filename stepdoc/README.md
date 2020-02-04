# Description

This is a tool used to generate markdown documentation for the steps included in the `@jambit/wdio-cucumber-selected-steps` project.
It can be used to generate documentation for your custom steps as well.
Since this project uses the nunjucks template language, you can generate documentation in HTML or something completely different if you supply template files.

## Prerequisites

This documentation generator expects a couple of things to work properly:
- Step definitions are separate from their support functions
- Support functions are written in TypeScript.
- defineTypedStep is used for all steps to be documented.

I.e. the same conditions as in the `@jambit/wdio-cucumber-selected-steps` project.

For example:

```JavaScript
defineTypedStep(
    /^I enter "([^"]*)" into the prompt$/,
    [
        paramType.string,
    ],
    setPromptText,
);
```

## Creating documentation

All you need to to:
- `npm i -D @jambit/wdio-cucumber-selected-steps-stepdoc`
- Create a `stepdoc.json` file next to your package.json (see https://github.com/jambit/wdio-cucumber-selected-steps/ for an example)
- Run `npx stepdoc` (or create a script in the package.json)
- You can even customize the (nunjucks) templates used to generate the documentation by copying them from the template directory.
- Take a look at [src/configTypes.ts](src/configTypes.ts) to see which options are available.

## Creating a template

This project contains two different markdown templates.. a short one and a detailed one.
If you want to write your own, take a look at the ones included and use the [src/templaeTypes.ts](src/templaeTypes.ts) file to see what data is available (`TemplateData` contains the globally available objects).

Check out the [Nunjucks templating documentation](https://mozilla.github.io/nunjucks/templating.html) as well.

## Caveats

You might encounter that there are some limitations where this tool has been tailored to work for the `@jambit/wdio-cucumber-selected-steps` project.

In that respect there are still possibilities to improve this project and make it more generic. Feel free to create a pull request or open an issue if you encounter issues.

# License

Licensed under MIT
