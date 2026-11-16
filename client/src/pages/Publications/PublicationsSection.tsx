import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PUBLICATIONS } from '@/constants';

export function PublicationsSection() {
  return (
    <section id="publications" className="section-padding section-tinted">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Publication & Research" subtitle="Research in visual speech recognition" />

        <div className="space-y-6">
          {PUBLICATIONS.map((publication, index) => (
            <motion.article
              key={publication.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
                {publication.venue}
              </p>
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                {publication.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {publication.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {publication.techStack.map((technology) => (
                  <span
                    key={technology}
                    className="px-2 py-1 text-xs rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-5">
                {publication.publicationLink && (
                  <a
                    href={publication.publicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    Read publication
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {publication.githubLink && (
                  <a
                    href={publication.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Github className="w-4 h-4" />
                    View code
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
