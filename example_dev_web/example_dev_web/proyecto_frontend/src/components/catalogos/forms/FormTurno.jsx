import React, { useState, useEffect } from 'react'
import SlideOver from '../../ui/SlideOver'
import { useCreateTurno, useUpdateTurno } from '../../../hooks/useTurnos'
import { useToast } from '../../ui/ToastContext'

const INITIAL = { nombre: '', hora_inicio: '', hora_fin: '' }

const FormTurno = ({ isOpen, onClose, turnoToEdit }) => {
  const isEditing = !!turnoToEdit
  const [formData, setFormData] = useState(INITIAL)
  const createMutation = useCreateTurno()
  const updateMutation = useUpdateTurno()
  const showToast = useToast()

  useEffect(() => {
    setFormData(turnoToEdit ? {
      nombre:      turnoToEdit.nombre      || '',
      hora_inicio: turnoToEdit.hora_inicio || '',
      hora_fin:    turnoToEdit.hora_fin    || '',
    } : INITIAL)
  }, [turnoToEdit, isOpen])

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = (e) => {
    e.preventDefault()
    const opts = {
      onSuccess: () => { onClose(); setTimeout(() => showToast(`Turno ${isEditing ? 'actualizado' : 'creado'} correctamente`, 'success'), 200) },
      onError:   () => showToast(`Error al ${isEditing ? 'actualizar' : 'crear'}`, 'error')
    }
    isEditing
      ? updateMutation.mutate({ id: turnoToEdit.turno_id, data: formData }, opts)
      : createMutation.mutate(formData, opts)
  }

  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Turno' : 'Nuevo Turno'}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required
              className="w-full border border-gray-300 p-2 rounded-none focus:outline-none focus:border-[#003588] focus:ring-1 focus:ring-[#003588]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
            <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} required
              className="w-full border border-gray-300 p-2 rounded-none focus:outline-none focus:border-[#003588] focus:ring-1 focus:ring-[#003588]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
            <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} required
              className="w-full border border-gray-300 p-2 rounded-none focus:outline-none focus:border-[#003588] focus:ring-1 focus:ring-[#003588]" />
          </div>
        </div>
        <div className="mt-8 pt-4 border-t flex justify-end space-x-3 shrink-0">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none hover:bg-gray-50 focus:outline-none">Cancelar</button>
          <button type="submit" disabled={isSubmitting}
            className={`px-4 py-2 bg-white text-[#003588] border border-[#003588] hover:bg-[#003588] hover:text-white transition-colors duration-200 rounded-none text-sm font-medium focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </SlideOver>
  )
}

export default FormTurno