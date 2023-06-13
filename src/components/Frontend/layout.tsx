import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Katering from './katering'
import Chatbot from './chatbot'
import { motion } from 'framer-motion'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Chatbot />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}>
        {children}
      </motion.main>
      <Katering />
      <Footer />
    </>
  )
}

export default Layout
