'use client'
import { useState, useEffect } from 'react'
import { db } from '~/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Stats() {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalbookings, setTotalbookings] = useState(0)
  const [monthlybookings, setMonthlybookings] = useState<[string, number][]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const bookingsSnapshot = await getDocs(collection(db, 'bookings'))

    setTotalUsers(usersSnapshot.size)
    setTotalbookings(bookingsSnapshot.size)

    // Calculate monthly bookings
    const monthlyData:any = {}
    bookingsSnapshot.forEach((doc) => {
      const date = new Date(doc.data().date)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1
    })

    const sortedMonthlyData:any = Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 6)
      .reverse()

    setMonthlybookings(sortedMonthlyData)
  }

  const chartData = {
    labels: monthlybookings.map(([month]) => month),
    datasets: [
      {
        label: 'Reservas Mensais',
        data: monthlybookings.map(([, count]) => count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Reservas Mensais',
      },
    },
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-lg font-semibold">Total de Utilizadores</p>
          <p className="text-3xl font-bold text-primary">{totalUsers}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Total de Reservas</p>
          <p className="text-3xl font-bold text-primary">{totalbookings}</p>
        </div>
      </div>
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}