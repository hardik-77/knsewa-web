import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  getProjectsPage,
} from '@/data/adapters/content.adapter';
import { ProjectHero } from '@/components/sections/projects/ProjectHero';
import { ProjectInfoBar } from '@/components/sections/projects/ProjectInfoBar';
import { ProjectOverview } from '@/components/sections/projects/ProjectOverview';
import { ProjectGallery } from '@/components/sections/projects/ProjectGallery';
import { ProjectNav } from '@/components/sections/projects/ProjectNav';
import { RelatedSection } from '@/components/sections/RelatedSection';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.images.featured],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const related = getRelatedProjects(project, 3);
  const { cta } = getProjectsPage();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />
      <ProjectOverview project={project} />
      {project.images.gallery.length > 0 && (
        <ProjectGallery
          images={project.images.gallery}
          title={project.title}
        />
      )}
      {related.length > 0 && (
        <RelatedSection
          label="RELATED PROJECTS"
          headline="Similar Projects"
          items={related}
          type="projects"
          seeAllHref="/projects"
          seeAllText="View All Projects"
        />
      )}
      <ProjectNav prev={prevProject} next={nextProject} />
      <CTASection content={cta} />
    </>
  );
}
