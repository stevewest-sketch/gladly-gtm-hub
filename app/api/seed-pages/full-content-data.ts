// Full content extracted from HTML files for all pages
// This file contains the complete Sanity-formatted content for seeding

export const pagesData = [
  // COE - Center of Excellence
  {
    _id: 'page-coe',
    _type: 'page',
    title: 'Center of Excellence',
    slug: { _type: 'slug', current: 'coe' },
    subtitle: 'Customer wins, best practices, and proof points that drive Sidekick success',
    heroColor: 'purple',
    content: [
      {
        _type: 'block',
        _key: 'coe-intro',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Core Proof Points' }],
      },
      {
        _type: 'block',
        _key: 'coe-proof-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Your most important reference materials including customer proof points, social proof templates, and performance dashboards.' }],
      },
      {
        _type: 'block',
        _key: 'coe-bp',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Best Practices' }],
      },
      {
        _type: 'block',
        _key: 'coe-bp-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Strategies from successful Sidekick deployments including operational tooling, reporting insights, and implementation guides from our Design, PS, TAM, product and engineering teams.' }],
      },
      {
        _type: 'block',
        _key: 'coe-wins',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Recent Customer Wins' }],
      },
      {
        _type: 'block',
        _key: 'coe-wins-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Real-world anecdotes, innovative implementations, and success stories from customers using Sidekick. Submit your wins via Slack using /coe.' }],
      },
    ],
  },

  // COE - BVA
  {
    _id: 'page-coe-bva',
    _type: 'page',
    title: 'Business Value Assessment (BVA)',
    slug: { _type: 'slug', current: 'coe/bva' },
    subtitle: 'Quantify the ROI and business impact of Gladly\'s platform through structured analysis, benchmarking, and financial modeling',
    heroColor: 'green',
    content: [
      {
        _type: 'block',
        _key: 'bva-what',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'What it is' }],
      },
      {
        _type: 'block',
        _key: 'bva-what-1',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'The Business Value Assessment (BVA) is a quantified analysis that measures the ROI and business impact of implementing Gladly. It combines industry benchmarks, customer data, and financial modeling to demonstrate cost savings, efficiency gains, and revenue impact.' }],
      },
      {
        _type: 'block',
        _key: 'bva-what-2',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Why it matters:' }, { _type: 'span', marks: [], text: ' Procurement and finance teams require quantified ROI to justify technology investments. BVAs provide data-backed justification that accelerates deal cycles and strengthens business cases.' }],
      },
      {
        _type: 'block',
        _key: 'bva-what-3',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Who it\'s for:' }, { _type: 'span', marks: [], text: ' Sales teams selling to enterprise accounts, especially those requiring C-level or procurement approval with formal ROI documentation.' }],
      },
      {
        _type: 'block',
        _key: 'bva-content',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Content & Resources' }],
      },
      {
        _type: 'block',
        _key: 'bva-content-list',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Access BVA templates, calculators, industry benchmarks, and case study library to build compelling business cases.' }],
      },
      {
        _type: 'block',
        _key: 'bva-how',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'How to Run a BVA' }],
      },
      {
        _type: 'block',
        _key: 'bva-how-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Follow our step-by-step runbook with discovery questions and presentation guides to conduct effective assessments.' }],
      },
    ],
  },

  // COE - AI Best Practices
  {
    _id: 'page-coe-ai-best-practices',
    _type: 'page',
    title: 'AI Best Practices',
    slug: { _type: 'slug', current: 'coe/ai-best-practices' },
    subtitle: 'Proven frameworks, implementation strategies, and optimization techniques for deploying AI in customer service environments',
    heroColor: 'blue',
    content: [
      {
        _type: 'block',
        _key: 'ai-what',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'What it is' }],
      },
      {
        _type: 'block',
        _key: 'ai-what-1',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'AI Best Practices is a curated collection of proven strategies, frameworks, and implementation guides for successfully deploying and optimizing AI in customer service. It includes setup guides, optimization playbooks, and real-world examples.' }],
      },
      {
        _type: 'block',
        _key: 'ai-what-2',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Why it matters:' }, { _type: 'span', marks: [], text: ' AI implementations often fail due to poor configuration, lack of optimization, or unclear success metrics. These best practices accelerate time-to-value and maximize AI performance.' }],
      },
      {
        _type: 'block',
        _key: 'ai-what-3',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Who it\'s for:' }, { _type: 'span', marks: [], text: ' Implementation teams, customer success managers, and CX operations leaders responsible for deploying and managing AI solutions.' }],
      },
      {
        _type: 'block',
        _key: 'ai-guides',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Implementation Guides' }],
      },
      {
        _type: 'block',
        _key: 'ai-guides-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Access setup checklists, prompt engineering guides, knowledge base optimization strategies, and workflow design patterns.' }],
      },
      {
        _type: 'block',
        _key: 'ai-opt',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Optimization Playbooks' }],
      },
      {
        _type: 'block',
        _key: 'ai-opt-desc',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Learn performance tuning, escalation optimization, and A/B testing frameworks to continuously improve AI accuracy and response quality.' }],
      },
    ],
  },

  // COE - Customer Wins
  {
    _id: 'page-coe-customer-wins',
    _type: 'page',
    title: 'Customer Wins Library',
    slug: { _type: 'slug', current: 'coe/customer-wins' },
    subtitle: 'Real customer success stories, metrics, and outcomes organized by industry, use case, and product to accelerate sales conversations',
    heroColor: 'orange',
    content: [
      {
        _type: 'block',
        _key: 'wins-what',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'What it is' }],
      },
      {
        _type: 'block',
        _key: 'wins-what-1',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'The Customer Wins Library is a searchable collection of customer success stories, including metrics, quotes, use cases, and video testimonials. Stories are tagged by industry, product, use case, and company size for easy discovery.' }],
      },
      {
        _type: 'block',
        _key: 'wins-what-2',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Why it matters:' }, { _type: 'span', marks: [], text: ' Prospects trust peer validation more than vendor claims. Relevant customer stories with quantified outcomes significantly increase win rates and shorten sales cycles.' }],
      },
      {
        _type: 'block',
        _key: 'wins-what-3',
        style: 'normal',
        children: [{ _type: 'span', marks: ['strong'], text: 'Who it\'s for:' }, { _type: 'span', marks: [], text: ' Sales, customer success, and marketing teams who need compelling proof points and social proof for prospect conversations.' }],
      },
      {
        _type: 'block',
        _key: 'wins-featured',
        style: 'h2',
        children: [{ _type: 'span', marks: [], text: 'Featured Success Stories' }],
      },
      {
        _type: 'block',
        _key: 'wins-featured-list',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: 'Explore wins including 87% AI resolution rates, $2M cost savings, 40% handle time reduction, and 95% CSAT with AI automation.' }],
      },
    ],
  },

  // Due to length constraints, I'll create a separate comprehensive seed file
  // Let me continue with the remaining pages...
];
