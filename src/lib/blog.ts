export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "first-time-buyer-guide-uae",
    title: "First-Time Buyer Guide: Getting Your UAE Home Loan Approved",
    excerpt:
      "A practical roadmap for first-time buyers in the UAE, from pre-approval to handover.",
    category: "Guides",
    readTime: "6 min read",
    publishedAt: "2026-04-02",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1772461444/WhatsApp_Image_2026-03-02_at_7.23.22_PM_ryhhbi.jpg",
    content: [
      "Buying your first home in the UAE can feel complicated, but the process becomes much easier when you break it into steps.",
      "Start with pre-approval before viewing properties. This gives you a realistic budget and strengthens your negotiation position.",
      "Keep your documents ready early: passport, Emirates ID, visa, salary certificate, and recent bank statements.",
      "Compare multiple lenders. The right structure can lower your monthly payment and reduce overall borrowing cost.",
    ],
  },
  {
    slug: "self-employed-mortgages-uae",
    title: "Self-Employed Mortgages in the UAE: How to Improve Approval Odds",
    excerpt:
      "How business owners and freelancers can strengthen their profile for better mortgage terms.",
    category: "Tips",
    readTime: "5 min read",
    publishedAt: "2026-03-28",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163791/1920X1200--Documentation_foruhp.png",
    content: [
      "Self-employed applicants are approved every day, but banks need clearer income visibility.",
      "Clean statements, consistent inflow, and complete company documentation significantly improve lender confidence.",
      "Avoid large unexplained cash movements before application, and prepare concise explanations for irregular transactions.",
      "A well-structured file can be the difference between rejection and a competitive rate offer.",
    ],
  },
  {
    slug: "fixed-vs-variable-rates-uae",
    title: "Fixed vs Variable Mortgage Rates in Dubai: Which One Fits You?",
    excerpt:
      "A simple framework to choose between payment stability and rate flexibility.",
    category: "Rates",
    readTime: "4 min read",
    publishedAt: "2026-03-20",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163793/1920X1200--Bank-Review_pwkzog.png",
    content: [
      "Fixed rates provide predictability in monthly payments, which is valuable for budgeting.",
      "Variable rates can start lower, but future movements may increase your monthly cost.",
      "Many buyers choose a fixed period first, then reassess refinancing opportunities later.",
      "Your decision should match your risk tolerance, income stability, and long-term ownership plan.",
    ],
  },
  {
    slug: "dubai-property-market-outlook",
    title: "Dubai Property Market Outlook: What Buyers Should Watch",
    excerpt:
      "Key market signals that matter when timing your purchase and financing strategy.",
    category: "Market",
    readTime: "4 min read",
    publishedAt: "2026-03-12",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163787/1920X1200--Approval-_-Closing_qok373.png",
    content: [
      "Market conditions shift across areas and property types, so local data matters more than headlines.",
      "Track supply pipelines, rental demand, and financing costs together to get a clearer picture.",
      "Strong preparation lets you move fast on the right property without overpaying.",
    ],
  },
  {
    slug: "down-payment-strategies-uae",
    title: "Down Payment Strategies for UAE Home Buyers",
    excerpt:
      "Practical ways to plan your down payment while protecting cash flow.",
    category: "Savings",
    readTime: "3 min read",
    publishedAt: "2026-03-05",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/05_ahldhn.png",
    content: [
      "Your down payment affects both approval and loan pricing, so planning it early is critical.",
      "Build a dedicated purchase fund and avoid mixing it with short-term spending accounts.",
      "Keep emergency reserves separate so you stay financially stable after moving in.",
    ],
  },
  {
    slug: "when-to-refinance-your-mortgage",
    title: "When to Refinance Your UAE Mortgage",
    excerpt:
      "Signals that refinancing might reduce your cost and improve terms.",
    category: "Refinance",
    readTime: "4 min read",
    publishedAt: "2026-02-26",
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153538/03_xlgkvl.png",
    content: [
      "Refinancing can help when rates drop, your profile improves, or your fixed period is ending.",
      "Always compare savings against fees and break-even timing before switching.",
      "A refinancing review every 12 to 18 months helps ensure your mortgage stays competitive.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
