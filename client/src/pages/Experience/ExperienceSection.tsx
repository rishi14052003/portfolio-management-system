import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { EXPERIENCES } from '@/constants';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Experience" subtitle="My professional journey" />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 md:-translate-x-1/2" />

          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 md:-translate-x-1/2 z-10" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 text-left"
                >
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mt-1 flex items-center gap-2 md:justify-start">
                    <Building2 className="w-5 h-5 text-primary-500 shrink-0" />
                    {exp.role}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{exp.company}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((item) => (
                      <li key={item} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-primary-500 mt-1.5 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
