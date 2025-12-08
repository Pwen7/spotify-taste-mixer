'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import { loadPreferences, savePreferences } from "@/lib/preferences"

export default function Artists() {
    const router = useRouter()
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
