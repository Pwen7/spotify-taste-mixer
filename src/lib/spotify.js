import { getValidAccessToken, logout } from './auth';

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
        console.error('ERROR getting the API')
        return null
    }
    return res.json()
}

export async function getUserProfile() {
    return getApi('/me')
}

export async function searchArtists(query, limit = 5) {
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

