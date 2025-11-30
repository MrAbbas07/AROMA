import axios from 'axios'
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BE_SERVER_BASE_URL,
});



export const registerUser = async (userData) => {
    try {
        const res = await apiClient.post(
            '/register',
            userData
        );
        return res.data;
    } catch (error) {
        console.error('Error registering new user:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await apiClient.post(
            '/login',
            { email, password }
        );
        return res.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const chatWithBot = async (message, history) => {
    try {
        const res = await apiClient.post('/api/chat', { message, history });
        return res.data;
    } catch (error) {
        console.error('Error chatting with bot:', error);
        throw error;
    }
};
