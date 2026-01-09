import React from "react";

const Footer = () => {
  return (
    <div className="my-20 bg-gray-50">
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300 pb-6">
          
          
          <div className="md:max-w-md">
            <h1 className="prata-regular text-2xl text-orange-400">
              Ghetto<span className="text-2xl text-green-400">Store</span>
            </h1>
            <p className="mt-6 text-sm text-gray-700">
              Located at the heart of the coastal city and delivering worldwide.
              We are a fashion shopping center established to ensure you get
              the highest quality for your money.
            </p>
          </div>

          
          <div className="flex-1 flex flex-col md:flex-row gap-10 md:justify-end">
            
            
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">
                Company
              </h2>
              <ul className="text-sm space-y-2">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/careers">Career</a></li>
              </ul>
            </div>

            
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800 mb-5">
                Subscribe to our newsletter
              </h2>

              <p className="text-sm text-gray-700 mb-3">
                The latest news, articles, and resources sent to your inbox weekly.
              </p>

              
              <form className="flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button className="bg-green-400 text-white px-6 py-2 rounded w-full sm:w-auto">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        
        <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-600">
          Copyright 2026 © All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
