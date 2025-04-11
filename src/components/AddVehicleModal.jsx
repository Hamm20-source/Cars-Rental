import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

export default function AddVehicleModal({ onSubmit }) {
  const [showModal, setShowModal] = useState(false)
  const [vehicle, setVehicle] = useState({
    name: "",
    description: "",
    price_per_day: 0,
    location: "",
    available: true,
    rating: 0,
    images: [],
    specs: { fuel: "", passengers: 0, transmission: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Jika yang diubah adalah images, ubah string menjadi array
    if (name === "images") {
      setVehicle((prev) => ({
        ...prev,
        images: value.split(",").map((url) => url.trim()), // Konversi ke array
      }));
    } 
    // Jika yang diubah adalah specs (nested object)
    else if (name.startsWith("specs.")) {
      const key = name.split(".")[1]; // Ambil bagian setelah "specs."
      setVehicle((prevVehicle) => ({
        ...prevVehicle,
        specs: {
          ...prevVehicle.specs,
          [key]: key === "passengers" ? parseInt(value, 10) : value, // Pastikan passengers adalah angka
        },
      }));
    } 
    // Untuk field biasa
    else {
      setVehicle((prevVehicle) => ({
        ...prevVehicle,
        [name]: name === "price_per_day" ? parseFloat(value) : value, // Pastikan price_per_day adalah angka
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Periksa data sebelum dikirim
    console.log("Data yang dikirim ke Firebase:", JSON.stringify(vehicle, null, 2));
  
    onSubmit(vehicle);
    setVehicle({
      name: "",
      description: "",
      price_per_day: 0,
      location: "",
      available: true,
      rating: 0,
      images: [],
      specs: { fuel: "", passengers: 0, transmission: "" }
    });
  };
  

  const buttonModal = () => setShowModal(!showModal)

  return (
    <div className="w-full relative">
        <button
            onClick={buttonModal}
            className="bg-black/80 hover:bg-orange-600 text-white p-1 rounded transition-all duration-100"
        >
            Tambah Kendaraan
        </button>
    
        {  showModal && (
            <div className="fixed inset-0 w-full flex justify-center bg-black/50 backdrop-blur-sm items-center z-50">
                <button
                    onClick={buttonModal}
                    className="absolute top-5 right-10 bg-white/90 rounded-full"
                >
                    <XMarkIcon className="w-10"/>
                </button>

                <form onSubmit={handleSubmit} className="w-3/4 md:w-2/4 flex flex-col gap-3 p-4 bg-white/90 rounded-lg shadow">
                <label className="block text-sm font-medium">Nama Kendaraan*</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Nama Kendaraan" 
                  value={vehicle.name} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required 
                />

                <label className="block text-sm font-medium">Gambar Kendaraan (URL)*</label>
                <input
                  type="text"
                  name="images"
                  placeholder="Masukkan URL gambar"
                  value={vehicle.images}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded"
                  required
                />

                <label className="block text-sm font-medium">Deskripsi*</label>
                <input 
                  type="text"  
                  name="description" 
                  placeholder="Deskripsi" 
                  value={vehicle.description} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />
                

                <label className="block text-sm font-medium">Harga Sewa*</label>
                <input 
                  type="number"  
                  name="price_per_day" 
                  placeholder="Harga per Hari" 
                  value={vehicle.price_per_day} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required 
                />

                <label className="block text-sm font-medium">Lokasi*</label>
                <input 
                  type="text" 
                  name="location" 
                  placeholder="Lokasi" 
                  value={vehicle.location} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />

                <label className="block text-sm font-medium">Bahan Bakar*</label>
                <input 
                  type="text" 
                  name="specs.fuel" 
                  placeholder="Bahan Bakar" 
                  value={vehicle.specs.fuel} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required
                />

                <label className="block text-sm font-medium">Kapasitas Penumpang*</label>
                <input 
                  type="number" 
                  name="specs.passengers" 
                  placeholder="Kapasitas Penumpang" 
                  value={vehicle.specs.passengers} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />

                <label className="block text-sm font-medium">Transmisi*</label>
                <input 
                  type="text" 
                  name="specs.transmission" 
                  placeholder="Transmisi" 
                  value={vehicle.specs.transmission} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />
                
                <button type="submit" className="bg-orange-500 text-white font-semibold p-2 rounded">Tambah Kendaraan</button>
                </form>
            </div>
        )}
    </div>

  ); 
}
