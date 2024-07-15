export type UnknownObject = Record<PropertyKey, unknown>;

type Equals<X, Y> =
(<T> () => T extends X ? 1 : 2) extends
(<T> () => T extends Y ? 1 : 2)
    ? true
    : false;

type Not<T> = T extends true ? false : true;

export type IsReadonly<O extends object, P extends keyof O> =
    Not<Equals<{ [_ in P]: O[P] }, { -readonly [_ in P]: O[P] }>>;

export function mapValues<U, T extends Record<keyof T, U>, R>(
    obj: T,
    fn: (val: U) => R,
) {
    const entries = Object.entries(obj) as [keyof T, U][];
    const mapped = entries.map(([key, val]) => [key, fn(val)]);
    return Object.fromEntries(mapped) as { [K in keyof T]: R };
}

export function clamp(num: number, min: number, max: number) {
    return Math.max(min, Math.min(max, num));
}

export function padCheck(str: string | undefined) {
    return str == null ? '' : ` ${str}`;
}

export function padTemplate(strings: TemplateStringsArray, ...values: string[]) {
    const result = [strings[0]];
    values.forEach((key, i) => result.push(padCheck(key), strings[i + 1]));
    return result.join('');
}

export function logProperties<T extends object>(properties: T) {
    const entries = Object.entries(properties);
    const strings = entries.map(([key, val]) => `${key}: ${String(val)}`);
    console.log(strings.join('\n'));
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
