'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Header from "@/components/Header";

export default function DashboardPage() {
  return (
    <div>
      <Header></Header>

    </div>
  );
}
