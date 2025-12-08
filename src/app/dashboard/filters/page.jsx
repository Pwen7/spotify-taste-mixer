'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getValidAccessToken } from '@/lib/auth'

import DecadeWidget from '@/components/widgets/DecadeWidget'
import PopularityWidget from '@/components/widgets/PopularityWidget'
import MoodWidget from '@/components/widgets/MoodWidget'
import { loadPreferences, savePreferences } from '@/lib/preferences'

export default function FiltersPage() {
    const router = useRouter()

    const [decades, setDecades] = useState([])
    const [popularity, setPopularity] = useState([0, 100])
    const [mood, setMood] = useState({
        energy: 50,
        valence: 50,
        danceability: 50,
        acousticness: 50,
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const token = await getValidAccessToken()
            if (!token) {
                router.push('/')
                return
            }

            const prefs = loadPreferences()
            setDecades(prefs.decades || [])
            setPopularity(prefs.popularity || [0, 100])
            setMood(
                prefs.mood || {
                    energy: 50,
                    valence: 50,
                    danceability: 50,
                    acousticness: 50,
                }
            )

            setLoading(false)
        }

        init()
    }, [router])

    const handleNext = () => {
        const current = loadPreferences()
        savePreferences({
            ...current,
            decades,
            popularity,
            mood,
        })
        router.push('/dashboard/playlist')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1db954]" />
                    <span className="text-sm text-gray-300">Loading filters…</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="grid gap-2 md:grid-cols-3">
                {/* Decades */}
                <div className="md:col-span-1">
                    <DecadeWidget
                        selectedDecades={decades}
                        onChange={setDecades}
                    />
                </div>

                {/* Popularity */}
                <div className="md:col-span-1">
                    <PopularityWidget
                        popularity={popularity}
                        onChange={setPopularity}
                    />
                </div>

                {/* Mood */}
                <div className="md:col-span-1">
                    <MoodWidget
                        mood={mood}
                        onChange={setMood}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-[#1db954] text-[#121212] font-semibold hover:bg-[#1ed760] transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
