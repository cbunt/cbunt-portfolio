import { createRoot } from 'react-dom/client';
import { ElementType, PropsWithChildren, ComponentPropsWithoutRef, ReactNode } from 'react';

export type PolymorphicProps<
    E extends ElementType | undefined,
    D extends ElementType = 'div',
    Base extends object = Record<string, never>,
> =
    Omit<PropsWithChildren<ComponentPropsWithoutRef<E extends undefined ? D : E>
    & { forwardedAs?: E }>, keyof Base> & Base;

export const injectStyle = (() => {
    // this is basically a temporary polyfill for react 19's <style>
    // functionality until its release
    // https://react.dev/blog/2024/04/25/react-19#support-for-stylesheets
    const injectedStyle = document.createElement('style');
    const tags: Record<string, boolean> = {};
    document.head.appendChild(injectedStyle);

    return (css: string, tag: string) => {
        if (tags[tag]) return;
        tags[tag] = true;

        const node = document.createTextNode(css);
        injectedStyle.appendChild(node);
    };
})();

export function renderApp(app: ReactNode, rootId: string = 'root') {
    const elm = document.getElementById(rootId);
    if (elm == null) {
        throw new Error('Could not find root element');
    }
    const root = createRoot(elm);
    root.render(app);
}
