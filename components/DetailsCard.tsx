"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DetailsCard = ({ car }: { car: any }) => {
  const [open, setOpen] = React.useState(false)

  // Sub-component for individual detail items to keep code clean
  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 p-2">
      <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
        {label}
      </h3>
      <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
    </div>
  )

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!open ? (
          // Trigger Button
          <motion.button
            key="view-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="w-full shadow-md border border-neutral-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors h-fit p-3 rounded-xl font-medium"
          >
            View more details about car
          </motion.button>
        ) : (
          // Expanded Content
          <motion.div
            key="details-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full shadow-xl border border-neutral-200 rounded-xl overflow-hidden bg-white dark:bg-neutral-900"
          >
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="Price" value={car.price} />
              <DetailItem label="Engine" value={car.engine} />
              <DetailItem label="Transmission" value={car.transmission} />
              <DetailItem label="Fuel" value={car.fuel} />
              <DetailItem label="Type" value={car.type} />
              <DetailItem label="Year" value={car.year} />
            </div>

            <motion.button
              whileHover={{ backgroundColor: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-slate-900 text-white p-3 font-bold"
              onClick={() => setOpen(false)}
            >
              Close Details
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DetailsCard