import { z } from 'zod';

export const contactSchema = z.object({
  full_name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[+]?[\d\s\-()]{10,15}$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email address is too long'),
  introduction: z
    .string()
    .min(20, 'Introduction must be at least 20 characters')
    .max(1000, 'Introduction must be less than 1000 characters')
    .trim(),
  purpose: z
    .string()
    .min(1, 'Please select a purpose')
    .refine((val: string) => ['Job Opportunity', 'Freelance Project', 'Collaboration', 'Just Saying Hi'].includes(val), 'Invalid purpose selected'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .trim(),
  budget: z
    .string()
    .refine(
      (val: string) => !val || ['Less than $500', '$500–$2,000', '$2,000–$5,000', '$5,000+'].includes(val),
      'Invalid budget range selected'
    )
    .optional()
    .or(z.literal('')),
  source: z
    .string()
    .refine(
      (val: string) => !val || ['LinkedIn', 'GitHub', 'Google Search', 'Referral', 'Other'].includes(val),
      'Invalid source selected'
    )
    .optional()
    .or(z.literal('')),
  pdf_filename: z
    .string()
    .max(100, 'PDF filename must be less than 100 characters')
    .refine(
      (val: string) => !val || /^[a-zA-Z0-9_\s-]+$/.test(val),
      'PDF filename can only contain letters, numbers, spaces, hyphens, and underscores'
    )
    .optional()
    .or(z.literal('')),
}).refine(
  data => data.purpose !== 'Freelance Project' || data.budget,
  {
    message: 'Budget range is required for Freelance Projects',
    path: ['budget'],
  }
);

export type ContactFormValues = z.infer<typeof contactSchema>;
