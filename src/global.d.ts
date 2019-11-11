/* eslint-disable no-unused-vars */
declare function getSelector(value: string): string | Function;

declare namespace NodeJS {
    interface Global {
        getSelector: (value: string) => string | Function;
    }
}
