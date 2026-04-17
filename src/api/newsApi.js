import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const fetchNewsList = (page = 0, size = 10) => 
    api.get(`/news?page=${page}&size=${size}`)

export const fetchNewsDetail = (id) => 
    api.get(`/news/${id}`)