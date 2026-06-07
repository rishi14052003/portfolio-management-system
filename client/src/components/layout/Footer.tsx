import { Heart } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg gradient-text">{SITE_CONFIG.name}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{SITE_CONFIG.title}</p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                aria-label={link.name}
              >
                {iconMap[link.icon]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
            © {year} {SITE_CONFIG.name}. Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Flask
          </p>
        </div>
      </div>
    </footer>
  );
}
