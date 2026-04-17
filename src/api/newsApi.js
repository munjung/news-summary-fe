import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * 뉴스 목록 가져오기
 * @param {*} page
 * @param {*} size
 * @returns
 */
export const fetchNewsList = (page = 0, size = 10) =>
  api.get(`/news?page=${page}&size=${size}`);

/**
 * 뉴스 상세 정보
 * @param {*} id
 * @returns
 */
export const fetchNewsDetail = (id) => api.get(`/news/${id}`);

/**
 * 과거 뉴스 데이터 가져오기
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
export const fetchNewsByPeriod = (from, to) =>
  api.post("/news/fetch/period", { from, to });
