'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Header from "@/components/Header";

export default function DashboardPage() {
  const router = useRouter()

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
