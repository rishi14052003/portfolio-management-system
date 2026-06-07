import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS, TYPING_WORDS, FLOATING_TECH } from '@/constants';
import { useTypingEffect } from '@/hooks/useTypingEffect';

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function HomeSection() {
  const typedText = useTypingEffect(TYPING_WORDS);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-950 animate-gradient-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />

      {FLOATING_TECH.map((tech, i) => {
        // Split into 2 rows: first 4 items in row 1, last 4 items in row 2
        const rowIndex = Math.floor(i / 4); // 0 or 1
        const positionInRow = i % 4; // 0, 1, 2, or 3
        
        // Row positions (vertical)
        const topPositions = ['18%', '50%'];
        const top = topPositions[rowIndex];
        
        // Horizontal spacing on far right side (no overlap with name)
        const rightPositions = ['5%', '18%', '31%', '44%'];
        const right = rightPositions[positionInRow];

        return (
          <motion.div
            key={tech}
            className="absolute hidden lg:block px-3 py-1.5 rounded-full glass text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap"
            style={{
              top,
              right,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {tech}
          </motion.div>
        );
      })}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-600 dark:text-primary-400 font-medium mb-4"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4"
          >
            <span className="gradient-text">{SITE_CONFIG.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-display text-gray-700 dark:text-gray-300 mb-2 h-10"
          >
            {typedText}
            <span className="animate-pulse text-primary-500">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
          >
            Building scalable web applications and intelligent automation workflows that drive real business impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <a href="#contact" className="btn-primary">
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#projects" className="btn-outline">
              View Projects
            </a>
            <a href={SITE_CONFIG.resumeUrl} download className="btn-outline">
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-primary-500/10 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:-translate-y-1"
                aria-label={link.name}
              >
                {socialIcons[link.icon]}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="block w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-500 relative">
          <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
