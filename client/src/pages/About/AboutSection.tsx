import { motion } from 'framer-motion';
import { Briefcase, Code2 } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ABOUT_CONTENT } from '@/constants';

export function AboutSection() {
  return (
    <section id="about" className="section-padding section-tinted">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {ABOUT_CONTENT.intro}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {ABOUT_CONTENT.summary}
            </p>

            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Role</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{ABOUT_CONTENT.currentRole}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code2 className="w-5 h-5 text-accent-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {ABOUT_CONTENT.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm bg-primary-500/10 text-primary-600 dark:text-primary-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
