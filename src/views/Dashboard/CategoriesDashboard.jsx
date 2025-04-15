import React from 'react'

export default function CategoriesDashboard() {
    const images = [
        {id: 1, icons: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg", name: "Mobil"},
        {id: 2, icons: "https://images.pexels.com/photos/28655133/pexels-photo-28655133/free-photo-of-deretan-skuter-motor-modern-yang-dijual-di-luar-ruangan.jpeg", name: "Motor"}
    ]

  return (
    <div className='p-10 space-y-10 shadow-lg md:ml-12 min-h-screen'>
         <h1 className="text-2xl font-bold mb-20">Vehicle Categories</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 '>
            {images.map((icon, index) => (
                <div key={index} className='shadow-lg rounded-lg p-10 mx-auto space-y-5'>
                    <h1 className='font-semibold text-2xl'>{icon.name}</h1>
                    <img src={icon.icons} alt='icon' className='w-full md:w-96 h-96 object-cover'/>
                    <button>

                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}
