import type { Metadata } from 'next';
import { getContactPage } from '@/data/adapters/content.adapter';
import { PageHero } from '@/components/sections/PageHero';
import { ContactInfoSection } from '@/components/sections/contact/ContactInfoSection';
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection';
import { CTASection } from '@/components/sections/CTASection';

export function generateMetadata(): Metadata {
  const { seo } = getContactPage();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default function ContactPage() {
  const content = getContactPage();
  const hq = content.offices.find((o) => o.isHeadquarters) ?? content.offices[0];

  return (
    <>
      <PageHero content={content.hero} />
      <ContactInfoSection
        label={content.info.label}
        headline={content.info.headline}
        description={content.info.description}
        offices={content.offices}
      />
      <ContactFormSection
        label={content.form.label}
        headline={content.form.headline}
        description={content.form.description}
        projectTypes={content.form.projectTypes}
        recipientEmail={hq.email}
      />
      <CTASection content={content.cta} />
    </>
  );
}
