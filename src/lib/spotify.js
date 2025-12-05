import { getValidAccessToken, logout } from './auth';

async function getApi(path) {
    const token = await getValidAccessToken()

    if (!token) { throw new Error('ERROR no access token') }

    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!res.ok) { throw new Error('ERROR getting the API') }
    return res.json()
}

export async function getUserProfile() {
    return getApi('/me')
}

export async function getTopArtists(limit = 5, timeRange = 'medium_term') {
    const params = new URLSearchParams({
        limit: String(limit),
        time_range: timeRange,
    })

    const data = await getApi(`/me/top/artists?${params.toString()}`)
    return data.items
}

export async function generatePlaylist(preferences) {
    const { artists, genres, decades, popularity } = preferences;
    const token = await getValidAccessToken();
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

    // 5. Eliminar duplicados y limitar a 30 canciones
    const uniqueTracks = Array.from(
        new Map(allTracks.map(track => [track.id, track])).values()
    ).slice(0, 30);

    return uniqueTracks;
}

