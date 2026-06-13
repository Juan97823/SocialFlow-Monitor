export const systemMetrics = [
  { time: '00:00', load: 32, users: 120 },
  { time: '04:00', load: 18, users: 85 },
  { time: '08:00', load: 64, users: 310 },
  { time: '12:00', load: 82, users: 540 },
  { time: '16:00', load: 75, users: 480 },
  { time: '20:00', load: 45, users: 220 },
];

export const initialTasks = [
  { id: '1', name: 'Social Scraper v2', schedule: '00:00 UTC', status: 'Completed', priority: 'High' },
  { id: '2', name: 'Sentiment Analysis Pipeline', schedule: 'Every 5m', status: 'In Progress', priority: 'Critical' },
  { id: '3', name: 'Audit Log Rotation', schedule: 'Daily', status: 'Pending', priority: 'Low' },
  { id: '4', name: 'User Behavior Mapping', schedule: 'Weekly', status: 'Pending', priority: 'Medium' },
];

export const recentLogs = [
  { id: 'l1', timestamp: '2023-10-27T10:05:00Z', level: 'INFO', message: 'Worker node 04 connected successfully' },
  { id: 'l2', timestamp: '2023-10-27T10:06:12Z', level: 'WARN', message: 'High memory usage detected on pod "flow-analyzer"' },
  { id: 'l3', timestamp: '2023-10-27T10:07:45Z', level: 'INFO', message: 'Sentiment analysis job batch #882 completed' },
  { id: 'l4', timestamp: '2023-10-27T10:09:10Z', level: 'ERROR', message: 'API Rate limit reached for service "X-API"' },
];
