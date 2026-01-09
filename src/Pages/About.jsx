import React from 'react'
import ab1 from '../assets/about4.png'
import Newsletter from '../Components/Newsletter'

const About = () => {
  return (
    <div className='max-w-5xl mx-auto px-4 py-8 text-gray-800'>

      {/* Header */}
      <h1 className='text-center text-3xl font-bold text-orange-400'>
        About <span className='text-green-400'>Us</span>
      </h1>

      {/* Hero Image + Story */}
      <div className='flex flex-col sm:flex-row gap-6 mt-8 items-center'>
        <img
          src={ab1}
          alt="shopping at SamsStore"
          className='w-full sm:w-1/2 h-auto object-cover shadow-lg rounded-lg'
        />

        <div className='sm:w-1/2 space-y-3'>
          <p>
            Welcome to <strong>SamsStore</strong> — your destination for the latest
            fashion, quality apparel, and a shopping experience that feels effortless
            and exciting. We started this store because we believe looking great
            shouldn’t be expensive or complicated.
          </p>

          <p>
            Our passion is simple: bring you stylish everyday clothing and accessories that match
            your personality, lifestyle, and budget. Whether you shop online or in person,
            we make fashion feel personal, friendly, and fun.
          </p>

          <p>
            But we’re more than just clothes — we’re about helping you feel confident,
            unique, and empowered with every piece you choose.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold text-green-400 mb-2'>Our Mission</h2>
        <p>
          At SamsStore, our mission is to make fashion accessible to everyone.
          We focus on quality products, affordable prices, and a shopping experience
          that makes you feel welcome and valued — from the moment you browse until
          your order arrives.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold text-orange-400 mb-4 text-center'>
          Why Choose Us
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-gray-700'>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-orange-400'>Quality Promise</h3>
            <p>We handpick products that look great and stand up to everyday wear.</p>
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-green-400'>Friendly Pricing</h3>
            <p>Great style shouldn’t cost a fortune — we keep prices fair and honest.</p>
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-blue-400'>Customer Care</h3>
            <p>Our support team is here for you, before, during, and after every order.</p>
          </div>
        </div>
      </div>

      {/* Social Proof Idea (Optional) */}
      {/* You can add testimonial cards here later — more trust building */}
      {/* <Testimonials /> */}

      {/* Call to Action */}
      <div className='mt-12 text-center'>
        <p className='text-lg font-semibold'>
          Want to stay inspired with the latest styles and exclusive perks?
        </p>
      </div>

      {/* Newsletter Section */}
      <div className='mt-6'>
        <Newsletter />
      </div>

    </div>
  )
}

export default About
