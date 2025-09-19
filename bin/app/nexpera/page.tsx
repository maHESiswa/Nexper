'use client';

// === DEFINISI TEMPLATE DINAMIS ===
const funcpool = {
    fpa: () => console.log('Function A'),
    fpb: () => console.log('Function B'),
    fpc: () => console.log('Function C'),
    fpd: () => console.log('Function D'),
}

export default function DynamicButtons() {
    funcpool.fpd()
    return null
}