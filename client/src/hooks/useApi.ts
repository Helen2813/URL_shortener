import axios from 'axios';

const API_BASE = 'http://localhost:3000/url';

export const api = {
  createShortUrl: (originalUrl: string, alias?: string, expiresAt?: string) =>
    axios.post(`${API_BASE}/shorten`, { originalUrl, alias, expiresAt }),

  getInfo: (shortCode: string) =>
    axios.get(`${API_BASE}/info/${shortCode}`),

  getAnalytics: (shortCode: string) =>
    axios.get(`${API_BASE}/analytics/${shortCode}`),

  deleteShortUrl: (shortCode: string) =>
    axios.delete(`${API_BASE}/delete/${shortCode}`)
};
