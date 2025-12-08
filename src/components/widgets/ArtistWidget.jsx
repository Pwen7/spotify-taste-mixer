'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { searchArtists } from '@/lib/spotify'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md"

export default function ArtistWidget({ selectedArtists, onChange }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query) {
            setResults([])
            return
        }

        const timer = setTimeout(async () => {
            setLoading(true)
            const data = await searchArtists(query)
            setResults(data?.artists?.items || [])
            setLoading(false)
        }, 400)

        return () => clearTimeout(timer)
    }, [query])

    function toggleArtist(artist) {
        if (selectedArtists.find(a => a.id === artist.id)) {
            onChange(selectedArtists.filter(a => a.id !== artist.id))
        } else {
            if (selectedArtists.length >= 5) { return }
            onChange([...selectedArtists, artist])
        }
    }

    return (
        <div className="p-4 bg-[#121212] rounded-xl m-5">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold">Artists</h2>
                <div className="text-sm ">
                    {selectedArtists.length}/5
                </div>
            </div>


            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artists"
                className="w-full text-sm px-2 py-1 mb-3 rounded bg-[#212121]"
            />

            {/* Selected*/}
            {selectedArtists.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {selectedArtists.map(artist => (
                        <div
                            key={artist.id}
                            className="inline-flex items-center gap-1 pl-1 pr-2 py-1 bg-[#212121] rounded-full text-sm"
                        >
                            {artist.images?.[0]?.url && (
                                <div className="relative w-6 h-6">
                                    <Image
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        fill
                                        className="rounded-full object-cover"
                                        sizes="20px"
                                    />
                                </div>
                            )}
                            <div className="truncate max-w-[75px]">{artist.name}</div>
                            <button
                                onClick={() => toggleArtist(artist)}
                                className="text-base text-[#b3b3b3] hover:text-white transition-colors"
                            >
                                <MdClose />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Search results */}
            <div className="max-h-120 overflow-y-auto space-y-1">
                {loading ? (
                    <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1db954]"></div>
                    </div>
                ) : results.length > 0 ? (
                    results.map(artist => {
                        const isSelected = selectedArtists.find(a => a.id === artist.id)
                        return (
                            <button
                                key={artist.id}
                                onClick={() => toggleArtist(artist)}
                                className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors
                                    ${isSelected
                                        ? 'bg-[#b3b3b3] text-[#121212]'
                                        : 'bg-[#212121] hover:bg-[#535353]'
                                    }`}
                            >
                                {isSelected ? (
                                    <MdCheckBox className="text-[#1db954] bg-[#121212]" />
                                ) : (
                                    <MdCheckBoxOutlineBlank />
                                )}

                                {artist.images?.[0]?.url && (
                                    <div className="relative w-9 h-9">
                                        <Image
                                            src={artist.images[0].url}
                                            alt={artist.name}
                                            fill
                                            className="rounded-full object-cover"
                                            sizes="24px"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 truncate">{artist.name}</div>
                            </button>
                        )
                    })
                ) : query ? (
                    <div className="text-center py-4 text-sm ">
                        No results
                    </div>
                ) : null}
            </div>
            <div className="flex mt-6">
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