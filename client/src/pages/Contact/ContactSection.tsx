import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE_CONFIG } from '@/constants';

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Contact" subtitle="Let's build something amazing together" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Have a project in mind or want to discuss opportunities? Fill out the form and I&apos;ll get back to you with a personalized PDF summary.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: SITE_CONFIG.email },
                { icon: Phone, label: 'Phone', value: SITE_CONFIG.phone },
                { icon: MapPin, label: 'Location', value: SITE_CONFIG.location },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
