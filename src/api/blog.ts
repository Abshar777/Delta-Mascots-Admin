"use client"
import { BLOG_URL } from "@/constants/api"
import { initialBlogPosts } from "@/constants/data";
import AxiosInstance from "@/utils/axios"

export const getBlogs = async (token: string) => {
    return await Promise.resolve(() => {
        setTimeout(() => { }, 1000)
    }).then(() => {
        return initialBlogPosts;
    });
    // const response = await AxiosInstance(token).get(`${BLOG_URL}`)
    // return response.data
}

export const getBlogById = async (token: string, id: string) => {
    return await Promise.resolve(() => {
        setTimeout(() => { }, 1000)
    }).then(() => {
        return initialBlogPosts.find((post) => post.id === id);
    });
    // const response = await AxiosInstance(token).get(`${BLOG_URL}/${id}`)
    // return response.data
}

export const createBlog = async (token: string, data: any) => {
    const response = await AxiosInstance(token).post(`${BLOG_URL}`, data)
    return response.data
}


export const updateBlog = async (token: string, id: string, data: any) => {
    const response = await AxiosInstance(token).put(`${BLOG_URL}/`, data)
    return response.data
}






