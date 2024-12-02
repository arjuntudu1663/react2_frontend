import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'

import { BrowserRouter } from 'react-router-dom'
import EventDetails from './EventDetails'
import AboutUs from './AboutUs'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>

        <Route path = "/" element = {<Home/>}/>
        <Route path = "/admin" element =  {<Admin/>} />
        <Route path = "/eventDetails" element = {<EventDetails/>} />
        <Route path = "/aboutUs" element = {<AboutUs/>} />
        
        

    </Routes> 
    </BrowserRouter>
  )
}

export default App