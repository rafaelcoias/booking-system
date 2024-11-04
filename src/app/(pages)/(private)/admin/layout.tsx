'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "~/contexts/AuthContext"

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { isAdmin } = useAuth()
    const router = useRouter()

    // useEffect(() => {
    //     if (!isAdmin) {
    //         router.push('/')
    //     }
    // }, [router])

    if (!isAdmin) return null

    return (
        <>
            {children}
        </>
    );
}



