'use client'
import { useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md"

const GENRES = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music'
]

export default function GenreWidget({ selectedGenres, onChange }) {
    const [search, setSearch] = useState('')

    const filtered = GENRES.filter(g =>
        g.toLowerCase().includes(search.toLowerCase())
    )

    function toggleGenre(genre) {
        if (selectedGenres.includes(genre)) {
            onChange(selectedGenres.filter(g => g !== genre))
        } else {
            if (selectedGenres.length >= 3) { return }
            onChange([...selectedGenres, genre])
        }
    }
    return (
        <div className="p-4 bg-[#121212] rounded-xl">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold">Genres</h2>
                <div className="text-sm ">
                    {selectedGenres.length}/3
                </div>
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search genres"
                className="w-full text-sm px-2 py-1 mb-3 rounded bg-[#212121]"
            />

            {selectedGenres.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {selectedGenres.map(genre => (
                        <div
                            key={genre}
                            className="inline-flex items-center gap-1 pl-3 pr-2 py-1 bg-[#212121] rounded-full text-xs"
                        >
                            <div className="truncate max-w-[70px]">{genre}</div>
                            <button
                                onClick={() => toggleGenre(genre)}
                                className="text-base text-[#b3b3b3] hover:text-white transition-colors"
                            >
                                <MdClose />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="max-h-40 overflow-y-auto space-y-1">
                <div className="flex flex-wrap gap-2">
                    {filtered.map(genre => {
                        const isSelected = selectedGenres.includes(genre)
                        return (
                            <button
                                key={genre}
                                onClick={() => toggleGenre(genre)}
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
                                <div>{genre}</div>
                            </button>
                        )
                    })}
                </div>
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