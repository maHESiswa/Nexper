'use client';

import { FC, useState, useRef, KeyboardEvent } from 'react';

// === DEFINISI TEMPLATE DINAMIS ===
const templates = {
  span: (text: string, id: number) => (
    <span key={id} className="px-3 py-1 bg-gray-100 rounded border text-gray-800">
      {text}
    </span>
  ),
  p: (text: string, id: number) => (
    <p key={id} className="px-3 py-1 bg-blue-50 rounded border text-blue-800">
      {text}
    </p>
  ),
  h3: (text: string, id: number) => (
    <h3 key={id} className="px-3 py-1 bg-purple-50 rounded border font-medium text-purple-800">
      {text}
    </h3>
  ),
  div: (text: string, id: number) => (
    <div key={id} className="px-3 py-1 bg-yellow-50 rounded border text-yellow-800 text-sm">
      {text}
    </div>
  ),
  // Tambah template lain? Cukup tambah di sini → tombol otomatis muncul!
};

type ElementType = keyof typeof templates;

interface ElementItem {
  id: number;
  text: string;
  type: ElementType;
}

const DynamicJsxTemplates: FC = () => {
  const [items, setItems] = useState<ElementItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState<ElementType>('span');
  const inputRef = useRef<HTMLInputElement>(null);

  // Fokus otomatis saat input aktif
  if (isAdding && inputRef.current) {
    inputRef.current.focus();
  }

  // Ambil daftar tipe dari templates
  const availableTypes = Object.keys(templates) as ElementType[];

  // Handler: klik tombol tipe
  const handleAddClick = (type: ElementType) => {
    setSelectedType(type);
    setIsAdding(true);
    setInputValue('');
  };

  // Handler: Enter atau Escape di input
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newId = Date.now(); // Untuk demo; ganti dengan nanoid/uuid jika butuh unik absolut
      const newItem: ElementItem = {
        id: newId,
        text: inputValue.trim(),
        type: selectedType,
      };
      setItems((prev) => [...prev, newItem]);
      reset();
    } else if (e.key === 'Escape') {
      reset();
    }
  };

  const reset = () => {
    setIsAdding(false);
    setInputValue('');
  };

  // Hapus berdasarkan ID (lebih aman daripada index)
  const removeElement = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Render elemen dari data
  const renderElement = (item: ElementItem) => {
    const Template = templates[item.type];
    return Template(item.text, item.id);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Template JSX Dinamis + Tombol Teknis</h1>

      {/* === MODE INPUT === */}
      {isAdding ? (
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-sm font-medium text-gray-700">
            Tambah <strong className="font-mono">{selectedType}</strong>:
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Masukkan teks untuk ${selectedType}...`}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-40 shadow-sm"
          />
        </div>
      ) : (
        /* === GRUP TOMBOL OTOMATIS (NAMA TEKNIS) === */
        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleAddClick(type)}
              className="px-4 py-2 text-sm font-mono font-medium rounded-md hover:shadow-sm transition-all
                bg-white border border-gray-200 hover:bg-gray-50
                text-gray-700 hover:text-gray-900"
            >
              + {type}
            </button>
          ))}
        </div>
      )}

      {/* === RENDER ELEMEN-ELEMEN === */}
      <div className="flex flex-wrap gap-3 mt-6">
        {items.map((item) => (
          <div key={item.id} className="group relative inline-flex">
            {renderElement(item)}
            <button
              onClick={() => removeElement(item.id)}
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
              aria-label={`Hapus elemen ${item.type}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicJsxTemplates;