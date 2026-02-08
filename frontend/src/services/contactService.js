import api from '../lib/api';

export const contactService = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  reply: (data) => api.post('/contact/reply', data),
};
