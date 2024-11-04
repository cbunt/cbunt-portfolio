import { useId, useRef } from 'react';
import styled from 'styled-components';
import DistortComponent from 'react-distortion';
import { DistortStyles } from 'react-distortion/child-elements';

const CardBackground = styled.div.attrs({
    className: DistortStyles.background,
})`
    transition: background-color 0.2s ease;
    --background-color: var(--secondary-color);

`;

const VideoWrapper = styled.div`
    position: relative;

    z-index: 1;
    border: none;
    border-radius: 20px;
    --border-width: 10px;
    --border-color: var(--secondary-color);

    * {
        transition: border-color 0.2s ease;
    }

    video {
        max-width: 100%;
        max-height: 100%;
        border-radius: inherit;
    }
    
    margin: 0.5rem 0;
`;

const CardWrapper = styled(DistortComponent as typeof DistortComponent<'div'>).attrs({
    defaultFilter: {
        disable: true,
        scale: 10,
        baseFrequency: 0.015,
    },
    hoverFilter: {
        disable: true,
        animation: 'alternating endless',
        scale: 12,
        baseFrequency: 0.02,
        animationInterval: 700,
        animationJitter: 200,
    },
    distortChildren: <CardBackground />,
})`
    position: relative;
    transform-origin: center;
    padding: 1.5rem 0.5rem 0rem;

    border-radius: 20px;
    background: none;

    transition:
        opacity 0.3s ease,
        color 0.1s ease,
        transform 0.1s cubic-bezier(.35,-1.02,.38,.75);

    &:hover {
        transform: scale(1.025);
        transition:
            opacity 0.3s ease,
            color 0.2s ease, 
            transform 0.2s cubic-bezier(.38,-0.65,.41,1.67);

        h3 {
            color: var(--accent-1);
        }
    }
    
    &:active {
        transform: scale(1);
    }

    p, h3 {
        margin: 0rem;
        margin-left: 1rem;
        z-index: 2;
    }

    a {
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: 3;
    }
`;

type ProjectCardProps = {
    name: string,
    description: string,
    videoURL?: string,
    projectURL?: string,
};

export default function ProjectCard({ name, description, videoURL, projectURL }: ProjectCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canPlayRef = useRef(true);
    const filterId = useId();

    return (
        <CardWrapper
            filterId={filterId}
            onMouseEnter={() => {
                if (canPlayRef.current) {
                    videoRef.current?.play()
                        .catch(() => { canPlayRef.current = false; });
                }
            }}
            onMouseLeave={() => { videoRef.current?.pause(); }}
        >
            <h3>{name}</h3>
            {videoURL != null
                ? (
                        <VideoWrapper>
                            <video
                                ref={videoRef}
                                loop
                                muted
                                disablePictureInPicture
                                disableRemotePlayback
                                playsInline
                                preload="metadata"
                                src={`${videoURL}#t=0.1`}
                            />
                            <div
                                className={DistortStyles.border}
                                style={{ filter: `url(#${filterId})` }}
                            />
                        </VideoWrapper>
                    )
                : undefined}
            <p>{description}</p>
            {projectURL != null ? <a href={projectURL} aria-label={name} /> : undefined}
        </CardWrapper>
    );
}
