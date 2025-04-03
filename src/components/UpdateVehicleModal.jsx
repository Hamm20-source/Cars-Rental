import React, { useState } from "react";

export default function UpdateVehicleModal({ vehicle, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...vehicle });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name.startsWith("specs.")) {
                const key = name.split(".")[1]; // Ambil bagian setelah "specs."
                    return {
                        ...prev,
                        specs: {
                            ...prev.specs,
                            [key]: key === "passengers" ? parseInt(value, 10) || 0 : value,
                        }
                    }
            }; 

            if (name === "available") {
                return {...prev, available: value === "true" }
            }

            if (name === "price_per_day") {
              return { ...prev, price_per_day: parseFloat(value) || 0 };
            }

            return {...prev, [name]: value}
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(vehicle.id, {...formData});
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">

            <form onSubmit={handleSubmit} className="w-3/4 md:w-2/4 flex flex-col gap-3 p-4 bg-white/90 rounded-lg shadow">
                <label className="block text-sm font-medium">Nama Kendaraan*</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Nama Kendaraan" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required 
                />

                <label className="block text-sm font-medium">Deskripsi*</label>
                <input 
                  type="text"  
                  name="description" 
                  placeholder="Deskripsi" 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />

                {/* <label className="block text-sm font-medium">Gambar Kendaraan*</label>
                <input 
                  type="file"  
                  name="file" 
                  placeholder="Gambar Kendaraan" 
                  value={formData.image} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required
                /> */}

                <label className="block text-sm font-medium">Harga Sewa*</label>
                <input 
                  type="number"  
                  name="price_per_day" 
                  placeholder="Harga per Hari" 
                  value={formData.price_per_day} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required 
                />

                <label className="block text-sm font-medium">Lokasi*</label>
                <input 
                  type="text" 
                  name="location" 
                  placeholder="Lokasi" 
                  value={formData.location} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />

                <label className="block text-sm font-medium">Bahan Bakar*</label>
                <input 
                  type="text" 
                  name="specs.fuel" 
                  placeholder="Bahan Bakar" 
                  value={formData.specs.fuel} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                  required
                />

                <label className="block text-sm font-medium">Kapasitas Penumpang*</label>
                <input 
                  type="number" 
                  name="specs.passengers" 
                  placeholder="Kapasitas Penumpang" 
                  value={formData.specs.passengers} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />

                <label className="block text-sm font-medium">Transmisi*</label>
                <input 
                  type="text" 
                  name="specs.transmission" 
                  placeholder="Transmisi" 
                  value={formData.specs.transmission} 
                  onChange={handleChange} 
                  className="border border-gray-400 p-2 rounded" 
                />
                
                <label className="block text-sm font-medium">Available</label>
                <select 
                    name="available" 
                    value={formData.available} 
                    onChange={handleChange} 
                    className="border border-gray-400 p-2 rounded"
                >
                        <option value={true}>Tersedia</option>
                        <option value={false}>Belum Tersedia</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
                    <button type="submit" className="bg-orange-500 text-white p-2 rounded">Save</button>
                </div>
            </form>
        </div>
    );
}
