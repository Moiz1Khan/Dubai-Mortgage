export const SITE_CONTENT_STORAGE_KEY = "creditlink-site-content-v1";

export const defaultSiteContent = {
  home: {
    heroTitle: "Get Your Dubai Mortgage Approved in 7 Days",
    heroSubtitle: "Even If 3 Banks Already Rejected You",
    heroDescription: "Get Pre-Approved in 24 Hours",
    comparisonTitle: "Tired of Being Treated Like Application #4,729?",
    comparisonSubtitle:
      "See why more buyers choose a human consultant over algorithms and call centers.",
    blogTitle: "Latest from our blog",
    blogSubtitle:
      "Expert insights on UAE mortgages, market trends, and home buying tips.",
  },
  residentialFinance: {
    heroTitle: "Residential Finance",
    processTitle: "THE PROCESS",
    ratesTitle: "Current Mortgage Rates in Dubai",
    eligibilityTitle: "Home Loan Eligibility Checklist",
  },
  commercialFinance: {
    heroTitle: "AED 2.1 Billion in UAE Commercial Property Financed",
    financingTypesTitle: "What Type of Commercial Financing Do You Need?",
    dscrTitle: "DSCR EXPLAINED",
    processTitle: "THE PROCESS (B2B REALITY)",
  },
  nonResidentFinance: {
    heroTitle: "3,847 People Bought Dubai Property While Living Abroad.",
    processTitle: "HOW IT WORKS",
    eligibilityTitle: "Exactly What You Need to Qualify",
    faqTitle: "Non-Resident Finance FAQs",
  },
  about: {
    heroTitle: "About Credit Link",
    howWeWorkTitle: "How We Work",
    byNumbersTitle: "By The Numbers",
    teamTitle: "Meet The Team",
  },
  faq: {
    heroTitle: "Frequently Asked Questions",
    heroSubtitle:
      "Find answers to common questions about mortgages, financing, and our services.",
  },
  contact: {
    heroTitle: "Get in Touch",
    heroSubtitle:
      "Have questions? We're here to help. Reach out and we'll get back to you within 2 hours.",
    mapHeading: "Find us",
    officeAddressLine1: "Office 1713, Grosvenor Business Tower, Barsha Heights,",
    officeAddressLine2: "Dubai, UAE",
    /** Full address for the embedded Google Map search. */
    mapQuery: "Office 1713, Grosvenor Business Tower, Barsha Heights, Dubai, UAE",
    supportEmail: "info@creditlink.ae",
    officeHoursLine1: "Monday to Friday: 9:00 AM – 6:00 PM",
    officeHoursLine2: "Saturday and Sunday: Closed",
  },
  footer: {
    brandName: "Credit Link",
    brandDescription:
      "Dubai's trusted mortgage advisory. We compare 15+ UAE lenders to get you the best rates.",
    primaryCta: "Talk to an Advisor",
    phone: "+971 58 537 8607",
    /** Digits only, country code included (e.g. 971585378607). Used by the floating WhatsApp button. */
    whatsappNumber: "971585378607",
    hours: "Mon–Fri: 9:00 AM – 6:00 PM · Sat–Sun: Closed",
    location: "Grosvenor Business Tower, Barsha Heights, Dubai, UAE",
  },
  blog: {
    heroTitle: "Credit Link Blog",
    heroSubtitle:
      "Insights on UAE mortgages, approval strategy, refinancing, and property trends.",
  },
} as const;

export type SiteContent = typeof defaultSiteContent;
