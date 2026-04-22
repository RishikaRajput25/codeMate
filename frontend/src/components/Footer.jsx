/*
import React from 'react'

const Footer = () => {
  return (
    <div className='h-20 w-full bg-[#2a2c2e] items-center'>
    @CodeMate
    </div>
  )
}

export default Footer
*/

import React from 'react'
import { motion } from 'framer-motion'

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full mt-20 px-6 py-6
      bg-white/5 backdrop-blur-md border-t border-white/10
      flex flex-col md:flex-row items-center justify-between"
    >

      <h1 className="text-lg font-semibold bg-blue-400 bg-clip-text text-transparent">
        CodeMate 
      </h1>

      <p className="text-gray-400 text-sm mt-2 md:mt-0">
        <i class="fa-regular fa-copyright"></i> {new Date().getFullYear()} CodeMate. All rights reserved.
      </p>

      <div className="flex gap-4 mt-3 md:mt-0 text-gray-400 text-sm">
        <span className="hover:text-white cursor-pointer">About</span>
        <span className="hover:text-white cursor-pointer">Problems</span>
        <span className="hover:text-white cursor-pointer">Contact</span>
      </div>

    </motion.footer>
  )
}
export default Footer;