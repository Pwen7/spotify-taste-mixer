'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import { loadPreferences, savePreferences } from "@/lib/preferences"

export default function Artists() {
    const router = useRouter()
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const prefs = loadPreferences()
        setArtists(prefs.artists)
    }, [])

    const handleNext = () => {
        const prefs = loadPreferences()
        savePreferences({
            ...prefs,
            artists
        })
        router.push("/dashboard/genres")
    }

    return (
        <div>
            <ArtistWidget
                selectedArtists={artists}
                onChange={setArtists}
            />

            <button
                className="mt-6 px-4 py-2 bg-[#1db954] text-[#121212] font-medium rounded"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    )
}
