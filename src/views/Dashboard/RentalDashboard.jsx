import React, { useEffect, useState } from "react";
import { addVehicle, deleteVehicle, getVehicle, updateVehicle } from "../../services/RentalService";
import RentalDashboardTable from "../../components/RentalDashboardTable";
import UpdateVehicleModal from "../../components/UpdateVehicleModal"; // Import modal update
import AddVehicleModal from "../../components/AddVehicleModal";
import { toast, Toaster } from "sonner";

export default function RentalDashboard() {
  const [category, setCategory] = useState("mobil"); // Default: mobil
  const [vehicles, setVehicles] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [category]);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicle(category);
      setVehicles(data || {});
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleAddVehicle = async (vehicle) => {
    try {
      if (!vehicle.name) return;
  
      const newVehicle = await addVehicle(category, vehicle); // ID udah dari Firebase
      setVehicles((prev) => ({ ...prev, [newVehicle.id]: newVehicle }));
      toast.success(`Berhasil Menambahkan Kendaraan`, {
        position: "top-center", duration: 2000,
      })
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleUpdateVehicle = async (vehicleId, updatedData) => {
    try {
      await updateVehicle(category, vehicleId, updatedData);
      setVehicles((prev) => ({
        ...prev,
        [vehicleId]: { ...prev[vehicleId], ...updatedData },
      })); // 🔹 Perbarui state langsung
      toast.success(`Berhasil Mengupdate Data ${vehicleId}`, {
        position: "top-center", duration: 2000,
      })
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteVehicle(category, vehicleId);
      setVehicles((prev) => {
        const newVehicles = { ...prev };
        delete newVehicles[vehicleId];
        return newVehicles;
      }); // 🔹 Hapus dari state langsung
      toast.success(`Berhasil Menghapus Data ${vehicleId}`, {
        position: "top-center", duration: 2000,
      })
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-10 space-y-10 shadow-lg md:ml-12 min-h-screen"> 
      <h1 className="text-2xl font-bold mb-4">Rental Management</h1>

      <div className="flex gap-4 mb-4">
        <button className={`p-2 ${category === "mobil" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setCategory("mobil")}>Mobil</button>
        <button className={`p-2 ${category === "motor" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setCategory("motor")}>Motor</button>
      </div>

      <AddVehicleModal onSubmit={handleAddVehicle} />

      <Toaster richColors/>
      <RentalDashboardTable 
        vehicles={vehicles} 
        onDelete={handleDeleteVehicle} 
        onUpdate={(id) => { setSelectedVehicle(vehicles[id]); setIsModalOpen(true); }} 
      />

      {isModalOpen && selectedVehicle && (
        <UpdateVehicleModal 
          vehicle={selectedVehicle} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleUpdateVehicle} 
        />
      )}
    </div>
  );
}
