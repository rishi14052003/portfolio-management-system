export interface ContactFormData {
  full_name: string;
  phone: string;
  email: string;
  introduction: string;
  purpose: string;
  company: string;
  budget?: string;
  source?: string;
  pdf_filename?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  lead_id: string;
  pdf_url: string;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

export interface AdminProfile {
  username: string;
  role: string;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  introduction: string;
  pdf_filename: string;
  created_at: string;
  purpose?: string;
  company?: string;
  budget?: string;
  source?: string;
}

export interface AdminStats {
  total_leads: number;
  pdfs_generated: number;
  recent_leads: Lead[];
  latest_activity: ActivityItem[];
  leads_by_purpose: Record<string, number>;
  leads_by_source: Record<string, number>;
  leads_by_budget: Record<string, number>;
  daily_trend: Array<{ date: string; count: number }>;
}

export interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedLeads {
  leads: Lead[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
}

export interface Education {
  degree: string;
  institution: string;
  cgpa: string;
  year: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export type Theme = 'light' | 'dark';
