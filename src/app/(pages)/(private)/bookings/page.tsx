'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '~/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '~/contexts/AuthContext'
import Booking from '~/types/Booking'
import firebase from 'firebase/compat/app'

export default function Mybookings() {
  const { user } = useAuth()

  const router = useRouter()
  const [confirmedbookings, setConfirmedbookings] = useState<Booking[]>([])
  const [unconfirmedbookings, setUnconfirmedbookings] = useState<Booking[]>([])

  useEffect(() => {
    if (user) {
      fetchbookings()
    }
  }, [user, router])

  const fetchbookings = async () => {
    if (!user) return
    const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.id))
    const bookingsSnapshot = await getDocs(bookingsQuery)

    const confirmed: Booking[] = []
    const unconfirmed: Booking[] = []

    bookingsSnapshot.forEach((doc) => {
      const reservation: any = { id: doc.id, ...doc.data() }
      if (reservation.confirmed) {
        confirmed.push(reservation)
      } else {
        unconfirmed.push(reservation)
      }
    })

    setConfirmedbookings(confirmed)
    setUnconfirmedbookings(unconfirmed)
  }

  const formatDate = (date: firebase.firestore.Timestamp) => {
    if (!date) return 'Data inválida';

    const jsDate = date?.toDate();

    return jsDate.toLocaleDateString('pt-PT', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Minhas Reservas</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Reservas Confirmadas</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {confirmedbookings.map((reservation: Booking) => (
              <li key={reservation.id} className="px-4 py-4 sm:px-6">
                <p className="text-sm font-medium text-gray-900">{formatDate(reservation.dateTime)}</p>
                <p className="mt-1 text-sm text-gray-500">{reservation.status}</p>
              </li>
            ))}
            {confirmedbookings.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">Nenhuma reserva confirmada.</li>
            )}
          </ul>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Reservas Não Confirmadas</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {unconfirmedbookings.map((reservation) => (
              <li key={reservation.id} className="px-4 py-4 sm:px-6">
                <p className="text-sm font-medium text-gray-900">{formatDate(reservation.dateTime)}</p>
                <p className="mt-1 text-sm text-gray-500">{reservation.status}</p>
              </li>
            ))}
            {unconfirmedbookings.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">Nenhuma reserva pendente de confirmação.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}