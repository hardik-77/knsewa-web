import { getAboutPage } from '@/data/adapters/content.adapter';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStorySection } from '@/components/sections/about/AboutStorySection';
import { AboutValuesSection } from '@/components/sections/about/AboutValuesSection';
import { AboutMilestonesSection } from '@/components/sections/about/AboutMilestonesSection';
import { AboutTeamSection } from '@/components/sections/about/AboutTeamSection';
import { CultureSection } from '@/components/sections/CultureSection';
import { CTASection } from '@/components/sections/CTASection';

export default function AboutPage() {
  const content = getAboutPage();

  return (
    <>
      <AboutHero content={content.hero} stats={content.stats} />
      <AboutStorySection content={content.introduction} />
      <AboutValuesSection
        label={content.values.label}
        headline={content.values.headline}
        values={content.values.items}
      />
      <AboutMilestonesSection
        label={content.timeline.label}
        headline={content.timeline.headline}
        items={content.timeline.items}
      />
      <AboutTeamSection
        label={content.team.label}
        headline={content.team.headline}
        members={content.team.members}
      />
      <CultureSection commitments={content.culture} />
      <CTASection content={content.cta} />
    </>
  );
}
