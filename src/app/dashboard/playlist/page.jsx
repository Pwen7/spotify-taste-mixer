'use client'

import { useEffect, useState } from "react"
import { generatePlaylist } from "@/lib/spotify"
import { loadPreferences } from "@/lib/preferences"
import PlaylistDisplay from "@/components/PlaylistDisplay"

const BASE = 15
const STEP = 5

export default function PlaylistPage() {
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(true)
    const [trackCount, setTrackCount] = useState(BASE)
    const [lastPreferences, setLastPreferences] = useState(null)

    // Generar playlist
    useEffect(() => {
        const prefs = loadPreferences()
        setLastPreferences(prefs)

        generatePlaylist(prefs)
            .then(tracks => {
                const list = (tracks || []).slice(0, BASE)
                setPlaylist(list)
                setTrackCount(list.length)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleRemove = (id) => {
        setPlaylist(prev => {
            const updated = prev.filter(t => t.id !== id)
            setTrackCount(updated.length)
            return updated
        })
    }

    const handleToggleFavorite = (track) => {
        console.log("fav", track)
    }

    const handleRefresh = async () => {
        if (!lastPreferences) return
        setLoading(true)
        try {
            const tracks = await generatePlaylist(lastPreferences)
            const refreshed = (tracks || []).slice(0, trackCount)
            setPlaylist(refreshed)
            // conservar trackCount
        } catch (e) {
            console.error('ERROR refreshing playlist', e)
        } finally {
            setLoading(false)
        }
    }

    const handleAddMore = async () => {
        if (!lastPreferences) return
        setLoading(true)
        try {
            const tracks = await generatePlaylist(lastPreferences)
            setPlaylist(prev => {
                const existingIds = new Set(prev.map(t => t.id))
                const newOnes = (tracks || []).filter(t => !existingIds.has(t.id))
                const toAdd = newOnes.slice(0, STEP)
                const updated = [...prev, ...toAdd]
                setTrackCount(updated.length)
                return updated
            })
        } catch (e) {
            console.error('ERROR adding more tracks', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="flex items-center gap-3 text-gray-300">
                        <div className="h-5 w-5 border-t-2 border-[#1db954] rounded-full animate-spin" />
                        <div>Loading playlist…</div>
                    </div>
                </div>
            ) : (
                <PlaylistDisplay
                    playlist={playlist}
                    onRemove={handleRemove}
                    onToggleFavorite={handleToggleFavorite}
                    onRefresh={handleRefresh}
                    onAddMore={handleAddMore}
                />
            )}
        </div>
    )
}
