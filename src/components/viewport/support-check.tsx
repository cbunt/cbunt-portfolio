import styled from 'styled-components';
import Viewport from './viewport';
import Distortion from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';
import { LoadModelConstructor } from '../../samples/settings/sample-spec';

const UnsupportedWarning = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    line-height: 1.5;
    background-color: var(--secondary-color);

    > p { 
        margin: 1rem;
    }
`;

export const CheckWrapper = styled(Distortion).attrs({
    defaultFilter: {
        disable: true,
        scale: 5,
    },
    distortChildren: DistortBorder,
})`
    --border-width: 10px;
    --border-color: var(--background-color);

    aspect-ratio: 1.66 / 1;
    position: relative;
    border: 0px solid #0000;
    width: 100%;
`;

export type SupportCheckProps = {
    getModelConstructor: LoadModelConstructor,
};

export default function SupportCheck({ getModelConstructor }: SupportCheckProps) {
    return (
        <CheckWrapper>
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {navigator.gpu?.requestAdapter == null
                ? (
                        <UnsupportedWarning>
                            <p>
                                This browser does not support webgpu.
                                <br />
                                <br />
                                For an up to date list of supported browsers,
                                <br />
                                see
                                {' '}
                                <a href="https://caniuse.com/webgpu">caniuse.com/webgpu</a>
                                .
                            </p>
                        </UnsupportedWarning>
                    )
                : <Viewport getModelConstructor={getModelConstructor} />}
        </CheckWrapper>
    );
}
