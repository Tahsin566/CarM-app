"use client"

import { Plus } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FaqCard = ({ faq }: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="p-4 flex flex-col border text-black border-neutral-300 rounded-xl transition-colors">
      {/* Header / Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-start cursor-pointer group"
      >
        <h1 className="font-bold text-neutral-800">
          Question: {faq.question}
        </h1>
        <div 
          className={`transform transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
        >
          <Plus 
            size={22} 
            className={open ? "text-red-500" : "text-neutral-500"} 
          />
        </div>
      </button>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-3">
              <span className="font-semibold ">Answer:</span> {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FaqCard