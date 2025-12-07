'use client';

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getArtists } from '@/lib/spotify'

export default function ArtistWidget({ artists, onChange }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        if (timer) clearTimeout(timer);
        if (!query) {
            setResults([]);
            return;
        }
        setTimer(setTimeout(async () => {
            try {
                const res = await searchArtists(query);
                setResults(res);
            } catch {
                setResults([]);
            }
        }, 400));
    }, [query]);


    const isSelected = (a) => selectedArtists.some(s => s.id === a.id)

    const toggle = (artist) => {
        if (isSelected(artist)) {
            onChange(selectedArtists.filter(s => s.id !== artist.id))
        } else {
            onChange([...selectedArtists, artist]);
        }
    }

    return (
        <div className="p-3 bg-[#121212] rounded">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-white">Artist selector</h3>
                <span className="text-xs text-gray-300">{selectedArtists.length}</span>
            </div>

            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search artists..."
                className="w-full mb-3 px-2 py-1 rounded bg-white/10 text-sm text-white"
            />

            <div className="space-y-2 max-h-64 overflow-auto">
                {results.map(artist => (
                    <button
                        key={artist.id}
                        onClick={() => toggle(artist)}
                        className={`w-full flex items-center gap-2 p-2 rounded text-left ${isSelected(artist) ? 'bg-[#1db954]/80' : 'bg-white/5'
                            }`}
                    >
                        {artist.images?.[0]?.url && (
                            <Image
                                src={artist.images[0].url}
                                alt={artist.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                        )}
                        <div>
                            <div className="text-sm text-white">{artist.name}</div>
                            {artist.genres?.length > 0 && (
                                <div className="text-xs text-gray-300">{artist.genres.slice(0, 2).join(' • ')}</div>
                            )}
                        </div>
                    </button>
                ))}

                {query && results.length === 0 && (
                    <div className="text-xs text-gray-400">No results</div>
                )}
            </div>
        </div>
    )
}