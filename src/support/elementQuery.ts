// fixme: support for react$ and react$$, possibly by allowing selectors to be an object like this as well:
// { selector: '...', state?: {...}, props?: {...} }

const separator = ' -> '; // fixme: make configurable?

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementSelectorData = string | ((...args: any) => any);

/**
 * When called, returns a WebdriverIO.Element.
 * @property toString() can be used to get the human readable text for this query.
 */
export type ElementQuery = (() => WebdriverIO.Element) & {
    toString: () => string;
};

/**
 * Get an element query for the specified text
 * @param name The text to get the selectors by. Separate nesting child selectors by " -> ".
 * @returns An ElementQuery for a single element
 * @todo Handle cases, where each selector might return multiple elements?
 * I.e. act like (elementsQuery(name)()[0] || empty-result), but ideally more performant.
 */
export function elementQuery(name: string): ElementQuery {
    const query = () => {
        const names = name.split(separator);
        const selectors = names.map((name2) => getSelector(name2));
        let selector = selectors.shift() as ElementSelectorData;
        expect(selector).toBeTruthy();
        let element: WebdriverIO.Element | null = null;
        do {
            element = (element || browser).$(selector);
            selector = selectors.shift() as ElementSelectorData;
        } while (selector && element.isExisting());

        return element;
    };
    return Object.assign(query, { toString: () => name });
}

function selectNodes(sourceElements: WebdriverIO.Element[], remainingSelectors: Array<SelectorData>): WebdriverIO.Element[] {
    if (remainingSelectors.length === 0 || sourceElements.length === 0) {
        return sourceElements;
    }
    const selector = remainingSelectors.shift() as ElementSelectorData;
    return selectNodes(
        sourceElements.reduce((result: WebdriverIO.Element[], sourceElement) => result.concat(sourceElement.$$(selector)), []),
        remainingSelectors,
    );
}

/**
 * When called, returns an array of WebdriverIO.Element.
 * @property toString() can be used to get the human readable text for this query.
 */
export type ElementsQuery = (() => WebdriverIO.Element[]) & {
    toString: () => string;
};

/**
 * Get an elements query for the specified text
 * @param name The text to get the selectors by. Separate nesting child selectors by " -> ".
 * @returns An ElementsQuery for multiple elements
 */
export function elementsQuery(name: string): ElementsQuery {
    const query = () => {
        const names = name.split(separator);
        expect(names.length).toBeGreaterThan(0);
        const selectors = names.map((name2) => getSelector(name2));
        const selector = selectors.shift() as ElementSelectorData;
        return selectNodes($$(selector), selectors);
    };
    return Object.assign(query, { toString: () => name });
}
