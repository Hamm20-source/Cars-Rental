import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function RentalDashboardTable({vehicles, onDelete, onUpdate}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenModal = (id) => {
    setOpenModal(true)
    setSelectedId(id);
  };

  const handleConfirmModal = () => {
    setOpenModal(false)
    onDelete(selectedId)
  };

  const selectedVehicleName =  vehicles[selectedId]?.name || ""

    return (
              <div className="overflow-x-auto ">
                <table className="w-full table-auto  text-center text-gray-600">
                  {vehicles && Object.keys(vehicles).length > 0 ? (
                    <>
                    <thead>
                        <tr>
                          {["ID", "Image", "Name", "location", "Price", "Available", "Edit", "Delete"].map((header) => (
                            <th
                              key={header}
                              className="bg-gray-200 text-gray-800  p-4  font-semibold text-sm"
                              >
                              {header}
                            </th>
                          ))}
                        </tr>
                    </thead>
                    <tbody>
                      {Object.keys(vehicles).map((vehicleId, index) => (
                          <tr key={vehicleId} className={`${index % 2 === 0 ? 'bg-white': 'bg-blue-100'}`}>
                            <td className="p-2">{vehicles[vehicleId].id}</td>
                            <td className="p-2">
                              {vehicles[vehicleId].images && vehicles[vehicleId].images.length > 0 ? (
                                <img src={vehicles[vehicleId].images[0]} alt={`Image of ${vehicles[vehicleId].name}`} className="w-20 h-20 object-cover mx-auto" />
                              ) : (
                                <p className="text-gray-500">Images for {vehicles[vehicleId].name} not uploaded</p>
                              )}
                            </td>
                            <td className="p-2">{vehicles[vehicleId].name}</td>
                            <td className="p-2">{vehicles[vehicleId].location || `Locate For ${vehicles[vehicleId].name} not specified`}</td>
                            <td className="p-2">Rp{Number(vehicles[vehicleId].price_per_day).toLocaleString('id-ID')}</td>
                            <td className="p-2">{vehicles[vehicleId].available ? "Tersedia" : "Belum Tersedia"}</td>
                            <td className="p-2 text-center">
                              <button onClick={() => onUpdate(vehicleId)} className="bg-green-300 p-1 rounded-md">
                                <PencilIcon className="w-5"/>
                              </button>
                            </td>
                            <td className="p-2 text-center">
                              <button onClick={() => handleOpenModal(vehicleId)} className="bg-red-300 p-1 rounded-md">
                                <TrashIcon className="w-5"/>
                              </button>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                    </>
                  ) : (
                    <p>Tidak ada Kendaraan yang tersedia.</p>
                  )}
                </table>

                {
                  openModal && (
                    <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex justify-center items-center">
                        <div className="text-center bg-white shadow-lg p-10 space-y-10 rounded-lg">
                            <h1>Apakah anda ingin Menghapus data {selectedVehicleName}?</h1>
                            <div className="flex justify-between items-center">
                              <button 
                                onClick={handleConfirmModal}
                                className="px-6 py-2 bg-blue-500 text-white font-medium"
                              >
                                Ya
                              </button>
                              <button 
                                onClick={() => setOpenModal(false)}
                                className="px-3 py-2 bg-red-500 text-white font-medium"
                              >
                                Tidak
                              </button>
                            </div>
                        </div>
                    </div>
                  )
                }
              </div>
    )
}