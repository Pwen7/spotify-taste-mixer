'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getValidAccessToken } from '@/lib/auth'
import PlaylistDisplay from '@/components/PlaylistDisplay'

export default function DashboardPage() {
    const router = useRouter()
    const [favorites, setFavorites] = useState([])

    // Proteger acceso
    useEffect(() => {
        const check = async () => {
            const token = await getValidAccessToken()
            if (!token) {
                router.push('/')
            }
        }
        check()
    }, [router])

    useEffect(() => {
        if (typeof window === 'undefined') return

        const stored = JSON.parse(
            localStorage.getItem('favorite_tracks') || '[]'
        )
        setFavorites(stored)
    }, [])

    // Cuando quito una canción de la lista de favoritos
    const handleRemoveFavorite = (trackId) => {
        setFavorites(prev => {
            const updated = prev.filter(t => t.id !== trackId)
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorite_tracks', JSON.stringify(updated))
            }
            return updated
        })
    }

    return (
        <div className="p-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Tracks</h1>
            <PlaylistDisplay
                playlist={favorites}
                onRemove={handleRemoveFavorite}
                onToggleFavorite={null}
                onRefresh={null}
                onAddMore={null}
            />
        </div>
    )
}
