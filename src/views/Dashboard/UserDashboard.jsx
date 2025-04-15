import React, { useEffect, useState } from 'react'
import { getUser, deleteUser } from '../../services/UserService';
import { TrashIcon } from '@heroicons/react/20/solid';
import { toast, Toaster } from 'sonner';

export default function UserDashboard() {
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await getUser();
        setUser(response || {})
      } catch (error) {
        console.info("gagal mendapatkan Api User" || error.message)
      }
    }

    userData()
  }, [])

  const deleteUserData = async (userId) => {
    try {
      await deleteUser(userId);
      setUser((prev) => {
        const newUser = {...prev};
        delete newUser[userId];
        return newUser
      })
      setOpenModal(false);
      toast.success(`Berhasil menghapus ${userId}`,{
        position: 'top-center',
        duration: 2000,
      })
      console.info(`Berhasil menghapus ${userId}`)
    } catch (error) {
      console.info(error.message, `Gagal menghapus ${userId}`)
    }
  };

  const buttonshowModal = (id) => {
    setOpenModal(true)
    setSelectedId(id)
  };

  const selectedName = user[selectedId]?.name || ""


  return (
    <div className='p-10 space-y-10 shadow-lg md:ml-12 min-h-screen'>
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto text-center text-gray-600'>
          <thead>
            <tr className='border'>
               {["ID", "Created At", "Email", "Name", "Role", "Image", "Delete"].map((header) => (
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
            {Object.entries(user).map(([id, users]) => (
              <tr key={id} className="border">
                <td className="border p-2">{users.id}</td>
                <td className="border p-2">{users.created_at.slice(0, 10)}</td>
                <td className="border p-2">{users.email}</td>
                <td className="border p-2">{users.name}</td>
                <td className="border p-2">{users.role}</td>
                <td className="border p-2">
                    <img src={users.image || "https://img.icons8.com/material-outlined/user--v1.png"} alt={`Image ${users.name} not Upload`} className="w-10 object-cover mx-auto" />
                </td>
                <td className="border p-2 text-center">
                    <Toaster/>
                    <button onClick={() => buttonshowModal(id)} className="bg-red-300 p-1 rounded-md">
                        <TrashIcon className="w-5"/>
                    </button>
                </td>
              </tr>
              ))}
          </tbody>
        </table>

        {
          openModal && (
            <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex justify-center items-center">
                <div className="text-center bg-white shadow-lg p-10 space-y-10 rounded-lg">
                    <h1>
                      Apakah anda ingin Menghapus data 
                      {" "}
                      <span className='font-semibold'>{selectedName}?</span>
                    </h1>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => deleteUserData(selectedId)}
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
    </div>
  )
}
