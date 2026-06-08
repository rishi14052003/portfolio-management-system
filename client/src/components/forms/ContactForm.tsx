import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { contactSchema, type ContactFormValues } from '@/validations/contactSchema';
import { contactService } from '@/services/contactService';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [purpose, setPurpose] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const selectedPurpose = watch('purpose') || purpose;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await contactService.submit(data);
      const pdfUrl = response.pdf_url.startsWith('http')
        ? response.pdf_url
        : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}${response.pdf_url}`;

      window.open(pdfUrl, '_blank');
      toast.success('Thank you! Your submission PDF has been generated and sent to your email.');
      reset();
      setPurpose('');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to submit form. Please try again.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card p-6 md:p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="full_name"
          label="Full Name"
          placeholder="John Doe"
          error={errors.full_name?.message}
          {...register('full_name')}
        />
        <Input
          id="phone"
          label="Phone Number"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          id="purpose"
          label="Purpose of Reaching Out *"
          placeholder="Select a purpose"
          error={errors.purpose?.message}
          options={[
            { value: 'Job Opportunity', label: 'Job Opportunity' },
            { value: 'Freelance Project', label: 'Freelance Project' },
            { value: 'Collaboration', label: 'Collaboration' },
            { value: 'Just Saying Hi', label: 'Just Saying Hi' },
          ]}
          {...register('purpose')}
        />
        <Input
          id="company"
          label="Company or Organization"
          placeholder="Your Company Name"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      {selectedPurpose === 'Freelance Project' && (
        <Select
          id="budget"
          label="Budget Range *"
          placeholder="Select your budget range"
          error={errors.budget?.message}
          options={[
            { value: 'Less than $500', label: 'Less than $500' },
            { value: '$500–$2,000', label: '$500–$2,000' },
            { value: '$2,000–$5,000', label: '$2,000–$5,000' },
            { value: '$5,000–$10,000', label: '$5,000–$10,000' },
            { value: '$10,000+', label: '$10,000+' },
            { value: 'Not Specified', label: 'Not Specified' },
          ]}
          {...register('budget')}
        />
      )}

      <Select
        id="source"
        label="How did you find me? (optional)"
        placeholder="Select a source"
        error={errors.source?.message}
        options={[
          { value: 'LinkedIn', label: 'LinkedIn' },
          { value: 'GitHub', label: 'GitHub' },
          { value: 'Google Search', label: 'Google Search' },
          { value: 'Referral', label: 'Referral' },
          { value: 'Other', label: 'Other' },
        ]}
        {...register('source')}
      />

      <Textarea
        id="introduction"
        label="Brief Introduction About Yourself"
        placeholder="Tell me about yourself, your project, or how I can help you..."
        error={errors.introduction?.message}
        {...register('introduction')}
      />

      <Input
        id="pdf_filename"
        label="PDF Filename (optional)"
        placeholder="e.g., rishabh-jain-proposal (will auto-generate if left blank)"
        error={errors.pdf_filename?.message}
        {...register('pdf_filename')}
        maxLength={100}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
        <Send className="w-4 h-4" />
        Send Message
      </Button>
    </motion.form>
  );
}
