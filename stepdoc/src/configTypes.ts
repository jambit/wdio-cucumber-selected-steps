import { ConfigureOptions } from 'nunjucks';

/** Definition of the stepdoc.json contents */
export interface StepDocConfig {
    /** A glob pattern for the support files containing the implementation of steps */
    supportFiles: string;
    /** A glob pattern for the step files containing the definition of steps */
    stepFiles: string;
    /** A list of executions to create documentation */
    executions: StepDocExecutionConfig[];
}

export interface StepDocExecutionConfig {
    /** The file to modify/replace. */
    file: string;
    /** The relative or absolute path to the template file */
    template: string;
    /** If you specify a replace start, the documentation will be inserted into an existing file between start and end */
    replaceStart?: string;
    /** replaceEnd can only be used together with replaceStart. If replaceEnd is not specified, EOF is assumed. */
    replaceEnd?: string;
    /** A custom object supplied to the template. It can be any valid json type */
    context?: StepDocUserContext;
    /** Nunjucks configuration options. See https://mozilla.github.io/nunjucks/api.html#configure */
    options?: ConfigureOptions;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StepDocUserContext = any;
