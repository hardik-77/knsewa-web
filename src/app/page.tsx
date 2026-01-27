import { getHomePage } from "@/data/adapters/content.adapter";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { NewsInsightsSection } from "@/components/sections/NewsInsightsSection";
import { SpecializationsSection } from "@/components/sections/SpecializationsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TwoColumnSection } from "@/components/sections/TwoColumnSection";
import { CultureSection } from "@/components/sections/CultureSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  const content = getHomePage();

  return (
    <>
      {/* 1. Hero Section (video support) */}
      <HeroSection content={content.hero} />

      {/* 2. Stats Section */}
      <StatsSection stats={content.stats} />

      {/* 4. News & Insights (pinned section) */}
      <NewsInsightsSection articles={content.news} />

      {/* 5. Specializations (horizontal scroll) */}
      <SpecializationsSection specializations={content.specializations} />

      {/* 6. Services Section */}
      <ServicesSection
        headline={content.services.headline}
        description={content.services.description}
        services={content.services.items}
      />

      {/* 6. Featured Projects */}
      <ProjectsSection
        headline={content.featuredProjects.headline}
        categories={content.featuredProjects.categories}
        projects={content.featuredProjects.projects}
        limit={8}
      />

      {/* 7. Location / Coverage (parallax) */}
      <TwoColumnSection content={content.coverage} />

      {/* 8. Culture Slider */}
      <CultureSection commitments={content.culture} />

      {/* 9. Careers Section (parallax) */}
      <CareersSection content={content.careers} />

      {/* 10. Final CTA */}
      <CTASection content={content.cta} />
    </>
  );
}
