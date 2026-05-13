# Planning: Calendario de Exámenes Anime

## 🎯 Objetivo
App de escritorio para Windows 11 que permita agendar exámenes universitarios con una estética anime dinámica que cambia mensualmente.

## 🎨 Diseño Visual (100% Houseki no Kuni)
Toda la aplicación sigue la estética de *Houseki no Kuni*:
- **Fondos:** Imágenes dinámicas por mes ubicadas en `src/renderer/assets/hnk-photos`.
- **Paleta:** Colores pastel, translúcidos, efectos de brillo cristalino.
- **Tipografía:** Minimalista y elegante.
- **Marcadores de examen:** Iconos de fragmentos de gemas.
- **Efectos:** Glassmorphism (fondo desenfocado y translúcido) para los paneles.

## 📅 Lógica del Calendario
- **Visualización:** Nombre del asunto visible en la celda (ej. "MATE-3-Primera-Practica").
- **Interacción:** Clic en día $\rightarrow$ Agregar/Editar examen.

## 🗄️ Base de Datos (SQL Server Express - Offline)
**Tabla: `Examenes`**
- `id`: INT (PK, Identity)
- `materia`: NVARCHAR(100)
- `asunto`: NVARCHAR(255) (Ej: "Primera-Practica")
- `fecha`: DATE
- `hora`: TIME
- `aula`: NVARCHAR(50)
- `profesor`: NVARCHAR(100)
- `notas`: NVARCHAR(MAX)

## 🛠️ Stack Técnico
- **Runtime:** Electron
- **Frontend:** React + Tailwind CSS
- **Build Tool:** Vite
- **Package Manager:** `pnpm`
- **Database:** SQL Server Express (via `mssql`)
- **OS:** Windows 11 (Nativo)

## ⚠️ Seguridad
- No usar librerías comprometidas (evitar dependencias no verificadas).
- Auditoría constante con `pnpm audit`.
