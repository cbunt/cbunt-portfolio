import { useRef } from 'react';
import DistortComponent from 'react-distortion';

export type ProjectCardProps = {
    name: string,
    description: string,
    videoURL?: string,
    projectURL?: string,
    thumbnailURL?: string,
};

export default function ProjectCard({
    name,
    description,
    videoURL,
    projectURL,
    thumbnailURL,
}: ProjectCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canPlayRef = useRef(true);

    return (
        <DistortComponent
            as="li"
            defaultFilter={{
                disable: true,
                scale: 10,
                baseFrequency: 0.015,
            }}
            hoverFilter={{
                disable: true,
                alternate: true,
                scale: 12,
                baseFrequency: 0.02,
                animationInterval: 700,
                animationJitter: 200,
            }}
            onMouseEnter={() => {
                if (!canPlayRef.current) return;
                videoRef.current
                    ?.play()
                    .catch(() => { canPlayRef.current = false; });
            }}
            onMouseLeave={() => { videoRef.current?.pause(); }}
        >
            <a href={projectURL} aria-label={name}>
                <h3>{name}</h3>
                {videoURL != null
                    ? (
                            <div>
                                <video
                                    ref={videoRef}
                                    loop
                                    muted
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    playsInline
                                    preload="metadata"
                                    poster={thumbnailURL}
                                    src={`${videoURL}#t=0.1`}
                                />
                            </div>
                        )
                    : undefined}
                <p>{description}</p>
            </a>
        </DistortComponent>
    );
};
