import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Katering from './katering'
import Chatbot from './chatbot'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Chatbot />
      <main>{children}</main>
      <Katering />
      <Footer />
    </>
  )
}

export default Layout