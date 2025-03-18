import React from 'react'
import NavLinks from './components/NavLinks'
import Chatbox from './components/Chatbox'
import Chatlist from './components/Chatlist'
import Login from './components/Login'
import Register from './components/Register'


const App = () => {
  return (
    <div>
      <div className='flex lg:flex-row flex-col items-start w-[100%]'>
        <NavLinks />
        <Chatlist />
        <Chatbox />
      </div>
      <div className='hidden'>
        <Login />
        <Register />
      </div>
    </div>
  )
}

export default App

