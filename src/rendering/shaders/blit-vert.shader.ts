export default /* wgsl */`
    struct VertOut {
        @builtin(position) pos: vec4f,
        @location(0) uv: vec2f,
    }

    @vertex
    fn vs(@builtin(vertex_index) idx: u32) -> VertOut {
        const pos = array(
            vec2f(-1,  3),
            vec2f(3, -1),
            vec2f(-1, -1),
        );
        var res: VertOut;
        res.pos = vec4f(pos[idx], 0.0, 1.0);
        res.uv = pos[idx] * vec2f(0.5, -0.5) + 0.5;
        return res;
    }
`;
