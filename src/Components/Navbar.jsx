import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CiSearch, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa";
import { CartContext } from '../context/CartContext'; 

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { cartItems } = useContext(CartContext); 
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); 

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      
      <h1 className='prata-regular text-2xl text-orange-600'>
        Ghetto<span className='text-2xl text-green-600'>Store</span>
      </h1>
      
    
      <ul className='hidden sm:flex gap-4 text-black '>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
        </NavLink>
      </ul>

      
      <div className='flex items-center gap-6'>

        <CiSearch className='text-2xl cursor-pointer' />

        <div className='group relative'>
          <CiUser className='text-2xl cursor-pointer' />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-black rounded'>
              <p className='cursor-pointer hover:text-green-600'>My Profile</p>
              <p className='cursor-pointer hover:text-green-600'>Orders</p>
              <p className='cursor-pointer hover:text-green-600'>LogOut</p>
            </div>
          </div>
        </div>


        <Link to='/cart' className='relative'>
          <IoCartOutline className='text-2xl' />
          
          {totalCount > 0 && (
            <p className='absolute -right-2 -bottom-2 w-5 h-5 text-center bg-black text-white rounded-full text-xs'>
              {totalCount}
            </p>
          )}
        </Link>

        <TiThMenu onClick={() => setVisible(true)} className='text-2xl sm:hidden' />

      </div>


      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div className='flex items-center gap-2 p-3'>
            <FaArrowRight onClick={() => setVisible(false)} className='text-2xl rotate-180' /> 
            <p>Back</p>
          </div>

          <NavLink to='/' onClick={() => setVisible(false)} className='py-2 pl-6 border'>Home</NavLink>
          <NavLink to='/collection' onClick={() => setVisible(false)} className='py-2 pl-6 border'>Collection</NavLink>
          <NavLink to='/about' onClick={() => setVisible(false)} className='py-2 pl-6 border'>About</NavLink>
          <NavLink to='/contact' onClick={() => setVisible(false)} className='py-2 pl-6 border'>Contact</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar
