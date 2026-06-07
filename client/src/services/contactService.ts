import api from './api';
import type { ContactFormData, ContactResponse } from '@/types';

export const contactService = {
  async submit(data: ContactFormData): Promise<ContactResponse> {
    const response = await api.post<ContactResponse>('/contact', data);
    return response.data;
  },
};
