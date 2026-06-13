export const systemMetrics = [
  { time: '00:00', load: 32, users: 120 },
  { time: '04:00', load: 18, users: 85 },
  { time: '08:00', load: 64, users: 310 },
  { time: '12:00', load: 82, users: 540 },
  { time: '16:00', load: 75, users: 480 },
  { time: '20:00', load: 45, users: 220 },
];

export const initialTasks = [
  { id: '1', name: 'Scraper Social v2', schedule: '00:00 UTC', status: 'Completado', priority: 'Alta' },
  { id: '2', name: 'Pipeline de Sentimiento', schedule: 'Cada 5m', status: 'En Progreso', priority: 'Crítica' },
  { id: '3', name: 'Rotación de Log de Auditoría', schedule: 'Diario', status: 'Pendiente', priority: 'Baja' },
  { id: '4', name: 'Mapeo de Comportamiento', schedule: 'Semanal', status: 'Pendiente', priority: 'Media' },
];

export const recentLogs = [
  { id: 'l1', timestamp: '2023-10-27T10:05:00Z', level: 'INFO', message: 'Nodo trabajador 04 conectado con éxito' },
  { id: 'l2', timestamp: '2023-10-27T10:06:12Z', level: 'WARN', message: 'Alto uso de memoria detectado en pod "flow-analyzer"' },
  { id: 'l3', timestamp: '2023-10-27T10:07:45Z', level: 'INFO', message: 'Lote de análisis de sentimiento #882 completado' },
  { id: 'l4', timestamp: '2023-10-27T10:09:10Z', level: 'ERROR', message: 'Límite de API alcanzado para el servicio "X-API"' },
];
