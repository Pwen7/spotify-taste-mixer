'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GenreWidget from "@/components/widgets/GenreWidget"
import { loadPreferences, savePreferences } from "@/lib/preferences"

export default function GenresPage() {
    const router = useRouter()
    const [genres, setGenres] = useState([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        setGenres(loadPreferences().genres)
        setInitialized(true)
    }, [])

    useEffect(() => {
        if (!initialized) {return}

        const current = loadPreferences()
        savePreferences({
            ...current,
            genres,
        })
    }, [genres, initialized])

    return (
        <div>
            <GenreWidget
                selectedGenres={genres}
                onChange={setGenres}
            />
        </div>
    )
}
