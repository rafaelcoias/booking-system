'use client'

import Link from 'next/link';
import React from 'react';
import { useAuth } from '~/contexts/AuthContext';

export default function Navbar() {

    const {user , isLogged} = useAuth();

    return (
        <header className="bg-white shadow">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-semibold text-gray-700">Clínica Dentária Lisboa</Link>
                    <div>
                        {isLogged ? (
                            <Link href="/profile" className="text-primary hover:text-primary-dark">
                                Perfil
                            </Link>
                        ) : (
                            <Link href="/login" className="text-primary hover:text-primary-dark">
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}


