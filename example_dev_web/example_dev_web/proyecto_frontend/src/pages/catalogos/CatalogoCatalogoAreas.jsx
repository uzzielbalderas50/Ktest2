import React, { useState, useEffect } from 'react'
import { Search, Plus, Pen, Trash, Download } from 'lucide-react'
import FormArea from '../../components/catalogos/forms/FormArea'
import ConfirmationModal from '../../components/ui/ConfirmationModal'
import SubNav from '../../components/ui/SubNav'
import { useToast } from '../../components/ui/ToastContext'
import { useAreas, useBuscarAreas, useDeleteArea } from '../../hooks/useAreas'
import { useExcel } from '../../hooks/useExcel'

const subNavLinks = [
  { to: '/app/catalogos/areas',    label: 'Areas' },
  { to: '/app/catalogos/turnos',   label: 'Turnos' },
]

const CatalogoAreas = () => {
  const [search, setSearch]               = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [selectedArea, setSelectedArea]   = useState(null)
  const [areaToDelete, setAreaToDelete]   = useState(null)
  const [currentPage, setCurrentPage]     = useState(1)
  const deleteMutation = useDeleteArea()
  const showToast = useToast()
  const { descargar } = useExcel()

  useEffect(() => {
    const h = setTimeout(() => { setDebouncedSearch(search); setCurrentPage(1) }, 500)
    return () => clearTimeout(h)
  }, [search])

  const queryAll    = useAreas()
  const querySearch = useBuscarAreas(debouncedSearch)
  const isSearching = debouncedSearch.trim().length > 0
  const currentQuery = isSearching ? querySearch : queryAll

  const handleDescargarExcel = () => {
    const todos = currentQuery.data || []
    if (!todos.length) { showToast('No hay datos para exportar', 'error'); return }
    descargar(todos, [
      { header: 'ID',     accessor: r => r.area_id },
      { header: 'Nombre', accessor: r => r.nombre },
    ], 'Catalogo_Areas')
  }

  const handleOpenForm = (area = null) => { setSelectedArea(area); setIsSlideOverOpen(true) }
  const confirmDelete  = () => {
    if (!areaToDelete) return
    deleteMutation.mutate(areaToDelete, {
      onSuccess: () => { showToast('Área eliminada correctamente', 'success'); setAreaToDelete(null) },
      onError:   () => { showToast('Error al eliminar', 'error');               setAreaToDelete(null) }
    })
  }

  const data       = currentQuery.data || []
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <SubNav links={subNavLinks} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Buscar área..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-none bg-white placeholder-gray-500 focus:outline-none focus:border-[#003588] focus:ring-1 focus:ring-[#003588] sm:text-sm" />
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleDescargarExcel}
              className="bg-white text-[#003588] border border-[#003588] hover:bg-[#003588] hover:text-white transition-colors rounded-none flex items-center text-sm font-medium px-4 py-2 focus:outline-none">
              <Download className="h-5 w-5 mr-2" />Descargar Excel
            </button>
            <button onClick={() => handleOpenForm(null)}
              className="bg-white text-[#003588] border border-[#003588] hover:bg-[#003588] hover:text-white transition-colors rounded-none flex items-center text-sm font-medium px-4 py-2 focus:outline-none">
              <Plus className="h-5 w-5 mr-2" />Nueva Área
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white border border-gray-200 overflow-hidden flex flex-col shadow-sm">
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider w-32">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentQuery.isLoading ? (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">Cargando áreas...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No se encontraron áreas</td></tr>
                ) : currentItems.map((item) => (
                  <tr key={item.area_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.area_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button onClick={() => handleOpenForm(item)} className="text-blue-600 hover:text-blue-900 mx-2 focus:outline-none" title="Editar"><Pen className="h-4 w-4" /></button>
                      <button onClick={() => setAreaToDelete(item.area_id)} className="text-gray-400 hover:text-[#003588] hover:bg-gray-100 p-1 mx-1 focus:outline-none" title="Eliminar"><Trash className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FormArea isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} areaToEdit={selectedArea} />
      <ConfirmationModal
        isOpen={!!areaToDelete}
        onClose={() => setAreaToDelete(null)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que deseas eliminar esta área?"
      />
    </div>
  )
}

export default CatalogoAreas