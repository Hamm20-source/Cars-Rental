import api from './AxiosInstance'; // Ini instance Axios yang sudah konek ke Firebase

export const addDiscount = async (vehicleId, discountData) => {
  try {
    const safeVehicleId = String(vehicleId).replace(/[.#$/\[\]]/g, "_");
    await api.put(`/discounts/${safeVehicleId}.json`, discountData);
    console.log("Diskon berhasil ditambahkan untuk kendaraan:", vehicleId);
  } catch (error) {
    console.error("Gagal menambahkan diskon:", error.message);
  }
};

export const getDiscount = async (vehicleId) => {
    try {
        const responseData = await api.get(`/discounts/${vehicleId}`)
        return responseData || {}
    } catch {
        console.info("Gagal mendapatkan Data")
    }
}