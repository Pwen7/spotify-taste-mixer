'use client'

import { useEffect, useState } from "react"
import { generatePlaylist } from "@/lib/spotify"
import { loadPreferences } from "@/lib/preferences"
import PlaylistDisplay from "@/components/PlaylistDisplay"

export default function PlaylistPage() {
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const prefs = loadPreferences()
        generatePlaylist(prefs)
            .then(tracks => setPlaylist(tracks))
            .finally(() => setLoading(false))
    }, [])

    const handleRemove = (id) => {
        setPlaylist(prev => prev.filter(t => t.id !== id))
    }

    const handleToggleFavorite = (track) => {
        console.log("fav", track)
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Your Final Playlist</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <PlaylistDisplay
                    playlist={playlist}
                    onRemove={handleRemove}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
        </div>
    )
}
