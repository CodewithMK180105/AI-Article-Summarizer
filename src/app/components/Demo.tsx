'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {linkIcon, copy, loader, tick} from '../../../public/assets'; 
import { RiSendPlaneLine } from 'react-icons/ri';
import { useLazyGetSummaryQuery } from '../services/article';

interface Article {
  url: string;
  summary: string;
}


const Demo = () => {

  const [article, setArticle]=useState<Article>({
    url: '',
    summary: '',
  });

  const [allArticle,setAllArticle]=useState<Article[]>([]);

  const [getSummary, {error, isFetching}]= useLazyGetSummaryQuery();
  const [copied,setCopied]=useState<string>("");

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem('articles');

    if (articlesFromLocalStorage) {
      setAllArticle(JSON.parse(articlesFromLocalStorage));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (article.url) {
      try {
        // Fetch the summary for the article URL
        const { data } = await getSummary({ articleUrl: article.url });

        // If summary data is returned, update the state
        if (data?.summary) {
          const newArticle: Article = { ...article, summary: data.summary };
          const updatedAllArticles: Article[] = [newArticle, ...allArticle];
          setArticle(newArticle);
          setAllArticle(updatedAllArticles);
          console.log(newArticle);
        }
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    }
  };

  const handleCopy= (copyUrl: string)=>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=>setCopied(""),3000)
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((item,index)=>(
            <div 
              key={`link-${index}`}
              onClick={()=>{setArticle(item)}}
              className='link_card'
            >
              <div className="copy_btn" onClick={()=>{handleCopy(item.url)}}>
                <Image
                  src={copied==item.url ? tick:copy} 
                  alt="copy_icon" 
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>

              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>

            </div>
          ))}
        </div>

      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
          {
            isFetching? (
              <Image
                src={loader}
                alt="loader"
                className='w-20 h-20'
              />
            ): error? (
              <p className='font-inter font-bold text-black text-center'>
                This url can&apos;t be fetched...
                <br />
                <span className='font-satoshi font-normal text-gray-700'>
                  {/* {error?.data?.error} */} error
                </span>
              </p>
            ) : (
              article.summary && (
                <div className='flex flex-col gap-3'>
                  <h2 className='font-satoshi font-bold to-gray-600'>
                    Article <span className='blue_gradient'>Summary</span>
                  </h2>

                  <div className='summary_box'>
                    <p className='font-inter font-medium text-sm to-gray-700'>
                      {article.summary}
                    </p>
                  </div>
                </div>
              )
            )
          }
      </div>
      

    </section>
  )
}

export default Demo
