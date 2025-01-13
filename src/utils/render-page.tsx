import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import NavBar from '../components/navbar/navbar';

import './site-page.module.scss';
import SampleWrapper, { SampleWrapperProps } from '../components/sample-wrapper/sample-wrapper';

type ComponentModule = { default: ComponentType };
type SampleModule = SampleWrapperProps & ComponentModule;

export default function renderPage({ default: Content, ...rest }: ComponentModule | SampleModule) {
    const elm = document.getElementById('root');

    if (elm == null) {
        throw new Error('Could not find root element');
    }

    let page = <Content />;
    if ('modelName' in rest && 'ModelConstructor' in rest) {
        page = <SampleWrapper {...rest}>{page}</SampleWrapper>;
    }

    const root = createRoot(elm);
    root.render(
        <StrictMode>
            <NavBar />
            <main>
                {page}
            </main>
            <footer>MIT © 2024</footer>
        </StrictMode>,
    );
}
