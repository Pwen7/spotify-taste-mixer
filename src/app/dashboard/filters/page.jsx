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
    const [initialized, setInitialized] = useState(false)

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
            setInitialized(true)
        }

        init()
    }, [router])

    useEffect(() => {
        if (!initialized) { return }

        const current = loadPreferences()
        savePreferences({
            ...current,
            decades,
            popularity,
            mood,
        })
    }, [decades, popularity, mood, initialized])

    if (loading) {
        return (
            <div className="p-4 min-h-screen  flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1db954]" />
                    <div className="text-sm text-gray-300">Loading filters…</div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 min-h-screen ">
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Decades */}
                <div>
                    <DecadeWidget
                        selectedDecades={decades}
                        onChange={setDecades}
                    />
                </div>

                {/* Popularity */}
                <div>
                    <PopularityWidget
                        popularity={popularity}
                        onChange={setPopularity}
                    />
                </div>

                {/* Mood */}
                <div>
                    <MoodWidget
                        mood={mood}
                        onChange={setMood}
                    />
                </div>
            </div>
        </div>
    )
}