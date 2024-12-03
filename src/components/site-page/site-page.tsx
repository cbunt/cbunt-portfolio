import { ReactNode, StrictMode, JSX } from 'react';

import NavBar from '../navbar/navbar';

import './site-page.module.css';

export type SitePageProps = {
    children: ReactNode,
    extendMainWidth?: boolean,
};

export default function SitePage({ children }: SitePageProps): JSX.Element {
    return (
        <StrictMode>
            <NavBar />
            <main>{children}</main>
            <footer>MIT © 2024</footer>
        </StrictMode>
    );
}
