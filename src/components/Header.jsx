'use client'

import { useRouter, usePathname } from "next/navigation"
import { logout } from "@/lib/auth"
import { MdOutlineExitToApp, MdMusicNote, MdMenu, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/spotify";
import Image from "next/image";
import NavBar from "./NavBar";

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [profile, setProfile] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setProfile(null)
        router.push('/')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setProfile(await getUserProfile())
            } catch (e) {
                console.error('ERROR loading the profile:', e)
                setProfile(null)
                logout()
            }
        }
        fetchProfile()
    }, [pathname])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <>
            <div className="bg-[#1db954] w-full p-2 flex items-center justify-between relative text-black/90" >
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/90 shadow-md shadow-[#212121]">
                        <MdMusicNote className="text-xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm font-semibold tracking-wide md:text-base ">
                            Spotify Taste Mixer
                        </div>
                    </div>
                </div>

                {profile && (
                    <div className="hidden md:block">
                        <NavBar />
                    </div>
                )}

                <div className="flex items-center gap-3 md:gap-4">
                    {profile && (
                        <div className="hidden flex-col items-end text-right leading-tight md:flex">
                            <div className="text-[14px]">
                                {profile.display_name}
                            </div>
                            <div className="text-[11px]">
                                Session active
                            </div>
                        </div>
                    )}
                    {!profile && (
                        <div className="hidden flex-col items-end text-right leading-tight md:flex">
                            <div className="text-[11px]">
                                Session inactive
                            </div>
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

                    {profile && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center rounded-full bg-black/70 p-2 transition-colors hover:bg-black hover:text-[#1db954]"
                            aria-label="Logout"
                        >
                            <MdOutlineExitToApp className="text-lg text-white hover:text-[#1db954]" />
                        </button>
                    )}

                    {profile && (
                        <>
                            {/* Humburger*/}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden flex items-center justify-center rounded-full text-white bg-black/70 p-2 transition-colors hover:bg-black hover:text-[#1db954]"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <MdClose className="text-lg" />
                                ) : (
                                    <MdMenu className="text-lg" />
                                )}
                            </button>
                        </>
                    )}
                </div>

                {isMenuOpen && profile && (
                    <div className="absolute top-full border-t-2 shadow-lg md:hidden z-50 p-3 bg-[#1db954]">
                        <nav className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                                <NavBar />
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </>
    )
}