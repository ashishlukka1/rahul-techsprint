import { authApi } from './auth';

export const roadmapApi = {
  async generateRoadmap(userData) {
    const token = localStorage.getItem('token');
    
    const res = await fetch('/api/roadmaps/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 👈 ADD THIS
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Roadmap generation error:', data);
      throw new Error(data.error || 'Failed to generate roadmap');
    }

    return data;
  },

  async getRoadmap(id) {
    const res = await fetch(`/api/roadmaps/${id}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch roadmap');
    }

    return data;
  },

  async updateProgress(id, progressData) {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`/api/roadmaps/${id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 👈 ADD THIS
      },
      body: JSON.stringify(progressData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to update progress');
    }

    return data;
  }
};
