import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CatalogoTurnoService } from '../services/catalogos/CatalogoTurnoService'

export const useTurnos = () =>
  useQuery({ queryKey: ['turnos'], queryFn: CatalogoTurnoService.getAll })

export const useBuscarTurnos = (termino) =>
  useQuery({
    queryKey: ['turnos', termino],
    queryFn: () => CatalogoTurnoService.search(termino),
    enabled: !!termino
  })

export const useCreateTurno = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: CatalogoTurnoService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['turnos'] })
  })
}

export const useUpdateTurno = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => CatalogoTurnoService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['turnos'] })
  })
}

export const useDeleteTurno = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: CatalogoTurnoService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['turnos'] })
  })
}