import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import ProductItem from './Pages/ProductItem'
import Footer from './Components/Footer'
import Careers from './Pages/Careers'
import CheckOut from './Pages/CheckOut'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >

      <Navbar/>
    
    <Routes>

<Route path='/' element={<Home/>} />
<Route path='/collection' element={<Collection/>} />
<Route path='/about' element={<About/>} />
<Route path='/contact' element={<Contact/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/product/:id' element={<ProductItem/>} />
<Route path='/careers' element={<Careers/>} />
<Route path='/checkout' element={<CheckOut/>} />


    </Routes>

    <Footer/>
      
      </div>
  )
}

export default App