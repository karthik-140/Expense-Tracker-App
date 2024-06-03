import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const showLogout = location.pathname !== '/'

  const logoutHandler = () => {
    window.location.href = '/'      // temperory fix
  }

  return (
    <header className="flex justify-center py-4 text-center text-white font-bold text-xl bg-blue-600">
      <nav className='align-center'>
        Expense Tracker
      </nav>
      {showLogout &&
        <button
          className='text-white absolute right-8'
          onClick={logoutHandler}
        >
          Logout
        </button>}
    </header>
  )
}

export default Header