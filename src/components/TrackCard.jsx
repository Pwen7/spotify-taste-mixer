'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function TrackCard({ track, onRemove, onToggleFavorite }) {
    const showControls = typeof onToggleFavorite === 'function'
    const [isFavorite, setIsFavorite] = useState(false)

    // Cargar estado inicial desde localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return
        const stored = JSON.parse(localStorage.getItem('favorite_tracks') || '[]')
        const exists = stored.find((t) => t.id === track.id)
        setIsFavorite(!!exists)
    }, [track.id])

    const handleFavoriteClick = () => {
        if (typeof window === 'undefined') return

        const stored = JSON.parse(localStorage.getItem('favorite_tracks') || '[]')
        const exists = stored.find((t) => t.id === track.id)

        let updated
        if (exists) {
            updated = stored.filter((t) => t.id !== track.id)
            setIsFavorite(false)
        } else {
            updated = [...stored, track]
            setIsFavorite(true)
        }

        localStorage.setItem('favorite_tracks', JSON.stringify(updated))

        if (onToggleFavorite) {
            onToggleFavorite(track)
        }
    }

    return (
        <div className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-[#212121] transition-colors">
            {track.album?.images?.[0]?.url && (
                <div className="relative w-14 h-14 shrink-0">
                    <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        fill
                        className="rounded object-cover"
                        sizes="56px"
                    />
                </div>
            )}

            {/* Info */}
            <div className="flex flex-1 flex-col min-w-0 ">
                <div className="truncate text-sm font-medium text-white">
                    {track.name}
                </div>
                <div className="truncate text-xs text-gray-400">
                    {track.artists?.map((a) => a.name).join(', ')}
                </div>
                <div className="flex items-center gap-3 mt-1">
                    <div className="text-[11px] text-gray-500">
                        {formatDuration(track.duration_ms)}
                    </div>
                    <div className="text-[11px] text-[#1db954]">
                        {track.popularity}% popular
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {showControls && (
                    <button
                        onClick={handleFavoriteClick}
                        className="p-2 hover:text-[#1db954] transition-colors"
                    >
                        {isFavorite ? <FaHeart className="text-[#1db954]" /> : <FaRegHeart />}
                    </button>
                )}

                <button
                    onClick={() => onRemove && onRemove(track.id)}
                    className="p-2 hover:text-red-500 transition-colors"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}