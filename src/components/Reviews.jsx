import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'

const Reviews = ({reviews}) => {
  return (
    <article className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6'>
        {reviews && reviews.map((review, index) => (
            <div key={index} className='flex flex-col justify-center items-center  w-full md:w-80 lg:w-80 p-5 space-y-3'>
                <img src={review.user_image} alt={review.user_name} className='w-20 h-20 border-2 border-gray-400 rounded-full object-cover'/>
                <p className='font-semibold text-xl'>{review.user_name}</p>
                <p className='font-medium text-lg'>{review.rental_name}</p>
                <p className='font-medium text-md whitespace-nowrap'>"{review.comment}"</p>
                <p className='flex items-center gap-1 text-lg font-semibold underline'>
                    <span>
                        <StarIcon className='w-5 text-orange-500 mb-1'/>
                    </span>
                    {review.rating}
                </p>
            </div>
        ))}
    </article>
  )
}

export default Reviews