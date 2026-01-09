import React from 'react'
import c4 from '../assets/contact4.png'
import { Link } from 'react-router-dom'
import Newsletter from '../Components/Newsletter'

const Contact = () => {
  return (
    <div>

        <h1 className='prata-regular text-center text-black font-bold text-2xl'>Contact Us</h1>

        <div className='flex flex-col sm:flex-row gap-6'>


            <div className='w-full sm:w-1/2 mt-4'>

            <img src={c4} alt="" className='w-full h-100 object-cover rounded-lg' />

            </div>

            <div className='w-full sm:w-1/2'>

            <h1 className='font-bold text-lg text-center '>Our Store</h1>
            <p className='text-center text-gray-500 mt-10'>Diani , southside near plasta breeze</p>
            <p className='text-center text-gray-500 mt-10'>Phone No: 0757854388000</p>
            <p className='text-center text-gray-500 mt-10'>Mail:SamsStore@gmail.com</p>

            <h2 className='text-center mt-10 text-2xl font-bold text-gray-500'>Careers at SamsStore</h2>
       <Link className='flex justify-center'><button className='bg-green-400 text-sm p-2 rounded px-6 py-2 mt-5 flex'>See Open Positions</button></Link>   



            </div>

        </div>


        <Newsletter/>

    </div>
  )
}

export default Contact