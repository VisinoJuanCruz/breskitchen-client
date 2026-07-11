import axios from "axios";
import { API_URL } from "./config";

export async function login(formData) {

    const response = await axios.post(

        `${API_URL}/api/login`,

        formData,

        {
            withCredentials: true
        }

    );

    return response.data;

}

export async function logout() {

    const response = await axios.post(

        `${API_URL}/api/logout`,

        {},

        {
            withCredentials: true
        }

    );

    return response.data;

}

export async function checkAuth() {

    const response = await axios.get(

        `${API_URL}/api/check-auth`,

        {
            withCredentials: true
        }

    );

    return response.data;

}