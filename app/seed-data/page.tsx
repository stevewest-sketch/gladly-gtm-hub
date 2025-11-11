'use client';

import { useState } from 'react';
import { client } from '@/lib/sanity';

const homepageData = {
  _type: 'homepage',
  _id: 'homepage',
  heroTitle: 'The GTM Hub',
  heroSubtitle: 'Your central hub for selling, supporting, and growing with Gladly',
  searchPlaceholder: 'Search for battle cards, templates, demos, product info...',
  teamToolkitsTitle: 'Start with Your Role',
  teamToolkitsSubtitle: 'Everything you need, organized for your job',
  teamToolkits: [
    {
      emoji: '💼',
      title: 'Sales Toolkit',
      description: 'Demos, battle cards, plays, and sales materials',
      link: '/enablement/toolkits/sales',
      color: 'blue',
    },
    {
      emoji: '🎯',
      title: 'CSM Toolkit',
      description: 'QBRs, adoption, value tools, and renewal resources',
      link: '/enablement/toolkits/csm',
      color: 'purple',
    },
    {
      emoji: '🔧',
      title: 'SC Toolkit',
      description: 'Demo environments, technical docs, and POC materials',
      link: '/enablement/toolkits/success',
      color: 'green',
    },
    {
      emoji: '📣',
      title: 'Marketing Toolkit',
      description: 'Campaigns, content, templates, and brand assets',
      link: '/enablement/toolkits/marketing',
      color: 'orange',
    },
  ],
  quickTasksTitle: 'What do you need to do today?',
  quickTasks: [
    { emoji: '🎬', title: 'Prepare for Demo', link: '/enablement/demo' },
    { emoji: '📊', title: 'Run a QBR', link: 'https://docs.google.com/presentation/d/11EMqR6s3KOlnRafjzgITBmt4QyUFgvlC2zRxfvsmydU/edit' },
    { emoji: '⚔️', title: 'Handle Competitor', link: '/enablement/competitive' },
    { emoji: '💰', title: 'Build Business Case', link: '/enablement/bva' },
    { emoji: '🚀', title: 'Drive Adoption', link: '/coe' },
    { emoji: '🎓', title: 'Access Training', link: '/enablement/training' },
  ],
  productsTitle: 'Product Knowledge',
  productsSubtitle: 'Learn about our products and features',
  products: [
    { emoji: '🤖', title: 'Sidekick Standalone', link: '/product/sidekick-standalone' },
    { emoji: '📞', title: 'Sidekick Voice', link: '/product/sidekick-voice' },
    { emoji: '✉️', title: 'Sidekick Email', link: '/product/sidekick-email' },
    { emoji: '💵', title: 'Sidekick Sales', link: '/product/sidekick-sales' },
    { emoji: '🧠', title: 'Customer AI', link: '/product/customer-ai' },
    { emoji: '🗺️', title: 'Guides & Journeys', link: '/product/guides-journeys' },
    { emoji: '🔌', title: 'App Platform', link: '/product/app-platform' },
  ],
  whatsNewBadge: 'Oct 2025',
  whatsNew: [
    {
      date: 'OCTOBER 1, 2025',
      emoji: '📦',
      title: 'Conversation Reviewer Enhancements',
      description: "Improve visibility into Sidekick's response reasoning to help customers make targeted improvements.",
      links: [
        { text: 'Product Guide', url: '#' },
        { text: 'Training Materials', url: '#' },
      ],
    },
    {
      date: 'OCTOBER 1, 2025',
      emoji: '🎯',
      title: 'Guide-Level Advice',
      description: 'Customize advice at the individual guide level to support tailored tone and coaching.',
      links: [
        { text: 'Documentation', url: '#' },
        { text: 'Demo Setup', url: '#' },
      ],
    },
    {
      date: 'SEPTEMBER 28, 2025',
      emoji: '💰',
      title: 'Cost Tracking for Sidekick Sales',
      description: 'Track costs and explore optimizations as Sidekick Sales scales.',
      links: [
        { text: 'Feature Overview', url: '#' },
        { text: 'Customer FAQ', url: '#' },
      ],
    },
  ],
  popularResourcesTitle: 'Most Useful Resources',
  popularResources: [
    { emoji: '🎯', title: 'Center of Excellence', link: '/coe' },
    { emoji: '⚔️', title: 'Competitive Battle Cards', link: '/enablement/competitive' },
    { emoji: '🎬', title: 'Demo Hub', link: '/enablement/demo' },
    { emoji: '💰', title: 'ROI & BVA Tools', link: '/enablement/bva' },
    { emoji: '📖', title: 'Sales Playbooks', link: '/enablement/playbooks' },
    { emoji: '📋', title: 'Templates Library', link: '/resources/templates' },
  ],
  helpSection: {
    title: "💡 Can't find what you need?",
    description: 'Ask in Slack - the team will help you find it',
    buttons: [
      { text: '#enablement-resources', link: 'https://gladly.slack.com/archives/C06T8V6TJUA', variant: 'primary' },
      { text: 'Browse All Content', link: '#', variant: 'secondary' },
    ],
  },
};

export default function SeedDataPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const seedData = async () => {
    setLoading(true);
    setStatus('🌱 Seeding homepage data...');

    try {
      const result = await client.createOrReplace(homepageData);
      setStatus('✅ Success! Homepage data has been populated!\n\n' +
                '🎉 Your homepage is now live with content from the original HTML!\n\n' +
                '🌐 Visit http://localhost:3000 to see it\n' +
                '✏️  Visit http://localhost:3000/studio to edit the content');
    } catch (error: any) {
      setStatus('❌ Error: ' + error.message + '\n\nYou may need to authenticate in Sanity Studio first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Seed Homepage Data</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to populate your homepage with content from the original HTML file.
          This will create all the sections, cards, and content so your site works immediately.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">What will be created:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ Hero section with title and subtitle</li>
            <li>✅ 4 Team Toolkit cards (Sales, CSM, SC, Marketing)</li>
            <li>✅ 6 Quick Task cards</li>
            <li>✅ 7 Product cards</li>
            <li>✅ 3 What&apos;s New updates</li>
            <li>✅ 6 Popular Resource cards</li>
            <li>✅ Help section with buttons</li>
          </ul>
        </div>

        <button
          onClick={seedData}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
        >
          {loading ? '⏳ Populating Data...' : '🚀 Populate Homepage Data'}
        </button>

        {status && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{status}</pre>
          </div>
        )}

        {status.includes('Success') && (
          <div className="mt-4 flex gap-4">
            <a
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center"
            >
              View Homepage
            </a>
            <a
              href="/studio"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center"
            >
              Edit in Studio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
