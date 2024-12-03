import SampleWrapper from '../../sample-wrapper/sample-wrapper';
import { renderApp } from '../../../utils/frontend';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const getModelConstructor = () => import('../../../samples/gltf-viewer/gltf-viewer-sample').then((m) => m.default);

const content = /* md */`
A glTF renderer written in WebGPU and Typescript. Includes deferred rendering and multi-scattering image based 
lighting adapted from <https://bruop.github.io/ibl/>. Models with unsupported features will likely load without issue,
but will display incorrectly. Included assets are pulled directly from their repos and may be unavailable during 
github outages. Models are from [glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets)
and environment maps are from [glTF Sample Environments](https://github.com/KhronosGroup/glTF-Sample-Environments).

Unsupported features:
- Skinned Meshes
- Animations
- Cameras

Supported extensions:
- [KHR_materials_emissive_strength](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
`;

renderApp(
    <SampleWrapper
        modelName="glTF Viewer"
        loadModelConstructor={getModelConstructor}
    >
        <article>
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </article>
    </SampleWrapper>,
);
