'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '~/contexts/AuthContext'
import { auth, db } from '~/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'

export default function Profile() {
  const { isLogged, isLoading } = useAuth();
  const router = useRouter()

  const { user } = useAuth()
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isLoading && !isLogged) {
      router.push('/login')
    } else if (isLogged) {
      // Carregar dados do utilizador
      if (!user) return
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.id))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setName(userData.name || '')
          setPhoneNumber(userData.phoneNumber || '')
        }
      }
      fetchUserData()
    }
  }, [isLogged, isLoading, router])

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    if (!user) return
    try {
      await updateDoc(doc(db, 'users', user.id), {
        name,
        phoneNumber,
      })
      setMessage('Perfil atualizado com sucesso!')
    } catch (error) {
      setMessage('Erro ao atualizar o perfil. Por favor, tente novamente.')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!isLogged) return <div></div>

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Perfil do Utilizador</h2>
          <div>
            <Link href="/bookings" className="text-primary hover:text-primary-dark">
              As minhas reservas
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Número de Telefone
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Atualizar Perfil
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-2 text-sm text-center text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}