import axios from "axios";

export const getRentalApi = async () => {
    try {
        const response = await axios.get("https://carsstore-restapi-default-rtdb.asia-southeast1.firebasedatabase.app/.json");
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
}