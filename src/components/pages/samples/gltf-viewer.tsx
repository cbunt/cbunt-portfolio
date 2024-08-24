// import Markdown from 'markdown-to-jsx';

import SampleWrapper from '../../page-elements/sample-wrapper';
import { renderApp } from '../../../utils/frontend';

const getModelConstructor = () => import('../../../samples/gltf-viewer/gltf-viewer-sample').then((m) => m.default);

// const content = /* md */``;

renderApp(
    <SampleWrapper
        modelName="glTF Viewer"
        getModelConstructor={getModelConstructor}
    >
        {/* <Markdown options={{ wrapper: 'article' }}>{content}</Markdown> */}
    </SampleWrapper>,
);
