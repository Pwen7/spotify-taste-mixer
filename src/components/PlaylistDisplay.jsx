'use client'

import TrackCard from '@/components/TrackCard'

export default function PlaylistDisplay({
    playlist,
    onRemove,
    onToggleFavorite,
    onRefresh,
    onAddMore,
}) {
    return (
        <div className="p-4 bg-[#121212] rounded-xl border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-bold text-lg">Your Playlist</h2>
                    {playlist.length > 0 && (
                        <div className="text-sm mt-1">
                            {playlist.length} tracks
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onRefresh}
                        className="px-3 py-1.5 bg-[#212121] text-sm text-gray-300 rounded hover:bg-[#535353] transition-colors"
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick={onAddMore}
                        className="px-3 py-1.5 bg-[#1db954] text-sm font-medium text-[#121212] rounded hover:bg-[#1ed760] transition-colors"
                    >
                        Add More
                    </button>
                </div>
            </div>

            {/* Lista de tracks */}
            {playlist.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">No tracks yet</div>
                    <div className="text-sm text-gray-500">
                        Configure your filters and click &quot;Generate Playlist&quot;
                    </div>
                </div>
            ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {playlist.map((track, index) => (
                        <div key={track.id} className="flex items-center gap-3">
                            <div className="w-6 text-right">
                                <span className="text-xs text-gray-500">{index + 1}</span>
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