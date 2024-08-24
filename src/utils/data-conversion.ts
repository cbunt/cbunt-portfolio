const { baseTable, shiftTable } = (() => {
    const baseTable = new Uint32Array(256);
    const shiftTable = new Uint32Array(256);

    for (let i = 0; i < 255; ++i) {
        const e = i - 127;
        if (e < -27) { // very small number (0, -0)
            baseTable[i] = 0x0000;
            shiftTable[i] = 24;
        } else if (e < -14) { // small number (denorm)
            baseTable[i] = 0x0400 >> (-e - 14);
            shiftTable[i] = -e - 1;
        } else if (e <= 15) { // normal number
            baseTable[i] = (e + 15) << 10;
            shiftTable[i] = 13;
        } else { // e < 128, large number (Infinity, -Infinity)
            baseTable[i] = 0x7c00;
            shiftTable[i] = 24;
        }
    }

    // e == 128, stay (NaN, Infinity, -Infinity)
    baseTable[255] = 0x7c00;
    shiftTable[255] = 13;

    return { baseTable, shiftTable };
})();

const conversionBuffer = new ArrayBuffer(4);
const floatView = new Float32Array(conversionBuffer);
const uintView = new Uint32Array(conversionBuffer);

export function toFloat16Bytes(val: number) {
    floatView[0] = val;
    const f = uintView[0];
    const e = (f >> 23) & 0x1ff;
    const idx = e & 0xff;
    return baseTable[idx] + ((f & 0x007fffff) >> shiftTable[idx]) + ((e & 0x100) << 7);
}
