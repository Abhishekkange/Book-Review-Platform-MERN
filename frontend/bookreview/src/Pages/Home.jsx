import React from 'react'
import Navbar from '../Components/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from '../Components/LandingPage'
import Reviews from './Reviews'
import Profile from '../Components/Profile'


function Home() {
  return (
    <div>
      <Navbar />
      
        <Routes>
            <Route path='/' element={LandingPage} />
            <Route path='/Books' element={Reviews} />
            <Route path='/profile' element={Profile} />
        </Routes>
     
    </div>
  )
}

export default Home
