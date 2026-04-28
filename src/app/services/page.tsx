import { getServicesPage } from '@/data/adapters/content.adapter';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { ServicesPhilosophy } from '@/components/sections/services/ServicesPhilosophy';
import { ServiceAccordion } from '@/components/sections/services/ServiceAccordion';
import { SpecializationsGrid } from '@/components/sections/services/SpecializationsGrid';
import { ApproachSection } from '@/components/sections/services/ApproachSection';
import { CapabilitiesGrid } from '@/components/sections/services/CapabilitiesGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function ServicesPage() {
  const content = getServicesPage();

  return (
    <>
      <ServicesHero content={content.hero} stats={content.stats} />
      <ServicesPhilosophy
        quote={content.philosophy.quote}
        description={content.philosophy.description}
      />
      <ServiceAccordion
        label={content.categories.label}
        headline={content.categories.headline}
        items={content.categories.items}
      />
      <SpecializationsGrid specializations={content.specializations} />
      <ApproachSection
        label={content.approach.label}
        headline={content.approach.headline}
        steps={content.approach.steps}
      />
      <CapabilitiesGrid
        label={content.capabilities.label}
        headline={content.capabilities.headline}
        items={content.capabilities.items}
      />
      <CTASection content={content.cta} />
    </>
  );
}
