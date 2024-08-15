export default /* wgsl */`
    fn hammersley(i: u32, N: u32) -> vec2f {
        var bits = (i << 16u) | (i >> 16u);
        bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
        bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
        bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
        bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
        let rdi = f32(bits) * 2.3283064365386963e-10; // / 0x100000000
        return vec2(f32(i) / f32(N), rdi);
    }

    fn tangentSampleGGX(N: vec3f, Xi: vec2f, a2: f32) -> vec3f {
        const PI = 3.14159265359;

        let phi = 2.0 * PI * Xi.x;
        let cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a2 - 1.0) * Xi.y));
        let sinTheta = sqrt(1.0 - cosTheta * cosTheta);
        
        var H: vec3f;
        H.x = cos(phi) * sinTheta;
        H.y = sin(phi) * sinTheta;
        H.z = cosTheta;

        let up = select(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), abs(N.z) >= 0.999);
        let T = normalize(cross(up, N));
        let B = cross(N, T);

        let S = T * H.x + B * H.y + N * H.z;
        return normalize(S);
    }

    fn vPartLambda(NoV: f32, a2: f32) -> f32 {
        return sqrt(NoV * NoV * (1.0 - a2) + a2);
    }

    fn vCorrelatedGGX(NoV: f32, NoL: f32, a2: f32) -> f32 {
        let GGXV = NoL * vPartLambda(NoV, a2);
        let GGXL = NoV * vPartLambda(NoL, a2);
        return 0.5 / (GGXV + GGXL);
    }

    fn dS2GGX(NoH: f32, a2: f32) -> f32 {
        let s = (a2 - 1.0) * NoH * NoH + 1.0;
        return s * s;
    }

    fn dGGX(NoH: f32, a2: f32) -> f32 {
        const invPI = 1.0 / 3.14159265359;

        let s2 = dS2GGX(NoH, a2);
        return invPI * select(1, a2 / s2, a2 != s2);
    }
`;
