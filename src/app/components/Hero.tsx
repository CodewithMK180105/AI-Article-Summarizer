import Image from 'next/image'
import React from 'react'
import logo from '../../../public/assets/logo.svg'
import Link from 'next/link'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className="w-full flex justify-between items-center mb-10 pt-3">
            <Image
                src={logo}
                alt="logo"
                className='w-28 object-contain'
            />

            <Link href="/">
                <button className='black_btn'>
                    GitHub
                </button>
            </Link>
        </nav>

        <h1 className='head_text'>Summarize Articles with <br /> <span className='orange_gradient'>Open AI GPT-4</span></h1>
        <h2 className='desc'>
            Simplify your reading with the SummarizeAI, an open source article summarizer that transforms lengthy articles into clear and concise summaries.
        </h2>
    </header>
  )
}

export default Hero
