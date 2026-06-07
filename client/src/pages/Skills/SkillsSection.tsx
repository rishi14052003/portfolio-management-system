import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SKILL_CATEGORIES } from '@/constants';

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 group cursor-default"
            >
              <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${category.color} mb-4`} />
              <h3 className="text-xl font-display font-semibold mb-4 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover:bg-primary-500/10 transition-colors"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
