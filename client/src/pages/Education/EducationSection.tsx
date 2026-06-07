import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { EDUCATION } from '@/constants';

export function EducationSection() {
  return (
    <section id="education" className="section-padding bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Education" subtitle="Academic background" />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />

          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-16 pb-12 last:pb-0"
            >
              <div className="absolute left-4 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {edu.year}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{edu.institution}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-accent-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    CGPA: <strong>{edu.cgpa}</strong>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
