import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CERTIFICATIONS } from '@/constants';

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Certifications" subtitle="Professional credentials and training" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((certification, index) => (
            <motion.article
              key={certification.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <Award className="w-7 h-7 text-primary-500 shrink-0" />
                <div>
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{certification.issuer}</p>
                </div>
              </div>

              {certification.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {certification.description}
                </p>
              )}

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-5">
                <p><strong className="text-gray-800 dark:text-gray-200">Issued:</strong> {certification.date}</p>
                {certification.expirationDate && (
                  <p><strong className="text-gray-800 dark:text-gray-200">Expires:</strong> {certification.expirationDate}</p>
                )}
                {certification.programDates && (
                  <p><strong className="text-gray-800 dark:text-gray-200">Program:</strong> {certification.programDates}</p>
                )}
                {certification.duration && (
                  <p><strong className="text-gray-800 dark:text-gray-200">Duration:</strong> {certification.duration}</p>
                )}
                <p><strong className="text-gray-800 dark:text-gray-200">Status:</strong> {certification.status}</p>
                {certification.credentialId && (
                  <p className="break-all">
                    <strong className="text-gray-800 dark:text-gray-200">Credential ID:</strong> {certification.credentialId}
                  </p>
                )}
                {certification.registrationNumber && (
                  <p><strong className="text-gray-800 dark:text-gray-200">Registration No:</strong> {certification.registrationNumber}</p>
                )}
              </div>

              {certification.skills && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {certification.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {certification.credentialLink && (
                <a
                  href={certification.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
