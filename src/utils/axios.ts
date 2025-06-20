"use client"
import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AxiosInstance = (token: string = "") => {
    return axios.create({
        baseURL: baseURL,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export default AxiosInstance;