'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';

interface ContentResource {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  icon: string;
  metadata: string;
  link: string;
  compact: boolean;
}

async function getContentResources() {
  const query = `*[_type == "contentResource"] | order(category asc, title asc) {
    _id,
    title,
    description,
    category,
    type,
    icon,
    metadata,
    link,
    compact
  }`;
  return await client.fetch(query);
}

const categories = [
  { label: 'All Content', value: 'all' },
  { label: 'Presentations', value: 'presentations' },
  { label: 'One-Pagers', value: 'one-pagers' },
  { label: 'Industry', value: 'industry' },
  { label: 'Case Studies', value: 'case-studies' },
  { label: 'Marketing', value: 'marketing' },
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentResource[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentResource[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getContentResources().then(data => {
      setContent(data || []);
      setFilteredContent(data || []);
    });
  }, []);

  useEffect(() => {
    if (!content.length) return;

    const filtered = content.filter(item => {
      return categoryFilter === 'all' || item.category === categoryFilter;
    });

    setFilteredContent(filtered);
  }, [categoryFilter, content]);

  if (!mounted) return null;

  const compactItems = filteredContent.filter(item => item.compact);
  const regularItems = filteredContent.filter(item => !item.compact);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-white py-12 px-10" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #A080F0 50%, #B4A0F7 100%)'}}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[40px] font-bold mb-4">Content Library</h1>
          <p className="text-[18px] max-w-3xl mx-auto">
            All decks, one-pagers, collateral, and marketing materials in one place
          </p>
        </div>
      </div>

      {/* Quick Nav / Filter */}
      <div className="bg-white py-5 px-10 sticky top-0 z-[100] shadow-sm">
        <div className="flex gap-3 justify-center items-center flex-wrap max-w-[1200px] mx-auto">
          {categories.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setCategoryFilter(value)}
              className={`px-5 py-2.5 rounded text-[13px] font-semibold transition-all duration-200 ${
                categoryFilter === value
                  ? 'bg-[#8C69F0] text-white'
                  : 'bg-[#F3F3F3] text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">

        {/* Regular Content Grid */}
        {regularItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {regularItems.map(item => (
              <a
                key={item._id}
                href={item.link}
                className="block bg-white border-2 border-[#DFDFDF] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                {item.icon && (
                  <div className="text-4xl mb-4">{item.icon}</div>
                )}
                <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2">
                  {item.title}
                </h4>
                <p className="text-[13px] text-[#4A4A4A] mb-4 leading-relaxed">
                  {item.description}
                </p>
                {item.metadata && (
                  <div className="text-[13px] text-[#888] mb-4">
                    {item.metadata}
                  </div>
                )}
                <span className="text-[#8C69F0] font-semibold text-[13px]">
                  View Content →
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Compact Content Grid (One-Pagers) */}
        {compactItems.length > 0 && (
          <div>
            <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-4">Quick Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {compactItems.map(item => (
                <a
                  key={item._id}
                  href={item.link}
                  className="block bg-white border-2 border-[#DFDFDF] rounded-lg p-5 text-center hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  {item.icon && (
                    <div className="text-3xl mb-2">{item.icon}</div>
                  )}
                  <h4 className="text-[13px] font-bold text-[#0D0D0D] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-2">
                    {item.description}
                  </p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">
                    View →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredContent.length === 0 && (
          <div className="text-center py-16 text-[#4A4A4A]">
            <h3 className="text-[18px] font-semibold mb-2">No content found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-[#D4C5F9] rounded-lg p-12 text-center mt-12">
          <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-[16px] text-[#4A4A4A] mb-6">
            Request custom content or ask the enablement team for help
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#"
              className="inline-block bg-[#8C69F0] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#7B52D9] transition-all duration-200"
            >
              Request Content
            </a>
            <a
              href="#"
              className="inline-block bg-white text-[#8C69F0] px-8 py-3 rounded-md font-semibold border-2 border-[#8C69F0] hover:bg-[#8C69F0] hover:text-white transition-all duration-200"
            >
              Browse All Files
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a href="/" className="text-[#009B00] hover:text-[#008000] font-semibold transition-colors duration-200">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
