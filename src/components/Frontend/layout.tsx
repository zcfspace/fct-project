import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Katering from './katering'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Katering />
      <Footer />
    </>
  )
}

export default Layout