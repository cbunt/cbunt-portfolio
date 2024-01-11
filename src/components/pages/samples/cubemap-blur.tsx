import SampleWrapper from '../../page-elements/sample-wrapper';
import { renderApp } from '../../../utils/frontend';

import source from '../../../samples/cubemap-blur/cubemap-guassian-pyramid.ts?raw';

const getModelConstructor = () => import('../../../samples/cubemap-blur/cubemap-blur-sample').then((m) => m.default);

renderApp(
    <SampleWrapper
        modelName="Cubemap Blur"
        getModelConstructor={getModelConstructor}
        sourceText={source}
    >
        <p>
            Computes an approximate, perceptually-even Gaussian pyramid of a cubemap texture.
            Given an image and a desired maximum distance in pixels, for each blurred mip level the process:
            <ul>
                <li>
                    Calculates the minimum angular distance bewteen any pixel and a perimeter
                    of the given pixel distance
                </li>
                <li>Uses that minimum angle over 3 as the Guassian sigma for blurring</li>
                <li>
                    For each pixel, samples all pixels of the previous mip within the given distance
                    and weights its contribution by the Guassian of the angle between the pixels
                </li>
                <li>
                    Normalizes the result with the sum of the weights
                </li>
            </ul>
        </p>
        <p>
            For heavy loads that could impair smooth rendering or interactivity—such
            as large images, high filter distances, or both at once—
            {' '}
            <code>requestAnimationFrame</code>
            {' '}
            is used to break up work over multiple frames.
        </p>
        <p>
            This demo accepts uncompressed .ktx2 cubemap textures to be uploaded and processed.
            Files are exported in the same format they were uploaded as.
            {' '}
            <b>NOTE:</b>
            {' '}
            exported .ktx2 files are currently malformed and unreadable to some programs.
            This is likely due to a bug in the exporting library.
            Re-exporting them with
            {' '}
            <a href="https://developer.nvidia.com/texture-tools-exporter">
                NVIDIA Texture Tools Exporter
            </a>
            {' '}
            fixes these issues.
        </p>
    </SampleWrapper>,
);
