import SitePage from '../page-elements/page-wrapper';
import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import ProjectCard from '../page-elements/project-card';

import voronoiImage from 'public/thumbnails/voronoi-water-example.mp4';
import distortionImage from 'public/thumbnails/react-distortion.mp4';
import cubemapBlurImage from 'public/thumbnails/cubemap-blur.mp4';
import gltfThumbnail from 'public/thumbnails/gltf-viewer.mp4';

const Bio = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, max-content));
    padding: 1rem 2rem 3rem;

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

    div {
        align-content: center;
        width: fit-content;
    }

    p {
        padding: 1rem 0 0;
        margin: 0;
    }
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    column-gap: 1.5rem;
    row-gap: 2rem;

    padding: 0.5rem 1rem 0;

    &:hover > :not(:hover) {
        --ok-l1: 1;
        --ok-c-factor: 1;
        opacity: 0.5;
    }
`;

const bio = `
I'm a recent computer science grad looking to help build unique interactive experiences 
in games and on the web. I'm also big into guitar, songwriting, containing multitudes, etc.
`;

renderApp(
    <SitePage>
        <Bio>
            <div>
                <h2>Cass Bunting</h2>
                <h3>Graphics Programmer</h3>
                <h3>Web Developer</h3>
            </div>
            <p>{bio}</p>
        </Bio>
        <Cards>
            <ProjectCard
                name="React Distortion"
                description="A React component library for adding procedural distortion to other components."
                projectURL="https://github.com/cbunt/react-distortion"
                videoURL={distortionImage}
            />
            <ProjectCard
                name="glTF Viewer"
                description="A WebGPU deferred 3D renderer and glTF model viewer."
                projectURL="/samples/gltf-viewer"
                videoURL={gltfThumbnail}
            />
            <ProjectCard
                name="Cubemap Blur"
                description="A tool to seamlessly and evenly blur cubemap textures."
                projectURL="/samples/cubemap-blur"
                videoURL={cubemapBlurImage}
            />
            <ProjectCard
                name="Voronoi Water"
                description="A stylized procedural water shader through voronoi noise and flowmaps"
                projectURL="https://github.com/cbunt/unity-voronoi-water"
                videoURL={voronoiImage}
            />
        </Cards>
    </SitePage>,
);
