import { motion } from 'framer-motion'

interface Property {
  id: string
  name: string
  address: string
  rooms: number
  rent: number
  occupied?: boolean
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <h3 className="text-xl font-bold mb-2">{property.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{property.address}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rooms</span>
          <span className="font-medium">{property.rooms}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rent</span>
          <span className="font-medium">${property.rent}/mo</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <span className={`font-medium ${property.occupied ? 'text-green-600' : 'text-orange-600'}`}>
            {property.occupied ? 'Occupied' : 'Vacant'}
          </span>
        </div>
      </div>

      <button className="mt-4 w-full bg-gray-100 text-charcoal py-2 rounded-lg hover:bg-gray-200 transition">
        View Details
      </button>
    </motion.div>
  )
}
