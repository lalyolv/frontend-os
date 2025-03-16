import axios from 'axios'

// Buscar token salvo no localStorage (após login)
const api = axios.create({
  baseURL: "http://localhost:3000"
})

// Adiciona o token automaticamente nas requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
