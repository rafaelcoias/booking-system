'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '~/lib/firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { useAuth } from '~/contexts/AuthContext'
import DatePicker from 'react-datepicker'

export default function ReservationForm() {
  const { user } = useAuth()
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user?.phoneNumber ? user.phoneNumber : '')
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!user && !email) {
      setMessage('Por favor, faça login ou forneça um email para fazer uma reserva.')
      return
    }

    try {
      // Verificar se já existe uma reserva para o mesmo dia e hora
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const formattedDateTime = new Date(`${formattedDate}T${time}:00Z`);

      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('dateTime', '==', formattedDateTime)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      if (!bookingsSnapshot.empty) {
        setMessage('Já existe uma reserva para este horário. Por favor, escolha outro horário.');
        return;
      }

      // Criar a reserva
      await addDoc(collection(db, 'bookings'), {
        userId: user ? user.id : null,
        date: formattedDate,
        time: time,
        dateTime: formattedDateTime,
        name: user ? user.name : name,
        email: user ? user.email : email,
        phoneNumber: user && user?.phoneNumber ? user.phoneNumber : phone,
        status: 'unconfirmed',
        createdAt: new Date()
      });

      setMessage('Reserva criada com sucesso! Aguarde a confirmação.')
      setTimeout(() => setMessage(''), 3000)
      // Limpar o formulário
      setDate(new Date())
      setTime('')
      setName('')
      setEmail('')
      setPhone('')
    } catch (error) {
      console.error(error)
      setMessage('Erro ao criar a reserva. Por favor, tente novamente.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          required
          disabled={user ? true : false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          disabled={user ? true : false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          required
          disabled={user ? (true && user?.phoneNumber ? true : false) : false}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Data
        </label>
        <DatePicker
          selected={date}
          onChange={(date) => date && setDate(date)}
          className="datePicker mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Hora
        </label>
        <input
          type="time"
          id="time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Agendar Consulta
        </button>
      </div>
      {message && (
        <p className="mt-2 text-sm text-center">{message}</p>
      )}
    </form>
  )
}