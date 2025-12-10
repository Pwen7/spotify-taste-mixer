'use client'

import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
            <div className="max-w-md w-full text-center px-4">
                <h1 className="text-5xl font-extrabold text-white mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-white mb-2">
                    Page not found
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-full bg-[#1db954] text-[#121212] font-semibold hover:bg-[#1ed760] transition-colors"
                    >
                        Exit
                    </Link>
                </div>
            </div>
        </div>
    )
}
