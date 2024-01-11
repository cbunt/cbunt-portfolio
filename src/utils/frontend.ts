import { createRoot } from 'react-dom/client';
import { ElementType, PropsWithChildren, ComponentPropsWithoutRef, ReactNode } from 'react';

export type PolymorphicProps<
    E extends ElementType | undefined,
    D extends ElementType = 'div',
    Base extends object = Record<string, never>,
> =
    Omit<PropsWithChildren<ComponentPropsWithoutRef<E extends undefined ? D : E>
    & { forwardedAs?: E }>, keyof Base> & Base;

// adapted from https://github.com/yoksel/url-encoder/blob/master/src/js/script.js
export function svgToDataURL(svg: string) {
    let encoded = svg.replace(/"/g, '\'');
    encoded = encoded.replace(/>\s{1,}\n*</g, '><');
    encoded = encoded.replace(/(\s{2,}|\n)/g, ' ');
    encoded = encoded.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
    return `url("data:image/svg+xml,${encoded}")`;
}

export function renderApp(app: ReactNode, rootId: string = 'root') {
    const elm = document.getElementById(rootId);
    if (elm == null) {
        throw new Error('Could not find root element');
    }
    const root = createRoot(elm);
    root.render(app);
}
