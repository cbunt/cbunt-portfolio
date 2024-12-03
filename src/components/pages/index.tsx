import SitePage from '../site-page/site-page';
import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import ProjectCard from '../page-elements/project-card';

import voronoiMp4 from 'public/thumbnails/voronoi-water.mp4';
import distortionMp4 from 'public/thumbnails/react-distortion.mp4';
import cubemapBlurMp4 from 'public/thumbnails/cubemap-blur.mp4';
import gltfViewerMp4 from 'public/thumbnails/gltf-viewer.mp4';

import voronoiPng from 'public/thumbnails/voronoi-water.png';
import distortionPng from 'public/thumbnails/react-distortion.png';
import cubemapBlurPng from 'public/thumbnails/cubemap-blur.png';
import gltfViewerPng from 'public/thumbnails/gltf-viewer.png';

const Bio = styled.hgroup`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), max-content));
    grid-template-rows: auto auto 1fr;
    grid-auto-flow: column;

    padding: 1rem 2rem 3rem;
    width: fit-content;

    h2 {
        font-size: 2rem;
        width: max-content;
        padding: 0 0 0.5rem;
        margin: 0;
    }

    h3 {
        font-style: italic;
        width: max-content;
        margin: 0;
        padding: 0.5rem 1rem;
        font-weight: 300;
        font-stretch: 110%;
    }

    p {
        grid-row: span 3;
        padding: 1rem 0 0;
        margin: 0;
    }
`;

const Cards = styled.div`
    padding: 0.5rem 1rem 0;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));

    &, > div {
        display: grid;
        column-gap: 1.5rem;
        row-gap: 2rem;
    }

    > div {
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }

    &:hover > div > :not(:hover) {
        --secondary-color: var(--background-color);
        opacity: 0.5;
    }
`;

const bio = `
Recent computer science grad looking to help build unique interactive experiences in
games and on the web. I'm also big into guitar, songwriting, containing multitudes, etc.
`;

renderApp(
    <SitePage>
        <Bio>
            <h2>Cass Bunting</h2>
            <h3>Graphics Programmer</h3>
            <h3>Web Developer</h3>
            <p>{bio}</p>
        </Bio>
        <Cards>
            <div>
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
            </div>
            <div>
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
            </div>
        </Cards>
    </SitePage>,
);
