'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GenreWidget from "@/components/widgets/GenreWidget"
import { loadPreferences, savePreferences } from "@/lib/preferences"

export default function GenresPage() {
    const router = useRouter()
    const [genres, setGenres] = useState([])

    useEffect(() => {
        setGenres(loadPreferences().genres)
    }, [])

    const handleNext = () => {
        const prefs = loadPreferences()
        savePreferences({
            ...prefs,
            genres
        })
        router.push("/dashboard/filters")
    }

    return (
        <div>
            <GenreWidget
                selectedGenres={genres}
                onChange={setGenres}
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
