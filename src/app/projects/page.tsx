import { getProjectsPage } from '@/data/adapters/content.adapter';
import { ProjectsHero } from '@/components/sections/projects/ProjectsHero';
import { ProjectsShowcase } from '@/components/sections/projects/ProjectsShowcase';
import { ProjectsGrid } from '@/components/sections/projects/ProjectsGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function ProjectsPage() {
  const content = getProjectsPage();

  return (
    <>
      <ProjectsHero content={content.hero} stats={content.stats} />
      <ProjectsShowcase projects={content.projects} />
      <ProjectsGrid
        categories={content.categories}
        projects={content.projects}
      />
      <CTASection content={content.cta} />
    </>
  );
}
