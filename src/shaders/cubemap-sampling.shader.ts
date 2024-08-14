export const toWorldDir: string = /* wgsl */`
    fn toWorldDir(coord: vec3u, size: u32) -> vec3f {
        let uv = (2.0 / f32(size)) * (vec2f(coord.xy) + 0.5) - 1.0;

        var pos: vec3f;
        switch (coord.z) {
            case 0  { pos = vec3(  1.0, -uv.y, -uv.x); }
            case 1  { pos = vec3( -1.0, -uv.y,  uv.x); }
            case 2  { pos = vec3( uv.x,   1.0,  uv.y); }
            case 3  { pos = vec3( uv.x,  -1.0, -uv.y); }
            case 4  { pos = vec3( uv.x, -uv.y,   1.0); }
            default { pos = vec3(-uv.x, -uv.y,  -1.0); }
        }

        return normalize(pos);
    }
`;

/**
 *  WGSL functions for sampling across adjacent faces of a cubemap
 */
export const cubemapSampleConversions: string = /* wgsl */`
    const INVALID_FACE = 6;
    const INVALID_IDX = 4294967295u; // max u32

    fn cubeSampleCoord(coord: vec3i, w: u32) -> vec3u {
        // a flattened matrix of destination faces based on
        // starting face and direction
        const dfaces = array(
            //                               I  Up Down Left Right Invalid
            0, 2, 3, 4, 5, INVALID_FACE, // +X  +Y   -Y   +Z   -Z   
            1, 2, 3, 5, 4, INVALID_FACE, // -X  +Y   -Y   -Z   +Z 
            2, 5, 4, 1, 0, INVALID_FACE, // +Y  -Z   +Z   -X   +X 
            3, 4, 5, 1, 0, INVALID_FACE, // -Y  +Z   -Z   -X   +X 
            4, 2, 3, 1, 0, INVALID_FACE, // +Z  +Y   -Y   -X   +X 
            5, 2, 3, 0, 1, INVALID_FACE, // -Z  +Y   -Y   +X   -X 
        );

        // a flattened matrix in the same form as dfaces
        // giving the index of the dmat array containing 
        // the transformation from the starting face to 
        // the destination face
        const dindices = array(
            0, 1,  2,  3,  4,  0,
            0, 5,  6,  3,  4,  0,
            0, 7,  8,  9,  10, 0,
            0, 11, 12, 13, 14, 0,
            0, 11, 8,  3,  4,  0,
            0, 7,  12, 3,  4,  0,
        );

        // 2x4 matrices transforming a coordinate vector <u, v, w, 1>
        // from one face to another
        const dmats = array(
            array(// 0
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 1
                vec4(0, 1, 1, 0),   // u = v + w
                vec4(-1, 0, 1, -1), // v = w - u - 1
            ),
            array(// 2
                vec4(0, -1, 2, -1), // u = 2w - v - 1
                vec4(1, 0, 0, 0),   // v = u
            ),
            array(// 3
                vec4(1, 0, 1, 0),   // u = u + w
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 4
                vec4(1, 0, -1, 0),  // u = u - w
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 5
                vec4(0, -1, 0, -1), // u = -v - 1
                vec4(1, 0, 0, 0),   // v = u
            ),
            array(// 6
                vec4(0, 1, -1, 0),  // u = v - w
                vec4(-1, 0, 1, -1), // v = w - u - 1
            ),
            array(// 7
                vec4(-1, 0, 1, -1), // u = w - u - 1
                vec4(0, -1, 0, -1), // v = -v - 1
            ),
            array(// 8
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, -1, 0),  // v = v - w
            ),
            array(// 9
                vec4(0, 1, 0, 0),   // u = v
                vec4(-1, 0, 0, -1), // v = -u - 1
            ),
            array(// 10
                vec4(0, -1, 1, -1), // u = w - v - 1
                vec4(1, 0, -1, 0),  // v = u - w
            ),
            array(// 11
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, 1, 0),   // v = v + w
            ),
            array(// 12
                vec4(-1, 0, 1, -1), // u = w - u - 1
                vec4(0, -1, 2, -1), // v = 2w - v - 1
            ),
            array(// 13
                vec4(0, -1, 1, -1), // u = w - v - 1
                vec4(1, 0, 1, 0),   // v = u + w
            ),
            array(// 14
                vec4(0, 1, 0, 0),   // u = v
                vec4(-1, 0, 2, -1), // v = 2w - u - 1
            ),
        );

        let iw = i32(w);

        var dir = 0;
        if (
            coord.y >= iw * 2 - 1 
            || coord.y <= -iw 
            || coord.x >= iw * 2 - 1 
            || coord.x <= -iw
        ) {
            dir = 5;
        } else {
            if (coord.y < 0) {
                dir = 1;
            } else if (coord.y >= iw) {
                dir = 2;
            }
            if (coord.x < 0) {
                dir = select(5, 3, dir == 0);
            } else if (coord.x >= iw) {
                dir = select(5, 4, dir == 0);
            }
        }

        let idx = coord.z * 6 + dir;
        let samp = vec4(coord.xy, iw, 1);
        let dmat = dmats[dindices[idx]];
        return vec3u(vec3(dot(dmat[0], samp), dot(dmat[1], samp), dfaces[idx]));
    }

    fn cubeCoordToIdx(coord: vec3u, w: u32) -> u32 {
        return coord.x + coord.y * w + coord.z * w * w;
    }

    fn cubeIdxToCoord(idx: u32, w: u32) -> vec3u {
        let w2 = w * w;
        let fidx = idx % w2;
        return vec3u(fidx % w, fidx / w, idx / w2);
    }

    fn cubeSampleIdx(uvf: vec3i, w: u32) -> u32 {
        let coord = cubeSampleCoord(uvf, w);
        return select(
            cubeCoordToIdx(coord, w), 
            INVALID_IDX, 
            coord.z == INVALID_FACE,
        );
    }
`;
