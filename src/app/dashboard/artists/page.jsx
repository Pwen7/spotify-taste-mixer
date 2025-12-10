'use client'

import { useState, useEffect } from "react"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import { loadPreferences, savePreferences } from "@/lib/preferences"

export default function Artists() {
    const [artists, setArtists] = useState([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const prefs = loadPreferences()
        setArtists(prefs.artists)
        setInitialized(true)
    }, [])

    useEffect(() => {
        if (!initialized) {return}

        const current = loadPreferences()
        savePreferences({
            ...current,
            artists,
        })
        console.log(`Artists: ${artists[0]}`)
    }, [artists, initialized])

    return (
        <div>
            <ArtistWidget
                selectedArtists={artists}
                onChange={setArtists}
            />
        </div>
    )
}
