import { useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Banner from './Components/Banner/Banner'
import {original,Action, ComedyMovies} from './urls'
import RowPost from './Components/rowPost/RowPost'

 function App(params) {
  return(
    <div className='App'>
      <Navbar/>
      <Banner/>
      <RowPost url={original} title='Netflix Original'/>
      <RowPost url={Action} title='Action Movie' isSmall/>
      <RowPost url={ComedyMovies} title='Comedy Movie' isSmall/>
    </div>
  )
 }

export default App
