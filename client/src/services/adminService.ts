import api from './api';
import type {
  AdminLoginData,
  AdminProfile,
  AdminStats,
  Lead,
  PaginatedLeads,
} from '@/types';

interface LoginResponse {
  access_token: string;
  message: string;
}

export const adminService = {
  async login(data: AdminLoginData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/admin/login', data);
    return response.data;
  },

  async getProfile(): Promise<AdminProfile> {
    const response = await api.get<AdminProfile>('/admin/profile');
    return response.data;
  },

  async getStats(): Promise<AdminStats> {
    const response = await api.get<AdminStats>('/admin/stats');
    return response.data;
  },

  async getLeads(params: {
    page?: number;
    per_page?: number;
    search?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<PaginatedLeads> {
    const response = await api.get<PaginatedLeads>('/admin/leads', { params });
    return response.data;
  },

  async getLead(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/admin/lead/${id}`);
    return response.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/admin/lead/${id}`);
  },

  async exportCSV(): Promise<void> {
    try {
      const response = await api.get('/admin/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error('Failed to export CSV');
    }
  },

  async exportExcel(): Promise<void> {
    try {
      const response = await api.get('/admin/export/excel', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error('Failed to export Excel');
    }
  },

  getPdfUrl(filename: string): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    return `${baseUrl.replace('/api', '')}/api/pdfs/${filename}`;
  },
};
