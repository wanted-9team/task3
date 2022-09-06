import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    api_key: process.env.REACT_APP_SERVICE_KEY,
    language: 'ko',
  },
})
