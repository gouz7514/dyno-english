import Axios from 'axios'

export const baseURL = process.env.NEXT_PUBLIC_API_URL

export const api = Axios.create({
  baseURL
})

export default api