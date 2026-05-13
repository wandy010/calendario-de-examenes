import React, { useState } from 'react';

const ExamModal = ({ isOpen, onClose, onSave, exam = { materia: '', asunto: '', fecha: '', hora: '', aula: '', profesor: '', notas: '' } }) => {
  const [formData, setFormData] = useState(exam);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div className="glass-panel p-8 w-full max-w-md text-slate-800">
        <h2 className="text-2xl font-light mb-6 text-center uppercase tracking-widest">Registrar Examen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none focus:ring-2 ring-cyan-200" 
              placeholder="Materia"
              value={formData.materia}
              onChange={e => setFormData({...formData, materia: e.target.value})}
              required 
            />
            <input 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none focus:ring-2 ring-cyan-200" 
              placeholder="Asunto (Ej: PC1)"
              value={formData.asunto}
              onChange={e => setFormData({...formData, asunto: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="date" 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none" 
              value={formData.fecha}
              onChange={e => setFormData({...formData, fecha: e.target.value})}
              required 
            />
            <input 
              type="time" 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none" 
              value={formData.hora}
              onChange={e => setFormData({...formData, hora: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none" 
              placeholder="Aula"
              value={formData.aula}
              onChange={e => setFormData({...formData, aula: e.target.value})}
            />
            <input 
              className="p-2 rounded bg-white/40 border border-white/50 outline-none" 
              placeholder="Profesor"
              value={formData.profesor}
              onChange={e => setFormData({...formData, profesor: e.target.value})}
            />
          </div>
          <textarea 
            className="w-full p-2 rounded bg-white/40 border border-white/50 outline-none" 
            placeholder="Notas adicionales..."
            value={formData.notas}
            onChange={e => setFormData({...formData, notas: e.target.value})}
          />
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-800 transition">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-cyan-300/60 hover:bg-cyan-300/80 rounded-full transition shadow-sm">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamModal;
