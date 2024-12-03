import Distortion from 'react-distortion';
import { ComponentProps } from 'react';
import { interactiveFilters } from '../distortion-styles';

export default function Link({
    className,
    ...rest
}: Omit<ComponentProps<'a'> & ComponentProps<typeof Distortion>, 'ref'>) {
    return (
        <Distortion
            as="a"
            {...interactiveFilters}
            {...rest}
        />
    );
};
