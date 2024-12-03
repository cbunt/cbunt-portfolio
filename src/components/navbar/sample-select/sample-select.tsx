import { useState, useMemo } from 'react';
import Distortion from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';

import Link from '../link';

import styles from './sample-select.module.css';

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

export default function SampleSelect() {
    const [linksOpen, setLinksOpen] = useState(false);
    const [locked, setLocked] = useState(false);

    const items = useMemo(() => sampleNames.map((sample, i) =>
        <Link key={i} href={`/samples/${SAMPLES__[i]}`}>{sample}</Link>,
    ), []);

    return (
        <div
            className={styles['sample-select']}
            onMouseLeave={() => { setLinksOpen(locked); }}
            onFocus={() => {
                setLinksOpen(true);
            }}
            onBlur={(e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                setLinksOpen(locked);
            }}
        >
            <Link
                as="button"
                type="button"
                onMouseDown={() => {
                    setLocked((prev) => !prev);
                    setLinksOpen(!locked || linksOpen);
                }}
                onMouseEnter={() => { setLinksOpen(true); }}
            >
                Samples
            </Link>
            <Distortion
                style={{ display: linksOpen ? 'flex' : 'none' }}
                defaultFilter={{
                    disable: true,
                    scale: 10,
                    baseFrequency: 0.02,
                }}
                distortChildren={DistortBackground}
            >
                {...items}
            </Distortion>
        </div>
    );
}
