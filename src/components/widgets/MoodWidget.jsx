const MOODS = {
    Happy: {
        energy: 75,
        valence: 85,
        danceability: 80,
        acousticness: 30,
    },
    Sad: {
        energy: 30,
        valence: 25,
        danceability: 40,
        acousticness: 70,
    },
    Energetic: {
        energy: 90,
        valence: 70,
        danceability: 85,
        acousticness: 20,
    },
    Calm: {
        energy: 35,
        valence: 60,
        danceability: 45,
        acousticness: 80,
    },
}

const GENRES_BY_MOOD = {
    Happy: [
        "pop", "dance", "summer", "party", "latin", "funk", "soul",
        "dancehall", "reggaeton", "tropical", "house", "edm",
    ],

    Sad: [
        "acoustic", "sad", "piano", "indie", "emo", "ambient", "folk",
        "singer-songwriter", "rainy-day", "study", "romance"
    ],

    Energetic: [
        "electronic", "edm", "hard-rock", "rock", "metal", "punk",
        "techno", "house", "dubstep", "trance", "drum-and-bass"
    ],

    Calm: [
        "chill", "ambient", "jazz", "classical", "acoustic", "soul",
        "lo-fi", "study", "bossanova", "bluegrass"
    ],
}

export default function MoodWidget({ mood, onChange }) {
    const { energy, valence, danceability, acousticness } = mood

    const updateValue = (key, value) => {
        onChange({
            ...mood,
            [key]: Number(value),
            genres: mood.genres,
        })
    }

    const applyMood = (presetName) => {
        onChange({
            ...MOODS[presetName],
            genres: GENRES_BY_MOOD[presetName],
        })
    }

    const renderSlider = (label, value) => (
        <div className="mb-1">
            <div className="flex justify-between text-sm mb-1">
                <div>{label}</div>
                <div className="font-medium text-[#1db954]">{value}</div>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => updateValue(label.toLowerCase(), e.target.value)}
                className="w-full h-2 rounded-lg accent-[#1db954] cursor-pointer"
            />
        </div>
    )

    return (
        <div className="p-4 bg-[#121212] rounded-xl m-2 mb-0">
            <div className="flex items-center mb-3 font-bold">
                <h2>Mood</h2>
            </div>

            {/* Moods */}
            <div className="mb-4">
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(MOODS).map(([name, config]) => (
                        <button
                            key={name}
                            onClick={() => applyMood(name)}
                            className={`text-left p-2 rounded text-sm transition-colors
                                ${JSON.stringify(mood) === JSON.stringify(config)
                                    ? 'bg-[#b3b3b3] text-[#121212] font-medium'
                                    : 'bg-[#212121] hover:bg-[#535353]'
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sliders */}
            <div className="space-y-1">
                {renderSlider("Energy", energy)}
                {renderSlider("Valence", valence)}
                {renderSlider("Danceability", danceability)}
                {renderSlider("Acousticness", acousticness)}
            </div>

            <div className="flex mt-2">
                <button
                    onClick={() => onChange({
                        energy: 50,
                        valence: 50,
                        danceability: 50,
                        acousticness: 50,
                    })}
                    className="flex-1 text-sm py-2 bg-[#212121] hover:bg-[#535353] rounded transition-colors"
                >
                    Reset
                </button>
            </div>
        </div >
    )
}