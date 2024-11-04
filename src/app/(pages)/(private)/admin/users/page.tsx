'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '~/lib/firebase'
import { collection, query, getDocs } from 'firebase/firestore'
import { useAuth } from '~/contexts/AuthContext'
import User from '~/types/User'

export default function AdminUsers() {
  const { user } = useAuth()

  const router = useRouter()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user)  {
      fetchUsers()
    }
  }, [user, router])

  const fetchUsers = async () => {
    const usersQuery = query(collection(db, 'users'))
    const usersSnapshot = await getDocs(usersQuery)

    const fetchedUsers:any = []
    usersSnapshot.forEach((doc) => {
      fetchedUsers.push({ id: doc.id, ...doc.data() })
    })

    setUsers(fetchedUsers)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Utilizadores</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total de Reservas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user:User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phoneNumber || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.totalbookings || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}