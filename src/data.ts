import { Project, Service, WhyReason, ProcessStep, Testimonial, FAQItem } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Apex Estate",
    subtitle: "Luxury Real Estate & Architectural Showcase",
    description: "An immersive, cinematic property portal designed to capture premium leads. Features deep-scroll animations, interactive neighborhood mapping, and ultra-high-resolution virtual walkthrough showcases.",
    category: "Real Estate & Architecture",
    performanceScore: 98,
    seoScore: 100,
    accessibilityScore: 95,
    bestPracticesScore: 100,
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP"],
    imageDesktop: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageMobile: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    imageTablet: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://apex-luxury-estate.example.com",
    caseStudy: {
      client: "Apex Luxury Real Estate Group",
      timeline: "5 Weeks",
      challenge: "Apex needed a digital experience that matched the elite, multi-million dollar nature of their physical listings. Conventional templated real estate platforms lacked the narrative luxury feel and fast load speeds required to retain high-net-worth buyers on mobile.",
      solution: "We designed a bespoke cinematic showcase utilizing lightweight WebGL overlays, fluid video integrations, and staggered content revealing. Built with Next.js for sub-second page transitions and structured schema markup for elite search visibility.",
      results: [
        "42% increase in digital high-value lead conversions",
        "Average user session length increased from 1.2 minutes to 4.8 minutes",
        "98/100 Mobile Speed Index on Google Lighthouse"
      ]
    }
  },
  {
    id: "project-2",
    title: "Anjana Bakery",
    subtitle: "Homemade Delights & Premium Storefront",
    description: "A premium bakery website designed to showcase handcrafted products, simplify customer ordering, and create a warm, trustworthy online presence.",
    category: "Food & Beverage",
    performanceScore: 99,
    seoScore: 100,
    accessibilityScore: 98,
    bestPracticesScore: 100,
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    imageDesktop: "/Screenshot 2026-06-28 231300.png",
    imageMobile: "/Screenshot 2026-06-28 231344.png",
    imageTablet: "/Screenshot 2026-06-28 231321.png",
    liveUrl: "https://hommadedelight.netlify.app/",
    caseStudy: {
      client: "Anjana Bakery — Homemade Delights",
      timeline: "3 Weeks",
      challenge: "Anjana Bakery needed a premium online storefront to showcase their artisanal handcrafted treats and simplify their pre-ordering workflow. Their physical store was highly popular, but they lacked a digital presence that conveyed the warmth, craftsmanship, and trustworthy quality of their homemade recipes.",
      solution: "We engineered a clean, visually warm responsive storefront with elegant typography, structured product collections, and an intuitive direct-to-WhatsApp ordering flow. Built with React and optimized with Tailwind CSS for sub-second loading speeds on mobile devices.",
      results: [
        "54% increase in online pre-order volume within 30 days",
        "Average mobile visitor engagement time increased to 3.5 minutes",
        "99/100 Mobile Speed Index on Google Lighthouse audits"
      ]
    }
  },
  {
    id: "project-3",
    title: "Nouveau Space",
    subtitle: "High-End Interior Design & Interactive Portfolio",
    description: "A visually gorgeous, asymmetrical grid portfolio designed for a premier interior design house. Uses creative image masking, smooth parallax transitions, and an elegant serif aesthetic.",
    category: "Design & Interior",
    performanceScore: 96,
    seoScore: 100,
    accessibilityScore: 94,
    bestPracticesScore: 100,
    technologies: ["React", "Vite", "Tailwind CSS", "Motion", "Canvas Particle Layer"],
    imageDesktop: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    imageMobile: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80",
    imageTablet: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://nouveau-space-design.example.com",
    caseStudy: {
      client: "Nouveau Interior Architects",
      timeline: "4 Weeks",
      challenge: "Nouveau wanted to break away from standard boxy portfolio templates and showcase their physical interior texture and lighting details on the web, without compromising mobile performance and SEO page speeds.",
      solution: "Built an elegant, narrative-style scroll experience using advanced WebGL texture preloading, CSS mask techniques, and responsive fluid grids. Every image is optimized on-the-fly and lazily rendered to keep first-paint latency under 400ms.",
      results: [
        "85% increase in high-tier commercial interior consultation bookings",
        "Winner of Regional Design Spotlight showcase",
        "Page weight optimized down by 72% compared to previous portfolio"
      ]
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: "service-1",
    title: "Business Websites",
    description: "Polished, strategic web presences designed to establish authority, present services, and convert cold prospects into high-intent inbound inquiries.",
    iconName: "Briefcase",
    features: ["Strategic CTA Funnels", "CMS Integration", "Automated Forms", "Interactive Analytics"],
    badge: "Most Requested",
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: "service-2",
    title: "Restaurant Websites",
    description: "Sensory-rich visual menus, table reservation engines, and localized SEO setups that turn online casual browsers into real physical dining guests.",
    iconName: "Utensils",
    features: ["Digital Interactive Menus", "Reservation Engines", "Local Google Map SEO", "Review Badges"],
    accentColor: "from-amber-500 to-orange-600"
  },
  {
    id: "service-3",
    title: "Clinic Websites",
    description: "Secure, highly compliant, and reassuring portals that streamline patient intake, display medical credentials, and manage consultation bookings.",
    iconName: "Stethoscope",
    features: ["HIPAA-friendly Scheduling", "Practitioner Bios", "Intake Form Hub", "Accessibility Verified"],
    badge: "Highly Secure",
    accentColor: "from-teal-500 to-emerald-600"
  },
  {
    id: "service-4",
    title: "Tuition & School Websites",
    description: "Accessible learning hubs for private coaches, tuition centers, or schools to post courses, handle student registrations, and display success metrics.",
    iconName: "GraduationCap",
    features: ["Course Curriculum Grids", "Enrollment Portals", "Student Success Timelines", "Resource Downloads"],
    accentColor: "from-purple-500 to-pink-600"
  },
  {
    id: "service-5",
    title: "Interior Design Websites",
    description: "Immersive visual narrative portfolios using full-width typography, editorial layouts, and texture detail focuses to capture creative brilliance.",
    iconName: "Compass",
    features: ["Asymmetrical Image Grids", "Parallax Scroll Story", "Client Mood Boards", "Visual Lead Magnets"],
    accentColor: "from-rose-500 to-red-600"
  },
  {
    id: "service-6",
    title: "Landing Pages",
    description: "Laser-focused, ultra-optimized single-purpose pipelines designed to convert paid advertising campaigns with zero leaks or friction points.",
    iconName: "Zap",
    features: ["Sub-500ms Loading Speed", "Dynamic Text Replacement", "Clear A/B Heatmap Layouts", "Form & Calendar Integrations"],
    badge: "High Conversion",
    accentColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "service-7",
    title: "Portfolio Websites",
    description: "Bespoke digital business cards for executives, artists, and creators looking to curate their career history with unforgettable animations.",
    iconName: "User",
    features: ["Bento Grid Layouts", "Custom Micro-interactions", "Interactive Resume Timelines", "Social Aggregation"],
    accentColor: "from-indigo-500 to-violet-600"
  },
  {
    id: "service-8",
    title: "Website Redesign",
    description: "Complete strategic visual and structural overhauls that retain your hard-earned SEO value while modernizing the brand for today's market.",
    iconName: "RefreshCw",
    features: ["SEO Value Migration", "Brand Identity Match", "Performance Boost Guarantee", "Refined Copywriting"],
    accentColor: "from-sky-500 to-indigo-600"
  },
  {
    id: "service-9",
    title: "Website Maintenance",
    description: "Proactive security hardening, regular backup routines, continuous speed optimizations, and priority content adjustments on demand.",
    iconName: "ShieldCheck",
    features: ["24/7 Security Monitoring", "Weekly Cloud Backups", "Core Web Vital Audits", "Dedicated Support Hour Allocation"],
    accentColor: "from-blue-600 to-purple-600"
  }
];

