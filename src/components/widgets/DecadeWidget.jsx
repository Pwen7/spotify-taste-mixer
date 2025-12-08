'use client'
import { useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"

const DECADES = [
    '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'
]

export default function DecadeWidget({ selectedDecades, onChange }) {
    const [search, setSearch] = useState('')

    const filtered = DECADES.filter(d =>
        d.toLowerCase().includes(search.toLowerCase())
    )

    function toggleDecade(decade) {
        if (selectedDecades.includes(decade)) {
            onChange(selectedDecades.filter(d => d !== decade))
        } else {
            onChange([...selectedDecades, decade])
        }
    }
    return (
        <div className="p-4 bg-[#121212] rounded-xl">
            <h2 className="font-bold mb-2">Decades</h2>
            <div className="max-h-40 overflow-y-auto space-y-1">
                <div className="flex flex-wrap gap-2">
                    {filtered.map(decade => {
                        const isSelected = selectedDecades.includes(decade)
                        return (
                            <button
                                key={decade}
                                onClick={() => toggleDecade(decade)}
                                className={`flex items-center gap-1 text-nowrap px-2 py-1 rounded shrink-0 transition-colors
                            ${isSelected
                                        ? 'bg-[#b3b3b3] text-[#121212]'
                                        : 'bg-[#212121] hover:bg-[#535353]'
                                    }`}
                            >
                                {isSelected ? (
                                    <MdCheckBox className='text-[#1db954] bg-[#121212]' />
                                ) : (
                                    <MdCheckBoxOutlineBlank />
                                )}
                                <div>{decade}</div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="flex gap-2 mt-6">
                <button
                    onClick={() => onChange([...DECADES])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    All
                </button>
                <button
                    onClick={() => onChange([])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}