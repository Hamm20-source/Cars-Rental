import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function RentalDashboardTable({vehicles, onDelete, onUpdate}) {
    return (
              <div className="overflow-x-auto ">
                <table className="w-full table-auto border text-center text-gray-600">
                    <thead>
                        <tr>
                          {["ID", "Image", "Name", "location", "Price", "Available", "Edit", "Delete"].map((header) => (
                            <th
                              key={header}
                              className="border-b border-gray-200 bg-gray-100 text-gray-800  p-4  font-semibold text-sm"
                              >
                              {header}
                            </th>
                          ))}
                        </tr>
                    </thead>
                    <tbody>
                      {vehicles ? Object.keys(vehicles).map((vehicleId) => (
                          <tr key={vehicleId} className="border">
                            <td className="border p-2">{vehicles[vehicleId].id}</td>
                            <td className="border p-2">
                              {vehicles[vehicleId].images && vehicles[vehicleId].images.length > 0 ? (
                                <img src={vehicles[vehicleId].images[0]} alt={`Image of ${vehicles[vehicleId].name}`} className="w-20 object-cover mx-auto" />
                              ) : (
                                <p className="text-gray-500">Images for {vehicles[vehicleId].name} not uploaded</p>
                              )}
                            </td>
                            <td className="border p-2">{vehicles[vehicleId].name}</td>
                            <td className="border p-2">{vehicles[vehicleId].location || `Locate For ${vehicles[vehicleId].name} not specified`}</td>
                            <td className="border p-2">Rp{Number(vehicles[vehicleId].price_per_day).toLocaleString('id-ID')}</td>
                            <td className="border p-2">{vehicles[vehicleId].available ? "Tersedia" : "Belum Tersedia"}</td>
                            <td className="border p-2 text-center">
                              <button onClick={() => onUpdate(vehicleId)} className="bg-green-300 p-1 rounded-md">
                                <PencilIcon className="w-5"/>
                              </button>
                            </td>
                            <td className="border p-2 text-center">
                              <button onClick={() => onDelete(vehicleId)} className="bg-red-300 p-1 rounded-md">
                                <TrashIcon className="w-5"/>
                              </button>
                            </td>
                          </tr>
                      )) : <p>Tidak ada kendaraan.</p>}
                    </tbody>
                </table>
              </div>
    )
}