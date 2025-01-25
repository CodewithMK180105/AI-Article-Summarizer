'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {linkIcon, copy, loader, tick} from '../../../public/assets'; 
import { RiSendPlaneLine } from 'react-icons/ri';

const Demo = () => {

  const [article, setArticle]=useState({
    url: '',
    summary: '',
  });

  const handleSubmit=()=>{
    alert("Submitted");
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className='relative flex items-center justify-center'
          onSubmit={handleSubmit}
        >
          <Image 
            src={linkIcon}
            alt="link"
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input 
            type="url" 
            name="" 
            id="" 
            placeholder='Enter the Url...'
            value={article.url}
            onChange={(e)=>{  // e is the ke press event
              setArticle({...article, url: e.target.value})
            }}
            required
            className='url_input peer'
          />
          <button
            type="submit"
            className='submit_btn peer-focus:border-gray-700 peer-focus:border-text-700'
          >
            <RiSendPlaneLine />
          </button>
        </form>

        {/* Browse Url History */}

      </div>
      {/* Display Results */}

    </section>
  )
}

export default Demo
