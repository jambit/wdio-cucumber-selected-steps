import { StepDocUserContext } from './configTypes';

/** The attributes of this interface are available as global variables in the template. */
export interface TemplateData {
    /** One dataset per step-file */
    files: StepFile[];
    /** A user context passed through from StepDocExecutionConfig#context */
    context: StepDocUserContext;
}

export interface StepFile {
    /** The step file name without extension */
    title: string;
    /** The included steps */
    steps: Step[];
}

export interface Step {
    /** The regular expression of the step */
    regex: string;
    /** An anchor name to be used for linking. Format: `<file-title>-step-<hash-of-regex>` */
    anchor: string;
    /** The expected parameters */
    params: StepParam[];
    /** The jsdoc comment of the support function */
    description: string;
    /** options passed into defineTypedStep */
    options: string;
    /** The support function name */
    functionName: string;
}

export interface StepParam {
    /** The paramType key */
    type: string;
    /** If paramType.setTrue/setFalse has been used, this contains information about the matching parameter */
    bool?: {
        /** The string that should be matched */
        match: string;
        /** The value to use if the string matches */
        matching: 'true' | 'false';
        /** The value to use if the string does not match */
        notMatching: 'true' | 'false';
    };
    /** If it's a union of type string */
    union?: string[];
    /** The jsdoc comment of the support function */
    description: string;
}
