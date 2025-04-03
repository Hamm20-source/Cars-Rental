import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const Banner = ({banners}) => {
  return (
    <header>
        {banners.length > 0 && banners.map((cover, index) => (
            <div key={index} className='relative'>
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
                <img src={cover.image} alt="Banner" className='w-full h-[80vh] object-cover'/>

                <div className='absolute inset-y-1/3 text-center left-1/2 -translate-x-1/2 space-y-3 md:text-left md:left-10 md:translate-none'>
                    <p className='font-semibold text-white/80 text-lg md:text-4xl'>{cover.title}</p>
                    <p className='font-normal text-white/80 text-md md:text-3xl'>{cover.subtitle}</p>

                    <div className='w-fit bg-white/30 backdrop-blur-sm rounded-full mx-auto md:mx-0'>
                        <button className='flex justify-between items-center gap-20 text-xl text-white/80 font-medium px-5 py-3 '>
                            Lihat
                            <ArrowRightIcon className='w-10 p-2 bg-black shadow-md shadow-black rounded-full'/>
                        </button>
                    </div>
                </div>

                <div className='absolute bottom-5 right-5'>
                    <p className='text-white font-medium text-xs md:text-lg'>
                        Berlaku Hingga {" "}
                        <span className='text-orange-400'>{cover.expires_at}</span>
                    </p>
                </div>
            </div>
        ))}
    </header>
  )
}

export default Banner