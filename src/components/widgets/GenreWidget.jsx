'use client'
import { useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"

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
            if (selectedGenres.length >= 4) { return };
            onChange([...selectedGenres, genre])
        }
    }
    return (
        <div className="p-4 bg-[#121212] rounded-xl">
            <h2 className="font-bold mb-2">Genres</h2>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search genres"
                className="w-full text-[14px] px-2 py-1 mb-3 rounded bg-[#212121]"
            />

            <div className="max-h-40 overflow-y-auto space-y-1">
                {filtered.map(genre => {
                    const isSelected = selectedGenres.includes(genre)
                    return (
                        <button
                            key={genre}
                            onClick={() => toggleGenre(genre)}
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
                            <div>{genre}</div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}