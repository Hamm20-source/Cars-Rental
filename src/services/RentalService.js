import api from "./AxiosInstance";

export const addVehicle = async (category, vehicleData) => {
    try {
        const response = await api.post(`/rentals/${category}.json`, vehicleData);
        const id = response.data.name;
        const vehicleWithId = { ...vehicleData, id };

        // Update data yang baru ditambahkan dengan ID-nya sendiri
        await api.patch(`/rentals/${category}/${id}.json`, { id });

        return vehicleWithId;
    } catch (error) {
        console.error("Gagal Menambah Kendaraan", error);
    }
};


export const getVehicle = async (category) => {
    try {
        const response = await api.get(`/rentals/${category}.json`);
        return response.data || {};
    } catch (error) {
        console.error("Gagal mengambil data", error);
    }
};

export const updateVehicle = async (category, vehicleId, updateData) => {
    try {
        await api.patch(`/rentals/${category}/${vehicleId}.json`, updateData);
        console.log("Berhasil Update Data");
    } catch (error) {
        console.error("Gagal update data", error);
    }
};

export const deleteVehicle = async (category, vehicleId) => {
    try {
        await api.delete(`/rentals/${category}/${vehicleId}.json`);
        console.log("Berhasil menghapus data");
    } catch (error) {
        console.error("Gagal menghapus data", error);
    }
};
