import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
})

export const generatePetName = async (filters) => {
  const { data } = await api.post('/generate', {
    ...filters,
    language: localStorage.getItem('locale') || 'en'
  })
  return data
}

export const getFavorites = async (userId) => {
  const { data } = await api.get(`/favorites/${userId}`)
  return data
}

export const addToFavorites = async (userId, nameId) => {
  const { data } = await api.post(`/favorites/${userId}`, { nameId })
  return data
}

export const removeFromFavorites = async (userId, nameId) => {
  const { data } = await api.delete(`/favorites/${userId}/${nameId}`)
  return data
}

export const createUser = async (email) => {
  const { data } = await api.post('/users', { email })
  return data
}

export const getNameHistory = async (page, perPage) => {
  const { data } = await api.get('/names/history', {
    params: { page, perPage }
  })
  return data
}

export const getNameDetail = async (slug) => {
  const { data } = await api.get(`/names/${slug}`)
  return data
}

export const getRelatedNames = async (nameId) => {
  const { data } = await api.get(`/names/${nameId}/related`)
  return data
} 