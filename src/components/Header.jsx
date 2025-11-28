'use client'

import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { MdOutlineExitToApp } from "react-icons/md";

export default function Header() {
    const router = useRouter()
    const handleLogout = () => {
        logout()
        router.push('/')
    }
    return (
        <header className="bg-[#1db954] w-full">
            <h1>Spotify Taste Mixer</h1>
            <MdOutlineExitToApp
                onClick={handleLogout}
            ></MdOutlineExitToApp>
        </header>
    )
}