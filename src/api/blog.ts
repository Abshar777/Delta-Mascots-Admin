"use client"
import { BLOG_URL } from "@/constants/api"
import { initialBlogPosts } from "@/constants/data";
import AxiosInstance from "@/utils/axios"

export const getBlogs = async (token: string) => {
    const response = await AxiosInstance(token).get(`${BLOG_URL}/blogs`)
    return response.data
}

export const getBlogById = async (token: string, id: string) => {

    const response = await AxiosInstance(token).get(`${BLOG_URL}/blog/${id}`)
    return response.data
}

export const createBlog = async (token: string, data: any) => {
    const response = await AxiosInstance(token).post(`${BLOG_URL}/blog`, data)
    return response.data
}


export const updateBlog = async (token: string, id: string, data: any) => {
    const response = await AxiosInstance(token).put(`${BLOG_URL}/blog/${id}`, data)
    return response.data
}






