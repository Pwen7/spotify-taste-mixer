'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getValidAccessToken } from '@/lib/auth';
import { getTopArtists, getTopTracks } from '@/lib/spotify';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import GenreWidget from '@/components/widgets/GenreWidget';

export default function DashboardPage() {
  const router = useRouter()
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const load = async () => {
      const token = await getValidAccessToken()
      if (!token) {
        router.push('/')
        return
      }

      setArtists(await getTopArtists());
    }

    load()
  }, [router])
  

  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1  space-y-4">
        <ArtistWidget artists={artists} />
        <GenreWidget artists={artists} />
      </div>
    </div>
  );
}
