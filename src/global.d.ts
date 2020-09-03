// Fixme: It's a bit ugly to pollute the NodeJS namespace like this. any better ideas?
declare namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type SelectorData = string | number | boolean | null | ((...args: any) => any) | SelectorData[] | { [s: string]: SelectorData };
    type SelectorVarValue = string | number | (() => string | number);
    type SelectedStepsTextMethod = 'getText' | 'textContent';

    interface Global {
        getSelector: (value: string) => SelectorData;
        selectedStepsTextMethod: SelectedStepsTextMethod;
        setSelectorVariable: (key: string, replace: SelectorVarValue) => void;
    }
}
