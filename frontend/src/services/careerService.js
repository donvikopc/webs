import api from '../lib/api';

export const careerService = {
  submitApplication: async (data) => {
    return await api.post('/careers', data);
  },
  
  getAllApplications: async () => {
    const response = await api.get('/careers');
    return response.data;
  },

  updateStatus: async (id, status) => {
    return await api.put(`/careers/${id}`, { status });
  }
};
