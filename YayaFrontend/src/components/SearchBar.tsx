// import  { useEffect, useState } from 'react';
// import { Search } from 'lucide-react';
// export function SearchBar({ defaultValue, onSearch, placeholder = "Search by ID, sender, receiver, cause..." }: { defaultValue?: string; onSearch: (q: string) => void; placeholder?: string; }) {
// const [q, setQ] = useState(defaultValue ?? "");


// useEffect(() => { setQ(defaultValue ?? ""); }, [defaultValue]);
// useEffect(() => { const t = setTimeout(() => onSearch(q.trim()), 350); return () => clearTimeout(t); }, [q]);


// return (
// <div className="relative">
// <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-white/70 px-10 py-3 text-sm outline-none ring-0 focus:border-purple-300 focus:shadow-[0_0_0_3px_rgba(126,87,194,0.15)]" />
// <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
// </div>
// );
// }

// src/components/SearchBar.tsx
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = "Search...", value, onSearch }: SearchBarProps) {
  return (
    <div className="flex items-center w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-2">
      <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onSearch}
        className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
