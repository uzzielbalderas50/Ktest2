export const useExcel = () => {
  const descargar = (data = [], columns = [], filename = 'export') => {
    const headers = columns.map(c => c.header)
    const rows = data.map((row) => columns.map((c) => {
      try { return c.accessor(row) } catch (e) { return '' }
    }))
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v ?? '')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  return { descargar }
}

export default useExcel
