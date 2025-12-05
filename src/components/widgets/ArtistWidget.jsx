import Image from 'next/image';

export default function ArtistWidget({ artists }) {
    return (
        <div className="rounded-xl bg-[#121212] p-4 shadow-md shadow-black/40">
            <h3 className="mb-3 text-lg font-semibold text-white">Top Artists</h3>
            <ul>
                {artists.map(a => (
                    <li
                        key={a.id}
                        className="flex items-center gap-3 rounded-lg py-2 hover:bg-[#212121] transition"
                    >
                        <Image
                            src={a.images[0].url}
                            alt={a.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="text-sm font-medium text-white">
                            {a.name}
                        </div>
                        <div className="text-xs text-[#b3b3b3]">
                            Popularity: {a.popularity}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}