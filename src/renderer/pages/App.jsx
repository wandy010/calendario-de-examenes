import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
const ipcRenderer = (window.require) ? window.require('electron').ipcRenderer : null;
import ExamModal from '../components/ExamModal';
import '../styles/index.css';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    loadExams();
  }, [month, year]);

  const loadExams = async () => {
    if (!ipcRenderer) {
      console.error('ipcRenderer not found');
      return;
    }
    const data = await ipcRenderer.invoke('get-exams', { month: month + 1, year });
    setExams(data);
  };

  const handleSaveExam = async (exam) => {
    if (!ipcRenderer) {
      console.error('ipcRenderer not found');
      return;
    }
    await ipcRenderer.invoke('save-exam', exam);
    loadExams();
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getBackground = () => {
    // Path assumes images are named 0.jpg, 1.jpg ... 11.jpg in assets/hnk-photos
    return `/src/renderer/assets/hnk-photos/${month}.jpg`;
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center transition-all duration-1000" 
      style={{ backgroundImage: `url(${getBackground()})` }}
    >
      <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-[2px]">
        
        <div className="glass-panel w-full max-w-5xl p-8 text-slate-800">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-thin tracking-tighter italic">
              {currentDate.toLocaleString('default', { month: 'long' })} <span className="font-bold not-italic">{year}</span>
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-2 hover:bg-white/30 rounded-full transition"
              >
                ←
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-2 hover:bg-white/30 rounded-full transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid text-center font-medium mb-2">
            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d => (
              <div key={d} className="py-2 text-slate-600">{d}</div>
            ))}
          </div>
          
          <div className="calendar-grid border-t border-l border-white/30">
            {days.map((day, index) => {
              const dateString = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
              const dayExams = exams.filter(e => e.fecha === dateString);

              return (
                <div 
                  key={index} 
                  onClick={() => day && openModal(dateString)}
                  className={`calendar-day border-r border-b border-white/30 p-1 overflow-hidden ${!day ? 'bg-black/5' : ''}`}
                >
                  <span className="text-xs opacity-60">{day}</span>
                  <div className="flex flex-col gap-1 mt-1">
                    {dayExams.map((ex, i) => (
                      <div key={i} className="flex items-center gap-1 bg-white/50 rounded-sm px-1 py-0.5 text-[10px] truncate">
                        <div className="gem-marker" />
                        <span className="truncate font-semibold">{ex.asunto}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ExamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveExam}
        exam={selectedDate ? { fecha: selectedDate } : {}}
      />
    </div>
  );
};

export default App;
