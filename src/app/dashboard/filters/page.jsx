'use client'

import { useEffect, useState } from 'react'

import DecadeWidget from '@/components/widgets/DecadeWidget'
import PopularityWidget from '@/components/widgets/PopularityWidget'
import MoodWidget, { MOODS, GENRES_BY_MOOD } from '@/components/widgets/MoodWidget'
import { loadPreferences, savePreferences } from '@/lib/preferences'

export default function FiltersPage() {
    const [decades, setDecades] = useState([])
    const [popularity, setPopularity] = useState([0, 100])
    const [mood, setMood] = useState({
        energy: 50,
        valence: 50,
        danceability: 50,
        acousticness: 50,
    })

    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        setDecades(loadPreferences().decades)
        setPopularity(loadPreferences().popularity)
        setMood(loadPreferences().mood)
        setInitialized(true)
    }, [])

    useEffect(() => {
        if (!initialized) { return }
        const current = loadPreferences()
        savePreferences({
            ...current,
            decades,
            popularity,
        })
        console.log(`Popularity: ${popularity}`)
        console.log(`Decades: ${decades}`)
    }, [popularity, decades, initialized])

    function getPresetNameForMood(mood) {
        for (const [name, config] of Object.entries(MOODS)) {
            if (
                mood.energy === config.energy &&
                mood.valence === config.valence &&
                mood.danceability === config.danceability &&
                mood.acousticness === config.acousticness
            ) {
                return name
            }
        }
        return null
    }

    useEffect(() => {
        if (!initialized) return

        const current = loadPreferences()
        const presetName = getPresetNameForMood(mood)
        const moodGenres = presetName ? GENRES_BY_MOOD[presetName] : []

        savePreferences({
            ...current,
            mood,
            moodGenres,
        })

    }, [mood, initialized])

    return (
        <div className="p-4 min-h-screen ">
            <div className="grid gap-4 lg:grid-cols-3">

                <div>
                    <DecadeWidget
                        selectedDecades={decades}
                        onChange={setDecades}
                    />
                </div>

                <div>
                    <PopularityWidget
                        popularity={popularity}
                        onChange={setPopularity}
                    />
                </div>

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