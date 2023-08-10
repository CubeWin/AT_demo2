import { useState } from 'react'

import Header from '../components/Header'
import Navbar from '../components/Navbar'

export default function MiniDrawer({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />

      <div component='main' onClick={() => setOpen(false)} className='bg-[#d3e5e5] grow ml-[56px]'>
        {children}
      </div>
    </>
  )
}
