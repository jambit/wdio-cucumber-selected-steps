// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectorData = string | number | boolean | null | ((...args: any) => any) | SelectorData[] | { [s: string]: SelectorData };

declare function getSelector(value: string): SelectorData;
declare const selectedStepsTextMethod: 'getText' | 'textContent';

declare namespace NodeJS {
    interface Global {
        getSelector: (value: string) => SelectorData;
        selectedStepsTextMethod: string;
    }
}
