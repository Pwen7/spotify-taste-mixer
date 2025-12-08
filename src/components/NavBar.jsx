"use client"
import Link from "next/link"

const links = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/dashboard/artists" },
    { name: "Genres", href: "/dashboard/genres" },
    { name: "Filters", href: "/dashboard/filters" },
    { name: "Playlist", href: "/dashboard/playlist" },
]

export default function NavBar() {
    return (
        <nav className="w-full">
            <ul className="flex items-center justify-center gap-1">
                {links.map((link) => {
                    return (<li key={link.name}>
                        <Link
                            href={link.href}
                            className={'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#1ed760] '}>
                            {link.name}
                        </Link>
                    </li>)
                })}
            </ul>
        </nav>
    )
}