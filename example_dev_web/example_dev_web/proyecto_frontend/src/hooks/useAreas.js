import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CatalogoAreaService } from '../services/catalogos/CatalogoAreaService'

export const useAreas = () =>
  useQuery({ queryKey: ['areas'], queryFn: CatalogoAreaService.getAll })

export const useBuscarAreas = (termino) =>
  useQuery({
    queryKey: ['areas', termino],
    queryFn: () => CatalogoAreaService.search(termino),
    enabled: !!termino
  })

export const useCreateArea = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: CatalogoAreaService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['areas'] })
  })
}

export const useUpdateArea = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => CatalogoAreaService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['areas'] })
  })
}

export const useDeleteArea = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: CatalogoAreaService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['areas'] })
  })
}