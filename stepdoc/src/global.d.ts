// Since there currently are no types available for the documentation package, here's some loose types:
declare module 'documentation' {
    interface DescriptionChild {
        value: string;
        children: DescriptionChild[];
    }
    interface Description {
        type: string;
        children: DescriptionChild[];
    }
    interface ParamTypeElement {
        type: string;
        value: string;
    }
    interface Param {
        name: string;
        description: Description;
        type: {
            type: string;
            elements: ParamTypeElement[];
        };
    }
    interface Comment {
        name: string;
        description: Description;
        params: Param[];
    }

    function build(indexes: string[], args: {}): Promise<Comment[]>;
}
