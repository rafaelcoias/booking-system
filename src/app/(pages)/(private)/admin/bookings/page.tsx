'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '~/lib/firebase'
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore'
import { useAuth } from '~/contexts/AuthContext'
// import { CalendarIcon } from '@heroicons/react/solid'

export default function AdminBookings() {
  const { user } = useAuth()

  const router = useRouter()
  const [bookings, setBookings] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user, router, selectedDate])

  const fetchBookings = async () => {
    const bookingsQuery = query(collection(db, 'bookings'))
    const bookingsSnapshot = await getDocs(bookingsQuery)

    const fetchedBookings: any = []
    bookingsSnapshot.forEach((doc) => {
      const reservation: any = { id: doc.id, ...doc.data() }
      if (isSameDay(new Date(reservation.date), selectedDate)) {
        fetchedBookings.push(reservation)
      }
    })

    setBookings(fetchedBookings)
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  }

  const toggleBookingstatus = async (reservationId: string, currentStatus: boolean) => {
    await updateDoc(doc(db, 'bookings', reservationId), {
      confirmed: !currentStatus
    })
    fetchBookings()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Reservas</h1>

        <div className="mb-8">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Selecionar Data
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            </div>
            <input
              type="date"
              name="date"
              id="date"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Reservas para {formatDate(selectedDate)}</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {bookings.map((reservation: any) => (
              <li key={reservation.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDate(reservation.date)}</p>
                    <p className="mt-1 text-sm text-gray-500">{reservation.service}</p>
                    <p className="mt-1 text-sm text-gray-500">{reservation.userName} - {reservation.userEmail}</p>
                  </div>
                  <button
                    onClick={() => toggleBookingstatus(reservation.id, reservation.confirmed)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${reservation.confirmed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                  >
                    {reservation.confirmed ? 'Confirmada' : 'Não Confirmada'}
                  </button>
                </div>
              </li>
            ))}
            {bookings.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">Nenhuma reserva para esta data.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}