export type UnknownObject = Record<PropertyKey, unknown>;

export function mapValues<Input, ObjectType extends Partial<Record<keyof ObjectType, Input>>, Output>(
    obj: ObjectType,
    fn: (val: Input) => Output,
) {
    const entries = Object.entries(obj) as [keyof ObjectType, Input][];
    const mapped = entries.map(([key, val]) => [key, fn(val)]);
    return Object.fromEntries(mapped) as { [K in keyof ObjectType]: Output };
}

export function clamp(num: number, min: number, max: number) {
    return Math.max(min, Math.min(max, num));
}

export function padCheck(str: string | undefined) {
    return str == null || str === '' ? '' : ` ${str}`;
}

export function padTemplate(strings: TemplateStringsArray, ...values: (string | undefined)[]) {
    const result = [strings[0]];
    values.forEach((key, i) => result.push(padCheck(key), strings[i + 1]));
    return result.join('');
}

export function range(n: number) {
    return [...Array(n).keys()];
}

export function mapRange<T>(n: number, fn: (i: number) => T) {
    return range(n).map(fn);
}

export function debounce<Args extends Array<unknown>>(callback: (...args: Args) => unknown, delay: number) {
    let tid: ReturnType<typeof setTimeout> | undefined;
    return function (...args: Args) {
        const ctx = self;
        if (tid != null) clearTimeout(tid);
        tid = setTimeout(() => { callback.apply(ctx, args); }, delay);
    };
};

// adapted from https://stackoverflow.com/a/60702475/17108769
export function binaryInsert<T>(
    arr: T[],
    element: T,
    comparator: (a: T, b: T) => number,
    left = 0,
    right = arr.length - 1,
) {
    if (right - left <= 1) {
        if (comparator(element, arr[left] ?? element) < 0) arr.splice(left, 0, element);
        else if (comparator(element, arr[right] ?? element) > 0) arr.splice(right + 1, 0, element);
        else arr.splice(right, 0, element);
    } else {
        const pivot = Math.floor((right - left) / 2) + left;
        if (comparator(element, arr[pivot]) < 0) binaryInsert(arr, element, comparator, left, pivot);
        else binaryInsert(arr, element, comparator, pivot, right);
    }
}

export function isObject(val: unknown): val is NonNullable<UnknownObject> {
    return typeof val === 'object' && val != null;
}
