import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router'

export const RentalCardMotor = ({data}) => {
    const navigate = useNavigate()

    const rentalDetails = () => {
        navigate("/rentaldetails")
    }

    return (
        <article>
            <h2 className='text-2xl font-medium mb-10'>Rental Motor</h2>
            <div className='grid grid-cols-1 md:grid-cols-5'>
                {data && data.map((card, index) => (
                    <div key={index} className='relative w-full md:w-80 lg:w-80 p-5 shadow-xl rounded-lg'>
                        <div className='mt-7 p-5 shadow-sm rounded-lg'>
                            {card.images.length > 0 && (
                                <img key={card.id} src={card.images[0]} alt='Gambar Motor' className='w-96'/>
                            )}
                        </div>
                        <div className='absolute w-full top-0 inset-x-0 px-5 flex justify-between items-center'>
                            <p className='text-sm text-white font-medium p-2 bg-black/50 rounded-full'>
                                Rp{Number(card.price_per_day).toLocaleString('id-ID')}/Day
                            </p>
                            <p className='flex items-center gap-2 text-sm'>
                                <StarIcon className='w-5 text-orange-500'/>
                                <span className='mt-1'>{card.rating}</span>
                            </p>
                        </div>

                        <div className='flex justify-between items-center mt-5'>
                          <p className='text-md font-normal'>{card.name}</p>
                          <p className='text-md font-normal text-orange-500'>{card.available === true ? 'Tersedia' : 'Tidak Tersedia'}</p>
                        </div>
                        
                        <div className='w-full flex justify-center mt-5'>
                             <button 
                                onClick={rentalDetails}
                                className='px-6 py-2 text-white font-medium bg-black rounded-full shadow-xl shadow-gray-300  hover:translate-y-1 hover:shadow-none  transition-all duration-200 ease-in-out cursor-pointer'>
                                Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}


export const RentalCardMobil = ({data}) => {
    return (
        <article>
            <h2 className='text-2xl font-medium mb-10'>Rental Mobil</h2>
            <div className='grid grid-cols-1 md:grid-cols-5'>
                {data && data.map((card, index) => (
                    <div key={index} className='relative w-full md:w-80 lg:w-80 p-5 shadow-xl rounded-lg'>
                        <div className='mt-7 p-5 shadow-sm rounded-lg'>
                            {card.images && card.images.length > 0 && (
                                <img key={card.id} src={card.images[0]} alt='Gambar Motor' className='w-96'/>
                            )}
                        </div>
                        <div className='absolute w-full top-0 inset-x-0 px-5 flex justify-between items-center'>
                            <p className='text-sm text-white font-medium p-2 bg-black/50 rounded-full'>
                                Rp{Number(card.price_per_day).toLocaleString('id-ID')}/Day
                            </p>
                            <p className='flex items-center gap-2 text-sm'>
                                <StarIcon className='w-5 text-orange-500'/>
                                <span className='mt-1'>{card.rating}</span>
                            </p>
                        </div>

                        <div className='flex justify-between items-center mt-5'>
                          <p className='text-md font-normal'>{card.name}</p>
                          <p className='text-md font-normal text-orange-500'>{card.available === true ? 'Tersedia' : 'Tidak Tersedia'}</p>
                        </div>
                        
                        <div className='w-full flex justify-center mt-5'>
                             <button className='px-6 py-2 text-white font-medium bg-black rounded-full shadow-xl shadow-gray-300  hover:translate-y-1 hover:shadow-none  transition-all duration-200 ease-in-out cursor-pointer'>
                                Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}