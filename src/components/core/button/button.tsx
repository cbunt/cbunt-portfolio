import DistortComponent from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';
import { ComponentPropsWithoutRef, Ref } from 'react';

import styles from './button.module.css';

export default function Button({ className, ...rest }: ComponentPropsWithoutRef<'button'> & { forwardedRef?: Ref<HTMLButtonElement> }) {
    return (
        <DistortComponent
            as="button"
            type="button"
            className={`${styles['distortion-button']} ${className ?? ''}`}
            defaultFilter={{
                disable: true,
                scale: 5,
                baseFrequency: 0.02,
                numOctaves: 1,
            }}
            hoverFilter={{
                animation: 'alternating loop',
                scale: 4,
                baseFrequency: 0.01,
            }}
            activeFilter={{
                scale: 5,
                baseFrequency: 0.01,
            }}
            distortChildren={DistortBorder}
            {...rest}
        />
    );
};
