import { getInsightsPage, getAllInsightsArticles } from '@/data/adapters/content.adapter';
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { InsightsGrid } from '@/components/sections/insights/InsightsGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function InsightsPage() {
  const content = getInsightsPage();
  const articles = getAllInsightsArticles();

  return (
    <>
      <InsightsHero content={content.hero} />
      <InsightsGrid
        label={content.listing.label}
        headline={content.listing.headline}
        categories={content.listing.categories}
        articles={articles}
      />
      <CTASection content={content.cta} />
    </>
  );
}
