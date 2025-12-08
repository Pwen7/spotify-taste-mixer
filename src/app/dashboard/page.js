'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getValidAccessToken } from '@/lib/auth'
import { generatePlaylist } from '@/lib/spotify'

import GenreWidget from "@/components/widgets/GenreWidget"
import DecadeWidget from '@/components/widgets/DecadeWidget'
import PopularityWidget from '@/components/widgets/PopularityWidget'
import ArtistWidget from '@/components/widgets/ArtistWidget'
import MoodWidget from '@/components/widgets/MoodWidget'
import PlaylistDisplay from '@/components/PlaylistDisplay'

export default function DashboardPage() {
    const router = useRouter()

    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedDecades, setSelectedDecades] = useState([])
    const [popularityRange, setPopularityRange] = useState([0, 100])
    const [selectedArtists, setSelectedArtists] = useState([])
    const [mood, setMood] = useState({
        energy: 50,
        valence: 50,
        danceability: 50,
        acousticness: 50,
    })
    const [playlist, setPlaylist] = useState([])
    const [lastPreferences, setLastPreferences] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const check = async () => {
            const token = await getValidAccessToken()
            if (!token) {
                router.push('/')
            }
        }
        check()
    }, [router])

    const buildPreferences = () => ({
        artists: selectedArtists,
        genres: selectedGenres,
        decades: selectedDecades,
        popularity: popularityRange,
        mood: mood
    })

    const handleGenerate = async () => {
        const prefs = buildPreferences()
        setLoading(true)
        try {
            const tracks = await generatePlaylist(prefs)
            setPlaylist(tracks || [])
            setLastPreferences(prefs)
        } catch (e) {
            console.error('Error generating playlist', e)
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = async () => {
        if (!lastPreferences) return
        setLoading(true)
        try {
            const tracks = await generatePlaylist(lastPreferences)
            setPlaylist(tracks || [])
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
            const newTracks = await generatePlaylist(lastPreferences)
            setPlaylist(prev => {
                const map = new Map(prev.map(t => [t.id, t]))
                    ; (newTracks || []).forEach(t => {
                        if (!map.has(t.id)) map.set(t.id, t)
                    })
                return Array.from(map.values())
            })
        } catch (e) {
            console.error('ERROR adding more tracks', e)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveTrack = (trackId) => {
        setPlaylist(prev => prev.filter(track => track.id !== trackId))
    }

    const handleToggleFavorite = (track) => {
        console.log('Favorite toggled:', track.name)
    }

    return (
        <div className="p-4 min-h-screen">
            {/* Widgets*/}
            <div className="grid gap-4 lg:grid-cols-4">
                <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-4">
                        <ArtistWidget
                            selectedArtists={selectedArtists}
                            onChange={setSelectedArtists}
                        />
                        <GenreWidget
                            selectedGenres={selectedGenres}
                            onChange={setSelectedGenres}
                        />
                        <DecadeWidget
                            selectedDecades={selectedDecades}
                            onChange={setSelectedDecades}
                        />
                        <PopularityWidget
                            popularity={popularityRange}
                            onChange={setPopularityRange}
                        />
                        <MoodWidget
                            mood={mood}
                            onChange={setMood}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                            <PlaylistDisplay
                                playlist={playlist}
                                onRemove={handleRemoveTrack}
                                onToggleFavorite={handleToggleFavorite}
                                onRefresh={handleRefresh}
                                onAddMore={handleAddMore}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-70 py-4 bg-[#1db954] font-bold text-[#121212] rounded-xl hover:bg-[#1ed760]  transition-colors flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#121212]"></div>
                                        <div className="text-lg">Generating Playlist...</div>
                                    </>
                                ) : (
                                    <div className="text-lg">Generate Playlist</div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}