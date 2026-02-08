import api from '../lib/api';

export const careerService = {
  submitApplication: (data) => api.post('/careers', data),
  getApplications: () => api.get('/careers'),
  updateStatus: (id, status) => api.put(`/careers/${id}`, { status }),
  reply: (data) => api.post('/careers/reply', data),
};
