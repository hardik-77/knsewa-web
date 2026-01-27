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
      href: '/contact',
    },
    backgroundImage: '/images/hero-construction.jpg',
    backgroundVideo: '/videos/hero-bg.mp4',
  },

  ctaPopup: [
    {
      id: 'project',
      icon: '🏗️',
      title: 'A Project',
      description:
        'From commercial buildings to infrastructure, we bring expertise and innovation to every project. Let us help you build your vision.',
      image: '/images/projects/project-1.jpg',
      cta: {
        text: 'Start Your Project',
        href: '/contact',
      },
    },
    {
      id: 'career',
      icon: '👷',
      title: 'A Career',
      description:
        'Join our team of dedicated professionals. We offer opportunities to grow, learn, and make an impact in the construction industry.',
      image: '/images/projects/project-2.jpg',
      cta: {
        text: 'Explore Careers',
        href: '/careers',
      },
    },
    {
      id: 'future',
      icon: '🌱',
      title: 'A Better Future',
      description:
        'We are committed to sustainable construction practices that protect our environment and communities for generations to come.',
      image: '/images/projects/project-3.jpg',
      cta: {
        text: 'Our Sustainability',
        href: '/sustainability',
      },
    },
  ],

  stats: [
    { value: '30', label: 'Years of Excellence', suffix: '+' },
    { value: '500', label: 'Projects Completed', suffix: '+' },
    { value: '7', label: 'Provinces Served', suffix: '' },
    { value: '1000', label: 'Team Members', suffix: '+' },
  ],

  news: [
    {
      id: '1',
      title: 'Kathmandu Valley Infrastructure Development Project Breaks Ground',
      excerpt:
        'A major milestone as we begin construction on the largest infrastructure project in the valley, connecting key urban centers.',
      category: 'Infrastructure',
      image: '/images/projects/project-1.jpg',
      publishDate: '2024-01-15',
      slug: 'kathmandu-valley-infrastructure-project',
    },
    {
      id: '2',
      title: 'Sustainable Building Practices in Nepal',
      excerpt: 'How we are incorporating eco-friendly materials and methods in our construction projects.',
      category: 'Sustainability',
      image: '/images/projects/project-2.jpg',
      publishDate: '2024-01-10',
      slug: 'sustainable-building-practices',
    },
    {
      id: '3',
      title: 'New Safety Protocols for Construction Sites',
      excerpt: 'Implementing world-class safety standards across all our project sites.',
      category: 'Safety',
      image: '/images/projects/project-3.jpg',
      publishDate: '2024-01-05',
      slug: 'new-safety-protocols',
    },
    {
      id: '4',
      title: 'Community Development Through Construction',
      excerpt: 'Building schools and healthcare facilities in rural Nepal.',
      category: 'Community',
      image: '/images/projects/project-1.jpg',
      publishDate: '2023-12-28',
      slug: 'community-development',
    },
    {
      id: '5',
      title: 'Modern Construction Technology in Nepal',
      excerpt: 'Adopting cutting-edge technology to improve construction efficiency.',
      category: 'Technology',
      image: '/images/projects/project-2.jpg',
      publishDate: '2023-12-20',
      slug: 'modern-construction-technology',
    },
    {
      id: '6',
      title: 'Award for Excellence in Construction',
      excerpt: 'Recognized for our commitment to quality and innovation.',
      category: 'Awards',
      image: '/images/projects/project-3.jpg',
      publishDate: '2023-12-15',
      slug: 'excellence-award',
    },
    {
      id: '7',
      title: 'Expanding Our Presence in Eastern Nepal',
      excerpt: 'Opening new offices to better serve communities in the eastern region.',
      category: 'Company News',
      image: '/images/projects/project-1.jpg',
      publishDate: '2023-12-10',
      slug: 'eastern-nepal-expansion',
    },
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

  culture: [
    {
      id: 'safety',
      title: 'Safety First',
      description:
        'We prioritize the safety of our workers, partners, and communities above all else. Our comprehensive safety programs and rigorous protocols ensure that everyone returns home safely at the end of each day.',
      image: '/images/projects/project-1.jpg',
      stats: {
        value: '99.9%',
        label: 'Safety record across all projects',
      },
    },
    {
      id: 'sustainability',
      title: 'Environmental Stewardship',
      description:
        'We are committed to minimizing our environmental impact through sustainable building practices, efficient resource utilization, and innovative green construction technologies.',
      image: '/images/projects/project-2.jpg',
      stats: {
        value: '40%',
        label: 'Reduction in carbon footprint since 2020',
      },
    },
    {
      id: 'community',
      title: 'Community Impact',
      description:
        'Our projects are designed to strengthen the communities we serve. We create local jobs, support small businesses, and build infrastructure that improves quality of life for generations.',
      image: '/images/projects/project-3.jpg',
      stats: {
        value: '5,000+',
        label: 'Local jobs created annually',
      },
    },
    {
      id: 'innovation',
      title: 'Innovation & Technology',
      description:
        'We embrace cutting-edge construction technologies and methodologies to deliver projects more efficiently, with higher quality, and reduced environmental impact.',
      image: '/images/projects/project-1.jpg',
      stats: {
        value: '15+',
        label: 'New technologies implemented',
      },
    },
    {
      id: 'quality',
      title: 'Uncompromising Quality',
      description:
        'Every project we undertake reflects our commitment to excellence. We use the finest materials, employ skilled craftsmen, and maintain rigorous quality control standards.',
      image: '/images/projects/project-2.jpg',
      stats: {
        value: '30+',
        label: 'Years of building excellence',
      },
    },
    {
      id: 'integrity',
      title: 'Ethical Business Practices',
      description:
        'We conduct our business with the highest ethical standards, maintaining transparent relationships with clients, partners, and stakeholders.',
      image: '/images/projects/project-3.jpg',
    },
  ],

  careers: {
    title: 'Build Your Career With Us',
    subtitle: 'Join Our Team',
    description:
      'Be part of a team that is shaping the future of construction in Nepal. We offer competitive compensation, professional development opportunities, and a culture that values innovation and excellence.',
    image: '/images/projects/project-2.jpg',
    primaryCta: {
      text: 'View Open Positions',
      href: '/careers',
    },
    secondaryCta: {
      text: 'Learn About Our Culture',
      href: '/about#culture',
    },
    stats: [
      {
        value: '1,000+',
        label: 'Team Members',
      },
      {
        value: '50+',
        label: 'Open Positions',
      },
      {
        value: '7',
        label: 'Provinces',
      },
    ],
  },

  specializations: [
    {
      id: 'building',
      title: 'Building',
      tagline: 'Building the Future',
      description: 'We mold spaces that inspire, innovate, and endure.',
      image: '/images/projects/project-1.jpg',
      href: '/services/building',
    },
    {
      id: 'water-treatment',
      title: 'Water Treatment & Sanitation',
      tagline: 'Sanctuaries of Well-being',
      description: 'Elevating living conditions with advanced water treatment and sanitation.',
      image: '/images/projects/project-2.jpg',
      href: '/services/water-treatment',
    },
    {
      id: 'road-drain',
      title: 'Road and Drain',
      tagline: 'Pathways of Progress',
      description: 'Crafting roads and drains that lead societies towards advancement.',
      image: '/images/projects/project-3.jpg',
      href: '/services/road-drain',
    },
    {
      id: 'airport',
      title: 'Airport',
      tagline: 'Taking Flight',
      description: 'Building gateways to possibilities with airport construction.',
      image: '/images/projects/project-1.jpg',
      href: '/services/airport',
    },
    {
      id: 'irrigation',
      title: 'Irrigation',
      tagline: 'Nurturing Growth',
      description: 'Engineering irrigation solutions that nurture landscapes and livelihoods.',
      image: '/images/projects/project-2.jpg',
      href: '/services/irrigation',
    },
    {
      id: 'energy',
      title: 'Energy',
      tagline: 'Powering Progress',
      description: 'Energizing growth through cutting-edge energy solutions.',
      image: '/images/projects/project-3.jpg',
      href: '/services/energy',
    },
    {
      id: 'water-supply',
      title: 'Water Supply',
      tagline: 'Fluid Connections',
      description: 'Ensuring communities thrive with efficient water supply networks.',
      image: '/images/projects/project-1.jpg',
      href: '/services/water-supply',
    },
    {
      id: 'bridge-culvert',
      title: 'Bridge and Culvert',
      tagline: 'Bridges to Unity',
      description: 'Connecting hearts and places through bridges and culverts.',
      image: '/images/projects/project-2.jpg',
      href: '/services/bridge-culvert',
    },
  ],

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
