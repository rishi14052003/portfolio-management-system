import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
