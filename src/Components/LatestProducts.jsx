import React from 'react'
import f1 from '../assets/f1.jpg'
import j1 from '../assets/jeans.jpeg'
import sh1 from '../assets/shirt1.jpg'
import p1 from '../assets/palazo.png'
import { Link } from 'react-router-dom'

const LatestProducts = () => {

    const cole = [

          {
            id:0,
            img:f1,
            title:"Floral beach shirt",
            price: 'ksh1000',
          },

          {

              id:1,
              img:j1,
              title:"Full jeans",
              price:"ksh1500",
          },

          {

             id:2,
             img:sh1,
             title:"puma shirt",
             price:"ksh1000"
          },

          {

              id:3,
              img:p1,
              title:"Palazo pants",
              price:"ksh800"
          }
    ]

  return (
    <div className='my-10'>

<h1 className='text-2xl text-orange-500 text-center mt-2'>Latest<span className='text-2xl text-green-500'>Products</span></h1>
<p className='prata-regular text-center mt-2'>We constantly have new products & clothes on our store so check out regularly </p>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 items-center justify-center'>

    {

        cole.map((item)=>(

          <Link key={item.id} to={`/product/${item.id}`} state={{product : item}}>
              
            <div key={item.id} className='flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden'>

                <img src={item.img} alt={item.title} className='w-100 h-100 object-cover' />

                <div className='p-4 text-center'>

                    <h1>{item.title}</h1>
                    <p>{item.price}</p>
                    </div>

                </div>

                </Link>
             
        ))
    }

</div>


    </div>
  )
}

export default LatestProducts