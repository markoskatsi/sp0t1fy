import React from 'react';
import { useState } from 'react'
import Home from "../pages/Home"
import{Routes, Route} from "react-router-dom"
import NavBar from "./NavBar"
import "../css/App.css"

function App() {
  return (
      <div>
        <NavBar/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </main>
      </div>
  )
}

export default App;
