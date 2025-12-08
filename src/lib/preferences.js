const KEY = "preferences"

export function loadPreferences() {
    if (typeof window === "undefined") return {
        artists: [],
        genres: [],
        decades: [],
        popularity: [0, 100],
        mood: {
            energy: 50,
            valence: 50,
            danceability: 50,
            acousticness: 50,
        }
    }

    const data = localStorage.getItem(KEY)
    if (!data) return {
        artists: [],
        genres: [],
        decades: [],
        popularity: [0, 100],
        mood: {
            energy: 50,
            valence: 50,
            danceability: 50,
            acousticness: 50,
        }
    }

    return JSON.parse(data)
}

export function savePreferences(prefs) {
    if (typeof window === "undefined") return
    localStorage.setItem(KEY, JSON.stringify(prefs))
}
