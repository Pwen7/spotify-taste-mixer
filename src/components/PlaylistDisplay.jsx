
'use client'

import { useState } from "react"
import { savePlaylistToSpotify } from "@/lib/spotify"
import TrackCard from '@/components/TrackCard'

export default function PlaylistDisplay({ playlist, onRemove, onToggleFavorite, onRefresh, onAddMore }) {
    const canRefresh = typeof onRefresh === 'function'
    const canAddMore = typeof onAddMore === 'function'
    const showControls = canRefresh || canAddMore
    const [saving, setSaving] = useState(false)

    const handleSaveToSpotify = async () => {
        if (!playlist.length || saving) { return }
        setSaving(true)
        try {
            const name = "Spotify Taste Mixer Playlist"
            const description = "Playlist generated with Spotify Taste Mixer"
            const result = await savePlaylistToSpotify(name, description, playlist, false)
        } catch (e) {
            console.error('Error saving playlist to Spotify', e)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="p-4 bg-[#121212] rounded-xl border border-[#2a2a2a] m-5">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-bold text-lg">Your Playlist</h2>
                    {playlist.length > 0 && (
                        <div className="text-sm mt-1">
                            {playlist.length} tracks
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {showControls && (
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={onRefresh}
                                className="px-3 py-1.5 bg-[#212121] text-sm text-gray-300 rounded hover:bg-[#535353] transition-colors cursor-pointer"
                            >
                                Refresh
                            </button>
                            <button
                                type="button"
                                onClick={onAddMore}
                                className="px-3 py-1.5 bg-[#1db954] text-sm font-medium text-[#121212] rounded hover:bg-[#1ed760] transition-colors cursor-pointer"
                            >
                                Add More
                            </button>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleSaveToSpotify}
                        className="px-3 py-1.5 bg-[#1db954] text-sm text-[#121212] rounded hover:bg-[#1ed760] transition-colors cursor-pointer"
                    >
                        {saving ? 'Saving...' : 'Save on Spotify'}
                    </button>
                </div>
            </div>

            {/* Lista de tracks */}
            {playlist.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">No tracks yet</div>
                </div>
            ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {playlist.map((track, index) => (
                        <div key={track.id} className="flex items-center gap-3">
                            <div className="w-6 text-right">
                                <div className="text-xs text-gray-500">{index + 1}</div>
                            </div>
                            <div className="flex-1">
                                <TrackCard
                                    track={track}
                                    onRemove={onRemove}
                                    onToggleFavorite={onToggleFavorite}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}