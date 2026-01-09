import React from 'react'
import ex1 from '../assets/exchange1.png'
import q1 from '../assets/quality1.png'
import s1 from '../assets/support.png'

const Why = () => {
  return (
    <div className='my-10'>

        <h1 className='prata-regular text-center text-2xl text-orange-400 mt-2'>What Sets us Apart</h1>
        <p className='prata-regular text-center text-gray-900 mt-4'>These features have enabled us to stand unique from other fashion stores</p>


        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

            <div>
                <img src={ex1} alt="" className='w-12 m-auto mb-5' />
                <p className='font-bold prata-regular'>Easy Exchange Policy</p>
                <p>Our Exchange Policy is easy and hustle free</p>
            </div>

            <div>
                <img src={q1} alt="" className='w-12 m-auto mb-5' />
                <p className='font-bold prata-regular'>Quality Assured</p>
                <p>Our products are whole top notch quality</p>
            </div>


            <div>
                <img src={s1} alt="" className='w-12 m-auto mb-5' />
                <p className='font-bold prata-regular'>Great Support</p>
                <p className=''>We offer great support for any enquiries or problems</p>
            </div>

        </div>


    </div>
  )
}

export default Why