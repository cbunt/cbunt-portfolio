import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import NavBar from '../components/navbar/navbar';

import './site-page.module.scss';

export default function renderPage(Content: ComponentType) {
    const elm = document.getElementById('root');

    if (elm == null) {
        throw new Error('Could not find root element');
    }

    const root = createRoot(elm);
    root.render(
        <StrictMode>
            <NavBar />
            <main>
                <Content />
            </main>
            <footer>MIT © 2024</footer>
        </StrictMode>,
    );
}
