'use client'
import { useState, useEffect } from 'react'

export default function PopularityWidget({ popularity, onChange }) {
    const [min, max] = popularity
    const [localRange, setLocalRange] = useState([min, max])

    useEffect(() => {
        setLocalRange([min, max])
    }, [min, max])

    const handleChange = (index, value) => {
        const newRange = [...localRange]
        newRange[index] = Number(value)

        if (index === 0 && newRange[0] > newRange[1]) {
            newRange[1] = newRange[0]
        } else if (index === 1 && newRange[1] < newRange[0]) {
            newRange[0] = newRange[1]
        }

        setLocalRange(newRange)
        onChange(newRange)
    }

    return (
        <div className="p-4 bg-[#121212] rounded-xl">
            <div className="flex justify-between items-center mb-3 font-bold">
                <h2>Popularity</h2>
                <div className='text-[#1db954]'>
                    {localRange[0]} - {localRange[1]}
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <div>Minimum</div>
                        <div className="font-medium">{localRange[0]}</div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={localRange[0]}
                        onChange={(e) => handleChange(0, e.target.value)}
                        className="w-full appearance-none h-2 rounded-lg bg-[#535353] hover:bg-[#b3b3b3] cursor-pointer transition-colors
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:h-4
                            [&::-webkit-slider-thumb]:w-4
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-[#1db954]
                            hover:[&::-webkit-slider-thumb]:bg-[#1ed760]"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <div>Maximum</div>
                        <div className="font-medium">{localRange[1]}</div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={localRange[1]}
                        onChange={(e) => handleChange(1, e.target.value)}
                        className="w-full appearance-none h-2 rounded-lg bg-[#535353] hover:bg-[#b3b3b3] cursor-pointer transition-colors
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:h-4
                            [&::-webkit-slider-thumb]:w-4
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-[#1db954]
                            hover:[&::-webkit-slider-thumb]:bg-[#1ed760]"
                    />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 ">
                <button
                    onClick={() => onChange([80, 100])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Mainstream
                </button>
                <button
                    onClick={() => onChange([50, 80])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Popular
                </button>
                <button
                    onClick={() => onChange([0, 50])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Underground
                </button>
                <button
                    onClick={() => onChange([0, 100])}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}