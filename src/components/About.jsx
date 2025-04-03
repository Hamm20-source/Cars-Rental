import React from 'react'
import AboutTxt from '../assets/About.txt?raw'
import { BanknotesIcon, CheckBadgeIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'

export default function About() {
    const iconStyle = {
        width : "50px"
    }

    const grids = [
        {id : 1, name : "Armada Berkualitas", Deskripsi : "Kami memiliki berbagai jenis mobil mulai dari city car, MPV, SUV, hingga mobil premium.", icon : <TrophyIcon style={iconStyle}/>},
        {id : 2, name : "Harga Terjangkau", Deskripsi : "Nikmati harga terbaik dengan berbagai promo dan paket sewa yang fleksibel.", icon : <BanknotesIcon style={iconStyle}/>},
        {id : 3, name : "Layanan 24/7", Deskripsi : "Tim kami siap membantu kapan saja, mulai dari pemesanan hingga bantuan di jalan.", icon : <ClockIcon style={iconStyle}/>},
        {id : 4, name : "Proses Mudah & Cepat", Deskripsi : "Booking mobil hanya dalam beberapa klik melalui aplikasi atau website kami.", icon : <ChatBubbleLeftEllipsisIcon style={iconStyle}/>},
        {id : 5, name : "Asuransi & Keamanan ", Deskripsi : "Setiap kendaraan dilengkapi dengan asuransi dan pengecekan rutin untuk memastikan keselamatan Anda.", icon : <CheckBadgeIcon style={iconStyle}/>},
    ]

  return (
    <article className='container mx-auto space-y-4 p-10 md:p-0 lg:p-20'>
        <h1 className='text-4xl font-semibold'>Tentang RenCars</h1>
        <h2 className='text-2xl font-medium'>Siapa Kami?</h2>
          {AboutTxt.split("\n").map((paragraph, index) => (
                <p key={index} className="text-sm md:text-md  mb-4">{paragraph}</p>
            ))}
        <h3 className='text-2xl font-medium mb-10'>Kenapa Memilih RenCars?</h3>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-10'>
            {grids.map((icon, index) => (
                <div key={index} className='space-y-3 mb-5'>
                    <span className='flex justify-center items-center'>{icon.icon}</span>
                    <p className=' w-full text-center mx-auto text-sm md:text-md font-semibold'>{icon.Deskripsi}</p>
                </div>
            ))}
        </div>
    </article>
  )
}
