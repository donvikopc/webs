import api from '../lib/api';

export const getConfig = async (key) => {
  try {
    const response = await api.get(`/config/${key}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateConfig = async (key, value) => {
  const response = await api.post('/config', { key, value });
  return response.data;
};
