'use client'

import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { MdOutlineExitToApp, MdMusicNote } from "react-icons/md";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/spotify";
import Image from "next/image";

export default function Header() {
    const router = useRouter()
    const [profile, setProfile] = useState(null)

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setProfile(await getUserProfile())
            } catch (e) {
                console.error('ERROR loading the profile:', e);
            }
        }
        fetchProfile()
    }, [])


    return (
        <nav className="bg-[#1db954] w-full p-2 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/90 shadow-md shadow-[#212121]">
                    <MdMusicNote className="text-xl" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide md:text-base">
                        Spotify Taste Mixer
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                {profile && (
                    <div className="hidden flex-col items-end text-right leading-tight md:flex">
                        <span className="text-[14px]">
                            {profile.display_name}
                        </span>
                        <span className="text-[11px]">
                            Session active
                        </span>
                    </div>
                )}
                {profile?.images?.[0]?.url && (
                    <Image
                        src={profile.images[0].url}
                        alt={profile.display_name || "User image"}
                        width={36}
                        height={36}
                        className="h-8 w-8 rounded-full border border-white object-cover md:h-9 md:w-9"
                    />
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-black hover:text-[#1db954] hover:shadow-lg hover:shadow-black/40 md:px-4 md:py-2 md:text-sm"
                >
                    <MdOutlineExitToApp></MdOutlineExitToApp>
                </button>
            </div>

        </nav>
    )
}