export const WHY_CHOOSE_US: WhyReason[] = [
  {
    id: "why-1",
    title: "Premium Bespoke Design",
    description: "We are strictly anti-templates. Every pixel, layout, and hover animation is custom-engineered to make your business look like an industry-leading authority.",
    iconName: "Sparkles",
    metric: "100%",
    metricLabel: "Bespoke Work"
  },
  {
    id: "why-2",
    title: "Lightning Fast Performance",
    description: "A 1-second delay can drop conversions by 20%. We program clean, modular code that consistently scores 90+ in Google Lighthouse tests, securing more leads.",
    iconName: "Gauge",
    metric: "90+",
    metricLabel: "Lighthouse Score"
  },
  {
    id: "why-3",
    title: "Mobile Responsive by Nature",
    description: "Over 60% of your visitors are browsing on mobile devices. We build fluid, touch-optimized mobile layouts first, guaranteeing flawless usability across all screen sizes.",
    iconName: "Smartphone",
    metric: "62%",
    metricLabel: "Web Traffic Ready"
  },
  {
    id: "why-4",
    title: "Search Engine Optimization Ready",
    description: "A beautiful website is useless if no one finds it. We bake schema markup, semantic HTML, optimal title hierarchies, and meta tags directly into the core foundation.",
    iconName: "TrendingUp",
    metric: "#1",
    metricLabel: "Google Framework"
  },
  {
    id: "why-5",
    title: "Affordable Transparency",
    description: "Enterprise-grade design without the typical agency overhead. You get premium consulting, clear milestone breakdowns, and no hidden server or maintenance fees.",
    iconName: "DollarSign",
    metric: "0",
    metricLabel: "Hidden Fees"
  },
  {
    id: "why-6",
    title: "Secure Cloud Hosting",
    description: "Deployment on world-class global CDN edge servers (Vercel/AWS Cloudflare) featuring automatic SSL, zero-downtime redundancy, and built-in DDoS shields.",
    iconName: "Shield",
    metric: "99.99%",
    metricLabel: "Uptime SLA"
  },
  {
    id: "why-7",
    title: "Ongoing Support & Advisory",
    description: "We do not launch and disappear. Every client gains a reliable, long-term technical partner ready to handle scale, content changes, and strategic advisory.",
    iconName: "HeartHandshake",
    metric: "24/7",
    metricLabel: "Strategic Support"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description: "We start with an in-depth conversation. We research your industry, unpack your business targets, define your ideal visitor's mindset, and align on clear aesthetic and functional goals.",
    deliverables: ["Target Audience Profiles", "Strategic Site Structure Map", "Mood Board and Creative Brief"],
    accentColor: "from-blue-500 to-cyan-400"
  },
  {
    step: "02",
    title: "Research",
    subtitle: "Competitor & Market Analysis",
    description: "We analyze top competitors in your local or global market, identifying design gaps we can exploit to ensure your brand stands out as the premium option.",
    deliverables: ["Competitor Gap Analysis", "Keyword Search Opportunity Map", "Conversion Funnel Wireframes"],
    accentColor: "from-indigo-500 to-purple-400"
  },
  {
    step: "03",
    title: "Design",
    subtitle: "High-Fidelity Visual Prototypes",
    description: "No generic layout blocks. We engineer custom high-fidelity homepage and sub-page concepts matching your visual goals, complete with proposed scroll interactions and layout states.",
    deliverables: ["Interactive Figma Prototypes", "Custom Vector UI Assets", "Typography & Color Palette Guide"],
    accentColor: "from-purple-500 to-pink-400"
  },
  {
    step: "04",
    title: "Development",
    subtitle: "Pixel-Perfect Technical Assembly",
    description: "We translate approved designs into premium, semantic code. We build ultra-responsive components, fine-tune animations for sub-millisecond smoothness, and configure clean custom CMS hubs.",
    deliverables: ["Performance-optimized Code", "Clean Responsive Layout", "Custom Admin Management Panel"],
    accentColor: "from-pink-500 to-rose-400"
  },
  {
    step: "05",
    title: "Testing",
    subtitle: "Rigorous Quality Assurance",
    description: "We run extensive audits: cross-browser functionality tests, dark-mode/light-mode checking, form validations, search engine structural schema setup, and performance bottlenecks mapping.",
    deliverables: ["Cross-Device Compatibility Report", "100-Score Accessibility Audit", "Core Web Vital Optimization Report"],
    accentColor: "from-rose-500 to-amber-400"
  },
  {
    step: "06",
    title: "Launch",
    subtitle: "Deployment & Propagation",
    description: "We execute clean domain integration, configure global CDN caching rules, submit site maps directly to Google Search Console, and hand over the live keys.",
    deliverables: ["Production Edge Deployment", "SSL Security Certificate", "Google Analytics & Search Console Hook"],
    accentColor: "from-emerald-500 to-teal-400"
  },
  {
    step: "07",
    title: "Support",
    subtitle: "Continuous Optimization",
    description: "We stay in your corner. We handle regular database updates, perform proactive speed tune-ups, monitor analytics for traffic gains, and handle design changes as your company scales.",
    deliverables: ["Monthly Safety Backups", "Technical Consulting Allocation", "Priority Support Desk Access"],
    accentColor: "from-teal-500 to-blue-400"
  }
];

