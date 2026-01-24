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
import Login from './Components/Admin/Login'
import Dashboard from './Components/Admin/Dashboard'
import LoginUser from './Components/User/LoginUser'
import Register from './Components/User/Register'
import Show from './Components/Admin/Latest/Show'
import Createl from './Components/Admin/Latest/Createl'
import Editl from './Components/Admin/Latest/Editl'
import NewsletterList from './Pages/NewsLetterList'
import NewsletterSend from './Pages/NewsLettersend'
import Createc from './Components/Admin/Collection/Createc'
import Showc from './Components/Admin/Collection/Showc'
import Editc from './Components/Admin/Collection/Editc'
import Createk from './Components/Admin/Careers/Createk'
import Showk from './Components/Admin/Careers/Showk'
import Editk from './Components/Admin/Careers/Editk'

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
<Route path='/admin/login' element={<Login/>} />
<Route path='/admin/dashboard' element={<Dashboard/>} />
<Route path='/user/loginuser' element={<LoginUser/>} />
<Route path='/user/register' element={<Register/>} />
 <Route path='/admin/latest/show/:id' element={<Show/>} />
 <Route path='/admin/latest/createl' element={<Createl/>} />
 <Route path='/admin/latest/edit/:id' element={<Editl/>} />
 <Route path='/newsletterlist' element={<NewsletterList/>} />
 <Route path='/newslettersend' element={<NewsletterSend/>} />
 <Route path='/admin/collection/createc' element={<Createc/>} />
 <Route path='/admin/collection/showc' element={<Showc/>} />
 <Route path='/admin/collection/editc/:id' element={<Editc/>} />
 <Route path='/admin/careers/createk' element={<Createk/>} />
 <Route path='/admin/careers/showk' element={<Showk/>} />
 <Route path='/admin/careers/editk/:id' element={<Editk/>} /> 


    </Routes>

    <Footer/>
      
      </div>
  )
}

export default App