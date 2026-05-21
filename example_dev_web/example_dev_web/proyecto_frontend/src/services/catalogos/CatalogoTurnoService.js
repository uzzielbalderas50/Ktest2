import client from '../../api/client'

const basePath = '/api/turnos'

export const CatalogoTurnoService = {
  getAll: async () => {
    const response = await client.get(`${basePath}/`)
    return response.data
  },
  search: async (termino) => {
    const response = await client.get(`${basePath}/buscar/${termino}`)
    return response.data
  },
  create: async (data) => {
    const response = await client.post(`${basePath}/`, data)
    return response.data
  },
  update: async (id, data) => {
    const response = await client.put(`${basePath}/${id}`, data)
    return response.data
  },
  remove: async (id) => {
    const response = await client.delete(`${basePath}/${id}`)
    return response.data
  }
}