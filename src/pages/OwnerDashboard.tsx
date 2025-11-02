import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import PropertyCard from '../components/PropertyCard'
import AddPropertyModal from '../components/AddPropertyModal'

export default function OwnerDashboard() {
  const { user, logout } = useAuth()
  const [properties, setProperties] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [stats, setStats] = useState({ total: 0, occupied: 0, revenue: 0 })

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'properties'), where('ownerId', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const props = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProperties(props)

      const occupied = props.filter((p: any) => p.occupied).length
      const revenue = props.reduce((sum: number, p: any) => sum + (p.rent || 0), 0)
      setStats({ total: props.length, occupied, revenue })
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

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage your properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-gray-600 text-sm mb-2">Total Properties</h3>
            <p className="text-4xl font-bold text-navy">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-gray-600 text-sm mb-2">Occupied Rooms</h3>
            <p className="text-4xl font-bold text-navy">{stats.occupied}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-gray-600 text-sm mb-2">Monthly Revenue</h3>
            <p className="text-4xl font-bold text-navy">${stats.revenue}</p>
          </motion.div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Your Properties</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            + Add Property
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No properties yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-navy hover:underline"
            >
              Add your first property
            </button>
          </div>
        )}
      </main>

      {showAddModal && <AddPropertyModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}
