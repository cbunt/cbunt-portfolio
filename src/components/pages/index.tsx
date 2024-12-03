import SitePage from '../site-page/site-page';

import { renderApp } from '../../utils/frontend';

import { useId, useRef } from 'react';
import DistortComponent from 'react-distortion';
import { DistortStyles, DistortBackground } from 'react-distortion/child-elements';

import voronoiMp4 from 'public/thumbnails/voronoi-water.mp4';
import distortionMp4 from 'public/thumbnails/react-distortion.mp4';
import cubemapBlurMp4 from 'public/thumbnails/cubemap-blur.mp4';
import gltfViewerMp4 from 'public/thumbnails/gltf-viewer.mp4';

import voronoiPng from 'public/thumbnails/voronoi-water.png';
import distortionPng from 'public/thumbnails/react-distortion.png';
import cubemapBlurPng from 'public/thumbnails/cubemap-blur.png';
import gltfViewerPng from 'public/thumbnails/gltf-viewer.png';

import './index.module.css';

type ProjectCardProps = {
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
    const filterId = useId();

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
                animation: 'alternating endless',
                scale: 12,
                baseFrequency: 0.02,
                animationInterval: 700,
                animationJitter: 200,
            }}
            distortChildren={DistortBackground}
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
                            <div
                                className={DistortStyles.border}
                                style={{ filter: `url(#${filterId})` }}
                            />
                        </div>
                    )
                : undefined}
            <p>{description}</p>
            {projectURL != null ? <a href={projectURL} aria-label={name} /> : undefined}
        </DistortComponent>
    );
}

const bio = `
Recent computer science grad looking to help build unique interactive experiences in
games and on the web. I'm also big into guitar, songwriting, containing multitudes, etc.
`;

renderApp(
    <SitePage>
        <hgroup>
            <h2>Cass Bunting</h2>
            <h3>Graphics Programmer</h3>
            <h3>Web Developer</h3>
            <p>{bio}</p>
        </hgroup>
        <ul>
            <ProjectCard
                name="React Distortion"
                description="A React component library for adding procedural distortion to other components."
                projectURL="https://github.com/cbunt/react-distortion"
                videoURL={distortionMp4}
                thumbnailURL={distortionPng}
            />
            <ProjectCard
                name="glTF Viewer"
                description="A WebGPU deferred 3D renderer and glTF model viewer."
                projectURL="/samples/gltf-viewer"
                videoURL={gltfViewerMp4}
                thumbnailURL={gltfViewerPng}
            />
            <ProjectCard
                name="Cubemap Blur"
                description="A tool to seamlessly and evenly blur cubemap textures."
                projectURL="/samples/cubemap-blur"
                videoURL={cubemapBlurMp4}
                thumbnailURL={cubemapBlurPng}
            />
            <ProjectCard
                name="Voronoi Water"
                description="A stylized procedural water shader through voronoi noise and flowmaps"
                projectURL="https://github.com/cbunt/unity-voronoi-water"
                videoURL={voronoiMp4}
                thumbnailURL={voronoiPng}
            />
        </ul>
    </SitePage>,
);
