"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Framer = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <motion.div initial={{opacity:0,y:15}} transition={{duration:0.5}} animate={{opacity:1,y:0}}>{children}</motion.div>
  )
}

export default Framer