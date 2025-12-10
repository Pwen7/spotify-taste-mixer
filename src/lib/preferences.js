const KEY = "preferences"

const DEFAULT_PREFS = {
    artists: [],
    genres: [],
    decades: [],
    popularity: [0, 100],
    mood: {
        energy: 50,
        valence: 50,
        danceability: 50,
        acousticness: 50,
    },
    moodGenres: [],
}

export function loadPreferences() {

    if (typeof window === "undefined") { return DEFAULT_PREFS }

    const data = localStorage.getItem(KEY)
    if (!data) { return DEFAULT_PREFS }

    return JSON.parse(data)
}

export function savePreferences(prefs) {
    if (typeof window === "undefined") return
    localStorage.setItem(KEY, JSON.stringify(prefs))
}
