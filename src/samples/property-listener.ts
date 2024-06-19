import { UnknownObject, mapValues } from '../utils/general';

// Unique symbols to avoid naming colisions with underlying types
const $type = Symbol('PropertyListener -- Type');
const $callback = Symbol('PropertyListener -- Callback');
const $listeners = Symbol('PropertyListener -- Listeners');
export const ListenerSyms = Object.freeze({ $type, $callback, $listeners });

type Syms = typeof $type | typeof $callback | typeof $listeners;
export type ValueKeyCallback<T extends object> = <K extends keyof T, V extends T[K]>(value: V, key: K) => void;

export type GuiSetting<T extends object = object, Tag extends string = string> = {
    [$type]: Tag,
    [$callback]?: ValueKeyCallback<T>,
    [$listeners]: Set<ValueKeyCallback<T>>,
} & T;

export type ListenerSpec<T extends object = object, Tag extends string = string> =
    Omit<GuiSetting<T, Tag>, typeof $listeners>;

type MapSpec<T extends Record<PropertyKey, ListenerSpec>> = {
    [K in keyof T]: T[K] extends ListenerSpec<object, infer Tag> & infer Rest
        ? Rest extends object
            ? GuiSetting<Omit<Rest, Syms>, Tag> : never : never
};

export default function propertyListener<T extends Record<PropertyKey, ListenerSpec<UnknownObject>>>(specs: T) {
    for (const spec of Object.values(specs) as GuiSetting[]) {
        spec[$listeners] = new Set();
    }

    return {
        publicSettings: mapValues(specs, (spec) => new Proxy(spec as GuiSetting<UnknownObject>, {
            set(target, key, value: unknown) {
                if (target[key] !== value) {
                    target[key] = value;
                    target[$callback]?.(value, key);
                }
                return true;
            },
        })) as MapSpec<T>,
        privateSettings: mapValues(specs, (spec) => new Proxy(spec as GuiSetting<UnknownObject>, {
            set(target, key, value: unknown) {
                if (target[key] !== value) {
                    target[key] = value;
                    target[$listeners].forEach((fn) => { fn(value, key); });
                }
                return true;
            },
        })) as MapSpec<T>,
    };
}
