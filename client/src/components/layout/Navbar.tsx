import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NAV_LINKS, SITE_CONFIG } from '@/constants';
import { cn } from '@/utils/cn';


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
  const activeSection = useScrollSpy(sectionIds);


  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl border border-amber-200/70 bg-white/90 shadow-lg shadow-orange-950/5 backdrop-blur-xl dark:border-orange-300/10 dark:bg-gray-900/90 dark:shadow-black/20">
        <div className="flex items-center justify-between h-16 px-3 sm:px-5">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={`${SITE_CONFIG.name} - home`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 font-display font-bold text-white shadow-sm shadow-orange-900/20">
              RJ
            </span>
            <span className="hidden sm:inline font-display font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {SITE_CONFIG.name}
            </span>
          </a>


          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={cn(
                  'px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary-700 dark:text-accent-300 bg-primary-500/10 dark:bg-accent-500/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-accent-300 hover:bg-amber-50 dark:hover:bg-orange-950/30'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>


          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-2.5 text-primary-700 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-orange-300/15 dark:bg-orange-950/30 dark:text-accent-300 dark:hover:bg-orange-900/40"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden rounded-xl border border-amber-200/70 bg-amber-50/70 p-2.5 text-primary-700 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-orange-300/15 dark:bg-orange-950/30 dark:text-accent-300 dark:hover:bg-orange-900/40"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="xl:hidden overflow-hidden border-t border-amber-200/70 dark:border-orange-300/10"
          >
            <div className="grid grid-cols-2 gap-1.5 p-3 sm:grid-cols-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={cn(
                    'rounded-xl px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    activeSection === link.href.replace('#', '')
                      ? 'text-primary-700 bg-primary-500/10 dark:text-accent-300 dark:bg-accent-500/10'
                      : 'text-gray-700 hover:bg-amber-50 dark:text-gray-300 dark:hover:bg-orange-950/30'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
