import React, { useEffect, useState } from 'react'
import { getRentalApi } from '../utils/Api';
import Banner from '../components/Banner';
import About from '../components/About';
import { RentalCardMotor, RentalCardMobil } from '../components/RentalCard';
import Reviews from '../components/Reviews';

export default function Home() {
  const [banner, setBanner] = useState([]);
  const [rental, setRental] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const getMainView = async () => {
        const data = await getRentalApi();

        // Konversi objek ke array dalam satu variabel
        const formattedData = {
            banners: data?.banners ? Object.values(data.banners) : [],
            rentals: data?.rentals
                    ? Object.entries(data.rentals).flatMap(([category, vehicles]) =>
                      Object.entries(vehicles).map(([id, details]) => ({
                          id,            // ID kendaraan
                          category,      // Kategori (mobil/motor)
                          ...details     // Semua detail kendaraan
                      }))
                  )
                : [],
            reviews: data?.reviews ? Object.values(data.reviews) : [],
            users: data?.users ? Object.values(data.users) : []
        };

        // Mengabungkan review dengan nama User berdasarkan User
        const reviewsWithUsers = formattedData.reviews.map((review) => {
          const user = formattedData.users.find((u) => u.id === review.user_id);
          const rental = formattedData.rentals.find((u) => u.id === review.rental_id)
          return {
            ...review, 
            user_name : user ? user.name : 'Uknown User',
            user_image : user ? user.image : 'Not Found Image',
            rental_name : rental ? rental.name : 'Uknown Name'
          }
        })

        setBanner(formattedData.banners);
        setRental(formattedData.rentals);
        setReviews(reviewsWithUsers)
    };
    
    setTimeout(() => window.scrollTo(0, 0), 100); // Tambahkan delay sedikit
    getMainView();
  }, []);


  return (
    <main className='space-y-10'>
        <Banner banners={banner}/>
        <About/>
        <div className='container mx-auto p-10 md:p-0 lg:p-20 space-y-20'>
            <h1 className='text-4xl font-semibold mb-10'>Daftar Rental</h1>
              <RentalCardMotor data={rental.filter(item => item.category === 'motor')}/>
              <RentalCardMobil data={rental.filter(item => item.category === 'mobil')}/>
            <h2 className='text-3xl font-semibold mb-10'>Apa Kata Mereka ?</h2>
              <Reviews reviews={reviews}/>
        </div>
    </main>
  )
}
