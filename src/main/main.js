const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { executeQuery } = require('./db');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "HnK - Calendario de Exámenes",
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'));
  }
}

// IPC Handlers for Database Operations
ipcMain.handle('get-exams', async (event, { month, year }) => {
  const query = `SELECT * FROM Examenes WHERE MONTH(fecha) = @month AND YEAR(fecha) = @year`;
  return await executeQuery(query, [
    { name: 'month', type: sql.Int, value: month },
    { name: 'year', type: sql.Int, value: year }
  ]);
});

ipcMain.handle('save-exam', async (event, exam) => {
  const query = `
    INSERT INTO Examenes (materia, asunto, fecha, hora, aula, profesor, notas)
    VALUES (@materia, @asunto, @fecha, @hora, @aula, @profesor, @notas)
  `;
  return await executeQuery(query, [
    { name: 'materia', type: sql.NVarChar, value: exam.materia },
    { name: 'asunto', type: sql.NVarChar, value: exam.asunto },
    { name: 'fecha', type: sql.Date, value: exam.fecha },
    { name: 'hora', type: sql.Time, value: exam.hora },
    { name: 'aula', type: sql.NVarChar, value: exam.aula },
    { name: 'profesor', type: sql.NVarChar, value: exam.profesor },
    { name: 'notas', type: sql.NVarChar, value: exam.notas },
  ]);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
