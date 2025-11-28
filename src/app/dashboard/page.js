'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getUserProfile } from '@/lib/spotify';
import Header from "@/components/Header";

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

     const fetchUser = async () => {
      try {
        const profile = await getUserProfile()
        setUser(profile)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }
 
  }, [router])



  return (
    <div>
      <Header></Header>

    </div>
  );
}
