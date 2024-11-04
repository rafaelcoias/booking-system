'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '~/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '~/contexts/AuthContext'

export default function AdminSettings() {
  const {user} = useAuth()
  const router = useRouter()
  const [defaultConfirmation, setDefaultConfirmation] = useState(false)
  const [allowMultiplebookings, setAllowMultiplebookings] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) 
      fetchSettings()
  }, [user, router])

  const fetchSettings = async () => {
    const settingsDoc = await getDoc(doc(db, 'settings', 'general'))
    if (settingsDoc.exists()) {
      const settings = settingsDoc.data()
      setDefaultConfirmation(settings.defaultConfirmation || false)
      setAllowMultiplebookings(settings.allowMultiplebookings || false)
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      await updateDoc(doc(db, 'settings', 'general'), {
        defaultConfirmation,
        allowMultiplebookings,
      })
      setMessage('Configurações atualizadas com sucesso!')
    } catch (error) {
      setMessage('Erro ao atualizar as configurações. Por favor, tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Configurações</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="defaultConfirmation">
              <input
                id="defaultConfirmation"
                type="checkbox"
                checked={defaultConfirmation}
                onChange={(e) => setDefaultConfirmation(e.target.checked)}
                className="mr-2 leading-tight"
              />
              Confirmar reservas automaticamente
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allowMultiplebookings">
              <input
                id="allowMultiplebookings"
                type="checkbox"
                checked={allowMultiplebookings}
                onChange={(e) => setAllowMultiplebookings(e.target.checked)}
                className="mr-2 leading-tight"
              />
              Permitir múltiplas reservas no mesmo horário
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Salvar Configurações
            </button>
          </div>
        </form>
        {message && (
          <p className="text-center text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  )
}