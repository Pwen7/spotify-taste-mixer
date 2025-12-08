import { getValidAccessToken, logout } from './auth';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  
async function getApi(path) {
    const token = await getValidAccessToken()

    if (!token) { return null }

    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (res.status === 401) {
        logout()
        return null
    }

    if (!res.ok) {
        console.error(`ERROR ${res.status}`)
        return null
    }
    return res.json()
}

export async function getUserProfile() {
    return getApi('/me')
}

export async function searchArtists(query, limit = 10) {
    if (!query) { return null }
    const q = encodeURIComponent(query)
    return getApi(`/search?type=artist&q=${q}&limit=${limit}`)
}

export async function searchTracks(query, limit = 10) {
    if (!query) { return null }
    const q = encodeURIComponent(query)
    return getApi(`/search?type=track&q=${q}&limit=${limit}`)
}

export function getArtistTopTracks(artistId, market) {
    if (!artistId) { return null }
    return getApi(`/artists/${artistId}/top-tracks?market=${market}`)
}

// esta deprecated
// export async function getAudioFeatures(trackIds) {
//     if (!trackIds) { return null }
//     const idsParam = trackIds.slice(0, 50).join(',')
//     return getApi(`/audio-features?ids=${idsParam}`)
// }

export async function generatePlaylist(preferences) {
    const { artists, genres, decades, popularity } = preferences;
    const token = await getValidAccessToken();
    if (!token) { return null }
    let allTracks = [];

    // 1. Obtener top tracks de artistas seleccionados
    for (const artist of artists) {
        const tracks = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        const data = await tracks.json();
        allTracks.push(...data.tracks);
    }

    // 2. Buscar por géneros
    for (const genre of genres) {
        const results = await fetch(
            `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        const data = await results.json();
        allTracks.push(...data.tracks.items);
    }

    // 3. Filtrar por década
    if (decades.length > 0) {
        allTracks = allTracks.filter(track => {
            const year = new Date(track.album.release_date).getFullYear();
            return decades.some(decade => {
                const decadeStart = parseInt(decade);
                return year >= decadeStart && year < decadeStart + 10;
            });
        });
    }

    // 4. Filtrar por popularidad
    if (popularity) {
        const [min, max] = popularity;
        allTracks = allTracks.filter(
            track => track.popularity >= min && track.popularity <= max
        );
    }

    //5. Filtrar por mood usando audio features
    // if (mood) {
    //     const trackIds = allTracks.map(t => t.id)
    //     const features = await getAudioFeatures(trackIds)

    //     const featuresDict = {}
    //     features.audio_features.forEach(f => {
    //         featuresDict[f.id] = f
    //     })

    //     const targetEnergy = mood.energy / 100
    //     const targetValence = mood.valence / 100
    //     const targetDanceability = mood.danceability / 100
    //     const targetAcousticness = mood.acousticness / 100

    //     const tolerance = 0.2 //margen de error

    //     allTracks = allTracks.filter(track => {
    //         const f = featuresDict[track.id]
    //         const energiaOK = Math.abs(f.energy - targetEnergy) <= tolerance
    //         const valenciaOK = Math.abs(f.valence - targetValence) <= tolerance
    //         const baileOK = Math.abs(f.danceability - targetDanceability) <= tolerance
    //         const acusticaOK = Math.abs(f.acousticness - targetAcousticness) <= tolerance

    //         return energiaOK && valenciaOK && baileOK && acusticaOK
    //     })
    // }

    // 6. Eliminar duplicados
    const uniqueTracks = Array.from(
        new Map(allTracks.map(track => [track.id, track])).values()
    );

    // 7. Barajar para que en cada llamada tengamos orden distinto
    return shuffle(uniqueTracks)
}

