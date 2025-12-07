'use client'
import { useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"

const DECADES = [
    '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'
]

export default function DecadeWidget({ selectedGenres, onChange }) {
    const [search, setSearch] = useState('')

    const filtered = DECADES.filter(g =>
        g.toLowerCase().includes(search.toLowerCase())
    )

    function toggleDecade(decade) {
        if (selectedGenres.includes(decade)) {
            onChange(selectedGenres.filter(g => g !== decade))
        } else {
            onChange([...selectedGenres, decade])
        }
    }
    return (
        <div className="p-4 bg-[#121212] rounded-xl">
            <h2 className="font-bold mb-2">Decades</h2>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search genres"
                className="w-full text-[14px] px-2 py-1 mb-3 rounded bg-[#212121]"
            />

            <div className="max-h-40 overflow-y-auto space-y-1">
                {filtered.map(decade => {
                    const isSelected = selectedGenres.includes(decade)
                    return (
                        <button
                            key={decade}
                            onClick={() => toggleDecade(decade)}
                            className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded 
                            ${isSelected
                                    ? 'bg-[#1db954]'
                                    : 'bg-[#212121] hover:bg-[#535353]'
                                }`}
                        >
                            {isSelected ? (
                                <MdCheckBox />
                            ) : (
                                <MdCheckBoxOutlineBlank />
                            )}
                            <div>{decade}</div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}