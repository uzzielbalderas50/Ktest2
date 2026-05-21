import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ModalLiberacion = ({ isOpen, onClose, errores = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white shadow-2xl rounded-none w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#003588] shrink-0" />
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Faltan {errores.length} campo{errores.length !== 1 ? 's' : ''} por completar
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 focus:outline-none rounded-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="px-5 py-4 space-y-2 max-h-72 overflow-y-auto">
          {errores.map((err, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-[#003588] shrink-0 mt-1.5" />
              {err.mensaje}
            </li>
          ))}
        </ul>

        <div className="px-5 py-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-[#1f467D] text-[#1f467D] text-xs font-semibold uppercase tracking-wide rounded-none hover:bg-[#1f467D] hover:text-white transition-colors focus:outline-none"
          >
            Revisar campos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLiberacion;
