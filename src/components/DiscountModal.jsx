import React, { useState } from 'react'
import { addDiscount } from '../services/DiscountsService';

export default function DiscountModal({vehicleId, onClose}) {
    const [discount, setDiscount] = useState({
        name: "",
        description: "",
        discount_percent: 0,
        valid_until: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDiscount((prev) => ({
            ...prev,
            [name]: name === "discount_percent" ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDiscount(
                vehicleId,
            {
                ...discount,
                created_at: new Date().toISOString()
            })
            onClose();
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
        <form onSubmit={handleSubmit} className="w-3/4 md:w-2/4 flex flex-col gap-3 p-4 bg-white/90 rounded-lg shadow">

            <label className="block text-sm font-medium">Nama Diskon*</label>
            <input 
                type="text" 
                name="name" 
                placeholder="Nama Diskon" 
                value={discount.name} 
                onChange={handleChange} 
                className="border border-gray-400 p-2 rounded" 
                required 
            />

            <label className="block text-sm font-medium">Deskripsi*</label>
            <textarea
                name="description"
                value={discount.description}
                onChange={handleChange}
                placeholder="Deskripsi Diskon"
                className="border w-full p-2 rounded"
            />

            <label className="block text-sm font-medium">Persentasi Diskon*</label>
            <input 
                type="number" 
                name="discount_percent" 
                placeholder="Persentasi Diskon" 
                value={discount.discount_percent} 
                onChange={handleChange} 
                className="border border-gray-400 p-2 rounded" 
            />

            <label className="block text-sm font-medium">Tenggat Diskon*</label>
            <input 
                type="date" 
                name="valid_until" 
                placeholder="Tenggat Diskon" 
                value={discount.valid_until} 
                onChange={handleChange} 
                className="border border-gray-400 p-2 rounded" 
                required
            />


            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Batal</button>
                <button type="submit" className="bg-orange-500 text-white p-2 rounded">Simpan</button>
            </div>
        </form>
    </div>
  );
};
