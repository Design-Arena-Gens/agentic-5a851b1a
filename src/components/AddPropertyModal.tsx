import { useState } from 'react'
import { motion } from 'framer-motion'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function AddPropertyModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rooms: 1,
    rent: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'properties'), {
        ...formData,
        ownerId: user?.uid,
        occupied: false,
        createdAt: new Date()
      })
      onClose()
    } catch (error) {
      console.error('Error adding property:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Add Property</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Property Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Rooms</label>
            <input
              type="number"
              value={formData.rooms}
              onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy outline-none"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Monthly Rent ($)</label>
            <input
              type="number"
              value={formData.rent}
              onChange={(e) => setFormData({ ...formData, rent: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy outline-none"
              min="0"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-navy text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              Add Property
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
