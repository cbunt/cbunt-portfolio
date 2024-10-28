import styled from 'styled-components';
import Distortion from 'react-distortion';

const DistortionLink = styled(Distortion as typeof Distortion<'a'>).attrs({
    forwardedAs: 'a',
    defaultFilter: { disable: true },
    activeFilter: { scale: 7 },
    hoverFilter: {
        animation: 'alternating loop',
        scale: 7,
    },
})`
    transform-origin: center;
    text-decoration: none;
    margin: 1rem 1rem;
    text-shadow: transparent 0px 0px 5px;

    transition: 
        text-shadow 0.5s cubic-bezier(.51,-0.33,.74,.78), 
        var(--scale-transition);

    &:hover {
        transform: scale(1.025);
        text-shadow: currentcolor 0px 0px 5px;
        transition: 
            var(--scale-transition), 
            text-shadow 0.2s ease-out;
    }

    &:active {
        transform: scale(0.975);
    }
`;

export default DistortionLink;
