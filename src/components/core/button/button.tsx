import DistortComponent from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';
import { ComponentPropsWithoutRef, Ref } from 'react';

import styles from './button.module.css';
import { interactiveFilters } from '../../distortion-styles';

export default function Button({ className, ...rest }: ComponentPropsWithoutRef<'button'> & { forwardedRef?: Ref<HTMLButtonElement> }) {
    return (
        <DistortComponent
            as="button"
            type="button"
            className={`${styles['distortion-button']} ${className ?? ''}`}
            distortChildren={DistortBorder}
            {...interactiveFilters}
            {...rest}
        />
    );
};
