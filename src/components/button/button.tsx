import DistortComponent from 'react-distortion';
import { ComponentPropsWithoutRef, Ref } from 'react';

import './button.module.scss';
import { interactiveDisabledFilters } from '../distortion-styles';

export default function Button(props: ComponentPropsWithoutRef<'button'> & { forwardedRef?: Ref<HTMLButtonElement> }) {
    return (
        <DistortComponent
            as="button"
            type="button"
            {...interactiveDisabledFilters}
            {...props}
        />
    );
};