export const TECHNOLOGIES = [
  { name: "HTML", category: "Core", iconType: "html" },
  { name: "CSS", category: "Core", iconType: "css" },
  { name: "JavaScript", category: "Core", iconType: "js" },
  { name: "React", category: "Framework", iconType: "react" },
  { name: "Next.js", category: "Framework", iconType: "nextjs" },
  { name: "Tailwind CSS", category: "Styling", iconType: "tailwind" },
  { name: "Node.js", category: "Backend", iconType: "nodejs" },
  { name: "Three.js", category: "Graphics", iconType: "threejs" },
  { name: "GSAP", category: "Animation", iconType: "gsap" },
  { name: "Framer Motion", category: "Animation", iconType: "motion" },
  { name: "GitHub", category: "Workflow", iconType: "github" },
  { name: "Vercel", category: "Hosting", iconType: "vercel" },
  { name: "Netlify", category: "Hosting", iconType: "netlify" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. Rajesh K.",
    role: "Medical Director",
    company: "CareFirst Specialized Clinic",
    review: "Adithyadev completely revolutionized our online presence. Our previous site was extremely slow and difficult for senior patients to navigate. The new, highly accessible platform is fast, clean, and has reduced booking friction significantly. Patients frequently praise the simplicity of booking their appointments now.",
    rating: 5,
    category: "Healthcare"
  },
  {
    id: "testimonial-2",
    name: "Meera Sen",
    role: "Chief Architect",
    company: "Sen & Partners Design Studio",
    review: "As design professionals, we are extremely detail-oriented and picky. Adithyadev matched our aesthetic intent perfectly. The beautiful layout, staggered animations, and fluid transitions make our work feel unbelievably high-end on screen. The performance remains flawless even with huge images.",
    rating: 5,
    category: "Interior Design"
  },
  {
    id: "testimonial-3",
    name: "Sandeep S.",
    role: "Managing Partner",
    company: "Capital Properties Group",
    review: "We commissioned a bespoke landing page project to power our premium commercial ad campaigns. The results were instantaneous: our lead conversion rates skyrocketed from 2.4% to a solid 6.1%. Adithyadev understands both aesthetic elegance and core growth mechanics. Working with him is an absolute pleasure.",
    rating: 5,
    category: "Real Estate"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How long does a typical custom website design and build take?",
    answer: "A standard custom business website takes between 4 to 6 weeks from kick-off to official deployment. Simple, high-focus single landing pages can be completed in 1 to 2 weeks, while highly complex bespoke platforms with custom integrations might take up to 8 weeks. We divide the timeline into explicit, transparent phases so you always know where we are.",
    category: "Process"
  },
  {
    id: "faq-2",
    question: "Do you use WordPress templates or ready-made themes?",
    answer: "Absolutely not. We believe pre-made templates look generic, perform poorly, and carry heavy technical debt that hurts SEO and load times. Every website we build is coded custom from scratch using modern frameworks (React, Next.js, and Tailwind CSS). This ensures your site is unique, runs incredibly fast, and can be easily customized to fit your evolving business goals.",
    category: "Development"
  },
  {
    id: "faq-3",
    question: "What does the 'Free Homepage Design Preview' offer entail?",
    answer: "We are confident in our ability to build a beautiful digital presence for you. To prove this, we offer a risk-free homepage mockup concept matching your branding. You can submit details about your business via our form, and we'll engineer a high-fidelity visual preview of how your new homepage would look and function. If you love it, we can partner to build it. If you choose not to proceed, you owe absolutely nothing.",
    category: "Offer"
  },
  {
    id: "faq-4",
    question: "Are your websites optimized for SEO and Google search visibility?",
    answer: "Yes, SEO is built directly into our baseline development standards, not sold as an afterthought. We implement proper semantic HTML structure, structure meta tags, write custom JSON-LD schema markup, optimize image compression, and ensure lightning-fast server load speeds. This gives Google a perfectly optimized index to rank, helping your business appear higher in local and global searches.",
    category: "Marketing"
  },
  {
    id: "faq-5",
    question: "Can I easily update content myself after the website is launched?",
    answer: "Yes! We can integrate a lightweight, intuitive headless Content Management System (CMS) such as Sanity, Contentful, or a custom structured JSON hub that allows you or your staff to add blog posts, update doctor rosters, change menus, or adjust real estate properties in seconds, with absolutely zero technical skills or code touch needed.",
    category: "Product"
  },
  {
    id: "faq-6",
    question: "Do you offer post-launch technical support and maintenance?",
    answer: "Yes, we offer ongoing technical advisory and maintenance plans to keep your digital asset safe, updated, and fast. This includes weekly cloud-hosted backups, real-time security monitoring, monthly performance tune-ups, and immediate adjustments to your copy or imagery whenever you need them.",
    category: "Support"
  }
];
