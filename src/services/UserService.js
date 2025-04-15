import api from "./AxiosInstance";

export const getUser = async () => {
    try {
        const user = await api.get(`/users.json`)
        return user.data
    } catch (error) {
        console.info(error.message || 'Api Not Found')
    }
};

export const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}.json`)
    } catch (error) {
        console.info(error.message || 'Api Not Found')
    }
};

