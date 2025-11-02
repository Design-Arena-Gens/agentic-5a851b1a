import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function RenterDashboard() {
  const { user, logout } = useAuth()
  const [rental, setRental] = useState<any>(null)

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'rooms'), where('renterId', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setRental({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
      }
    })

    return unsubscribe
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-navy">RentEase</h1>
          <button onClick={logout} className="text-gray-600 hover:text-navy">Logout</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">My Rental</h2>

        {rental ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-8"
          >
            <h3 className="text-xl font-bold mb-4">{rental.name}</h3>
            <div className="space-y-2 text-gray-600">
              <p>Rent: ${rental.rent}/month</p>
              <p>Address: {rental.address}</p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No active rental</p>
          </div>
        )}
      </main>
    </div>
  )
}
