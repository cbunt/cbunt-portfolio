import Markdown from 'markdown-to-jsx';

import SampleWrapper from '../../page-elements/sample-wrapper';
import { renderApp } from '../../../utils/frontend';

import source from '../../../samples/cubemap-blur/cubemap-guassian-pyramid.ts?raw';

const getModelConstructor = () => import('../../../samples/cubemap-blur/cubemap-blur-sample').then((m) => m.default);

const content = /* md */`
Computes an approximate, perceptually-even Gaussian pyramid of a cubemap 
texture. Given an image and a desired maximum distance in pixels, for each
blurred mip level the process:

- Calculates the minimum angular distance between any pixel and a perimeter of 
  the given pixel distance
- Uses that minimum angle over 3 as the Guassian sigma for blurring
- For each pixel, samples all pixels of the previous mip within the given distance
  and weights its contribution by the Guassian of the angle between the pixels
- Normalizes the result with the sum of the weights

For heavy loads that could impair smooth rendering or interactivity—such
as large images, high filter distances, or both at once—
<code>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a>
</code> 
is used to break up work over multiple frames.

This demo accepts uncompressed .ktx2 cubemap textures to be uploaded and 
processed. Files are exported in the same format they were uploaded as.
*NOTE:* exported .ktx2 files are currently malformed and unreadable to some 
programs. This is likely due to a bug in the exporting library. Re-exporting them with
[NVIDIA Texture Tools Exporter](https://developer.nvidia.com/texture-tools-exporter)
fixes these issues.
`;

renderApp(
    <SampleWrapper
        modelName="Cubemap Blur"
        getModelConstructor={getModelConstructor}
        sourceText={source}
    >
        <Markdown options={{ wrapper: 'article' }}>{content}</Markdown>
    </SampleWrapper>,
);
