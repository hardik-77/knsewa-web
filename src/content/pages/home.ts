import { HomePageContent } from '@/types/content';

export const homePageContent: HomePageContent = {
  seo: {
    title: 'Khushbu Nirman Sewa | Premium Construction Contractor in Nepal',
    description: 'Khushbu Nirman Sewa is a leading construction contractor in Biratnagar, Nepal with 30 years of experience in commercial and government construction projects.',
    keywords: ['construction company nepal', 'biratnagar contractor', 'commercial construction', 'government construction'],
  },

  hero: {
    headline: 'Building Nepal\'s',
    highlightedText: 'Future',
    cta: {
      text: 'What do you want to build?',
      href: '/request-site-visit',
    },
    backgroundImage: '/images/hero-construction.jpg',
  },

  stats: [
    { value: '30', label: 'Years of Excellence', suffix: '+' },
    { value: '500', label: 'Projects Completed', suffix: '+' },
    { value: '7', label: 'Provinces Served', suffix: '' },
    { value: '1000', label: 'Team Members', suffix: '+' },
  ],

  services: {
    headline: 'Our Expertise',
    description: 'We bring technical knowledge, decades of experience, and unwavering commitment to every project. Our expertise spans the full construction lifecycle.',
    items: [
      {
        id: 'commercial',
        index: '01',
        title: 'Commercial Construction',
        shortTitle: 'Commercial',
        description: 'From corporate headquarters to retail complexes, we deliver commercial spaces that combine functionality with architectural excellence. Our portfolio includes office buildings, shopping centers, and mixed-use developments.',
        image: '/images/services/commercial.jpg',
        href: '/services#commercial',
      },
      {
        id: 'government',
        index: '02',
        title: 'Government & Institutional',
        shortTitle: 'Government',
        description: 'Trusted partner for government and institutional projects. We have successfully delivered schools, hospitals, administrative buildings, and public infrastructure that serve communities across Nepal.',
        image: '/images/services/government.jpg',
        href: '/services#government',
      },
      {
        id: 'industrial',
        index: '03',
        title: 'Industrial Facilities',
        shortTitle: 'Industrial',
        description: 'Purpose-built industrial facilities designed for efficiency, safety, and long-term operational excellence. We specialize in manufacturing plants, warehouses, and logistics centers.',
        image: '/images/services/industrial.jpg',
        href: '/services#industrial',
      },
      {
        id: 'infrastructure',
        index: '04',
        title: 'Infrastructure Development',
        shortTitle: 'Infrastructure',
        description: 'Essential infrastructure that connects communities and drives economic growth. Our expertise includes roads, bridges, water systems, and urban development projects.',
        image: '/images/services/infrastructure.jpg',
        href: '/services#infrastructure',
      },
    ],
  },

  featuredProjects: {
    headline: 'Featured Projects',
    projects: [
      {
        id: 'project-1',
        slug: 'biratnagar-city-center',
        title: 'Biratnagar City Center',
        clientType: 'commercial',
        location: 'Biratnagar',
        scope: 'Commercial Complex',
        highlights: ['50,000 sq ft', 'LEED Certified', 'Modern Design'],
        images: {
          thumbnail: '/images/projects/city-center-thumb.jpg',
          featured: '/images/projects/city-center-featured.jpg',
          gallery: [],
        },
        seo: {
          title: 'Biratnagar City Center | KNS Projects',
          description: 'A landmark commercial complex in the heart of Biratnagar.',
        },
      },
      {
        id: 'project-2',
        slug: 'province-hospital',
        title: 'Province General Hospital',
        clientType: 'government',
        location: 'Dharan',
        scope: 'Healthcare Facility',
        highlights: ['200 Beds', 'Emergency Wing', 'Modern Equipment'],
        images: {
          thumbnail: '/images/projects/hospital-thumb.jpg',
          featured: '/images/projects/hospital-featured.jpg',
          gallery: [],
        },
        seo: {
          title: 'Province General Hospital | KNS Projects',
          description: 'State-of-the-art healthcare facility serving the eastern region.',
        },
      },
      {
        id: 'project-3',
        slug: 'industrial-park',
        title: 'Eastern Industrial Park',
        clientType: 'commercial',
        location: 'Biratnagar',
        scope: 'Industrial Complex',
        highlights: ['100 Acres', 'Modern Infrastructure', 'Sustainable Design'],
        images: {
          thumbnail: '/images/projects/industrial-thumb.jpg',
          featured: '/images/projects/industrial-featured.jpg',
          gallery: [],
        },
        seo: {
          title: 'Eastern Industrial Park | KNS Projects',
          description: 'A modern industrial complex driving economic growth in eastern Nepal.',
        },
      },
    ],
  },

  coverage: {
    label: 'Biratnagar',
    headline: 'Our Work In Your Local Community',
    description: 'Together we grow communities, strengthen economies, and improve lives. Headquartered in Biratnagar, we have delivered landmark projects across all seven provinces of Nepal.',
    image: '/images/coverage-nepal.jpg',
    imageAlt: 'Construction project in Nepal',
    cta: {
      text: 'Meet the Biratnagar Team',
      href: '/coverage/biratnagar',
    },
    secondaryLink: {
      text: 'Choose another location',
      href: '/coverage',
    },
    imagePosition: 'left',
  },

  whyChooseUs: {
    label: 'Why Choose KNS',
    headline: 'Three Decades of Building Trust',
    description: 'Since 1995, we have been the preferred construction partner for businesses and government institutions across Nepal. Our commitment to quality, safety, and timely delivery has earned us the trust of hundreds of clients. At KNS, your project is more than a contract—it\'s our reputation.',
    image: '/images/team-construction.jpg',
    imageAlt: 'KNS construction team at work',
    cta: {
      text: 'Learn About Our Legacy',
      href: '/about',
    },
    imagePosition: 'right',
  },

  cta: {
    label: 'Start Your Project',
    headline: 'Ready to Build?',
    description: 'Whether you\'re planning a commercial development, government project, or industrial facility, our team is ready to bring your vision to life.',
    primaryCTA: {
      text: 'Request Site Visit',
      href: '/request-site-visit',
    },
    secondaryCTA: {
      text: 'Request Quote',
      href: '/request-quote',
    },
  },
};
