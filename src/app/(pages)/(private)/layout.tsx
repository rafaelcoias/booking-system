'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "~/contexts/AuthContext"

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { isLogged } = useAuth()
    const router = useRouter()

    // useEffect(() => {
    //     if (!isLogged) {
    //         router.push('/login')
    //     }
    // }, [isLogged, router])

    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}



