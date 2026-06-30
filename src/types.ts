export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  technologies: string[];
  imageDesktop: string;
  imageMobile: string;
  imageTablet: string;
  liveUrl: string;
  caseStudy: {
    client: string;
    timeline: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
  accentColor: string;
}

export interface WhyReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric: string;
  metricLabel: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  accentColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
