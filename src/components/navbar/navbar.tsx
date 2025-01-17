import { ComponentProps } from 'react';
import DistortComponent from 'react-distortion';

import { interactiveConditionalFilters } from '../distortion-styles';
import styles from './navbar.module.scss';

const GITHUB_NF_CLASS = 'nf-fa-github_square';
const LINKEDIN_NF_CLASS = 'nf-dev-linkedin';
const EMAIL_NF_CLASS = 'nf-md-email';

const iconGradients = [
    { x1: 0.5, y1: 0, x2: 0.5, y2: 1, stopColor: 'var(--accent-1)', id: 'grad-1' },
    { x1: 0, y1: 1, x2: 0.75, y2: 0.5, stopColor: 'var(--accent-2)', id: 'grad-2' },
    { x1: 1, y1: 1, x2: 0.25, y2: 0.5, stopColor: 'var(--accent-3)', id: 'grad-3' },
];

function Link(props: Omit<ComponentProps<typeof DistortComponent<'a'>>, 'as'>) {
    return (
        <DistortComponent
            as="a"
            {...interactiveConditionalFilters}
            {...props}
        />
    );
};

export default function NavBar() {
    return (
        <aside>
            <DistortComponent {...interactiveConditionalFilters}>
                <svg viewBox="0 0 100 75" width="2rem" height="100%">
                    <defs>
                        {iconGradients.map(({ stopColor, id, ...rest }) => (
                            <linearGradient {...rest} key={id} id={id}>
                                <stop offset="0%" stopColor={stopColor} />
                                <stop offset="100%" stopColor="#0000" />
                            </linearGradient>
                        ))}
                        <polygon
                            id="triangle"
                            style={{ mixBlendMode: 'hard-light' }}
                            points="0 75, 50 0, 100 75"
                        />
                    </defs>
                    <use href="#triangle" fill="white" />
                    {iconGradients.map(({ id }) => <use href="#triangle" fill={`url(#${id})`} key={id} />)}
                </svg>
            </DistortComponent>
            <button type="button" />
            <nav>
                <Link href="/">About</Link>
                <div className={styles['nav-dropdown']}>
                    <DistortComponent
                        as="button"
                        type="button"
                        {...interactiveConditionalFilters}
                        activeFilter={undefined}
                    >
                        Samples
                    </DistortComponent>
                    <DistortComponent
                        as="ul"
                        defaultFilter={{
                            disable: true,
                            scale: 10,
                            baseFrequency: 0.02,
                        }}
                    >
                        {SAMPLES__.map((sample) => (
                            <li key={sample}>
                                <Link href={`/samples/${sample}`}>
                                    {sample.replaceAll('-', ' ')}
                                </Link>
                            </li>
                        ))}
                    </DistortComponent>
                </div>
                <Link href="/resume">Resume</Link>
            </nav>
            <div>
                <Link
                    href="https://github.com/cbunt"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <i className={GITHUB_NF_CLASS} />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/cbunt"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <i className={LINKEDIN_NF_CLASS} />
                </Link>
                <Link href="mailto:cass@cbunt.ing">
                    <i className={EMAIL_NF_CLASS} />
                </Link>
            </div>
        </aside>
    );
}
