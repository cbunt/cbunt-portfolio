import styled from 'styled-components';
import Viewport from './viewport';
import DistortionElement from '../core/distortion-element';
import { LoadModelConstructor } from '../../samples/sample-spec';

const UnsupportedWarning = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1.66 / 1;
    width: 100%;
    font-weight: 500;
    line-height: 1.5;
    background-color: var(--secondary-color);
`;

const Wrapper = styled(DistortionElement).attrs({
    border: true,
    baseMode: 'none',
    scale: 5,
})`
    --border-width: 10px;
    --border-offset: -0.5;
    --border-color: var(--background-color);

    position: relative;
    border: 0px solid #0000;
`;

export type SupportCheckProps = {
    getModelConstructor: LoadModelConstructor,
};

export default function SupportCheck({ getModelConstructor }: SupportCheckProps) {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}
