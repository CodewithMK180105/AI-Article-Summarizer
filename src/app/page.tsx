'use client'
import React from 'react'
import Demo from './components/Demo'
import Hero from './components/Hero'

const page = () => {
  return (
    <main>

        <div className='main'>
          <div className='gradient' />
        </div>

        <div className="app">
          <Hero />
          <Demo />
        </div>
    </main>
  )
}

export default page
