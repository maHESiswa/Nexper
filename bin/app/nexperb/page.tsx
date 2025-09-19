'use client';

// === DEFINISI TEMPLATE DINAMIS ===
const funcpool = {
    fpa: () => {
        return (
            <div>
                <p>Function A</p>
            </div>
        )
    },
    fpb: () => {
        return (
            <div>
                <p>Function B</p>
            </div>
        )
    },
    fpc: () => (
        <div>
            <p>Function C</p>
        </div>
    ),
    fpd: () => (
        <div>
            <p>Function D</p>
        </div>
    ),
}

export default function DynamicButtons() {
    return funcpool.fpa();
}