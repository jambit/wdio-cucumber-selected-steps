declare function getSelector(value: string): string | Function;
declare const selectedStepsTextMethod: 'getText' | 'textContent';

declare namespace NodeJS {
    interface Global {
        getSelector: (value: string) => string | Function;
        selectedStepsTextMethod: string;
    }
}
