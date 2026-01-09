import React from 'react'

const Footer = () => {
  return (
    <div className='my-20'>


           <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                   <h1 className='text-2xl text-orange-400'>Sams<span className='text-2xl text-green-400'>Store</span></h1>
                    <p className="mt-6 text-sm">

                        Located at the heart of the coastal city and delivering worldwide we are a fashion shopping  center established to ensure you get every quality of your money
                       
                       </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About us</a></li>
                            <li><a href="/contact">Contact us</a></li>
                            <li><a href="/careers">Career</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-2">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                                <button className="bg-green-400 w-24 h-9 text-white rounded">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2026 ©  All Right Reserved.
            </p>
        </footer>



    </div>
  )
}

export default Footer