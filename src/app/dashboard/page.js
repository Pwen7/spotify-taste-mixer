'use client'
import { useState } from 'react'
import GenreWidget from "@/components/widgets/GenreWidget";
import DecadeWidget from '@/components/widgets/DecadeWidget';

export default function DashboardPage() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedDecades, setSelectedDecades] = useState([])


  return (
    <div className="p-4 grid gap-4 md:grid-cols-4">
      <GenreWidget
        selectedGenres={selectedGenres}
        onChange={setSelectedGenres}
      />
      <DecadeWidget
        selectedGenres={selectedDecades}
        onChange={setSelectedDecades}
      />
    </div>
  );
}
