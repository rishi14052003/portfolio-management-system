import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomeSection } from '@/pages/Home/HomeSection';
import { AboutSection } from '@/pages/About/AboutSection';
import { SkillsSection } from '@/pages/Skills/SkillsSection';
import { ExperienceSection } from '@/pages/Experience/ExperienceSection';
import { ProjectsSection } from '@/pages/Projects/ProjectsSection';
import { EducationSection } from '@/pages/Education/EducationSection';
import { ContactSection } from '@/pages/Contact/ContactSection';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
