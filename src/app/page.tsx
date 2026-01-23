import { getHomePage, getSiteSettings } from "@/data/adapters/content.adapter";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TwoColumnSection } from "@/components/sections/TwoColumnSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  const content = getHomePage();

  return (
    <>
      {/* Hero Section */}
      <HeroSection content={content.hero} />

      {/* Stats Section */}
      <StatsSection stats={content.stats} />

      {/* Services Section */}
      <ServicesSection
        headline={content.services.headline}
        description={content.services.description}
        services={content.services.items}
      />

      {/* Featured Projects */}
      <ProjectsSection
        headline={content.featuredProjects.headline}
        projects={content.featuredProjects.projects}
      />

      {/* Coverage Section */}
      <TwoColumnSection content={content.coverage} />

      {/* Why Choose Us */}
      <TwoColumnSection content={content.whyChooseUs} variant="dark" />

      {/* CTA Section */}
      <CTASection content={content.cta} />
    </>
  );
}
