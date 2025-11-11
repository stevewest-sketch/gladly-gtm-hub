'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LearningModule {
  _id: string;
  _type: 'learningModule';
  title: string;
  slug: string;
  category: 'competitive' | 'product' | 'process';
  moduleType: string;
  description: string;
  oneLiner: string;
  videoDuration?: number;
  lastUpdated: string;
  productTags?: string[];
}

interface ELearningFiltersProps {
  modules: LearningModule[];
}

export default function ELearningFilters({ modules }: ELearningFiltersProps) {
  const [filteredModules, setFilteredModules] = useState<LearningModule[]>(modules);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'competitive': 'bg-orange-600',
      'product': 'bg-blue-600',
      'process': 'bg-purple-600',
    };
    return colors[category] || 'bg-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'competitive': 'Competitive',
      'product': 'Product',
      'process': 'Process',
    };
    return labels[category] || category;
  };

  useEffect(() => {
    const filtered = modules.filter(module => {
      // Category filter
      if (categoryFilter !== 'all') {
        if (module.category !== categoryFilter) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = module.title.toLowerCase().includes(query);
        const descMatch = module.description?.toLowerCase().includes(query);
        const oneLinerMatch = module.oneLiner?.toLowerCase().includes(query);
        return titleMatch || descMatch || oneLinerMatch;
      }

      return true;
    });

    setFilteredModules(filtered);
  }, [categoryFilter, searchQuery, modules]);

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
        {/* Search */}
        <div className="mb-5">
          <span className="block text-sm font-semibold mb-2 text-gray-900">Search:</span>
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#0066CC] transition-colors"
          />
        </div>

        {/* Category Tags */}
        <div>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { label: 'All', value: 'all' },
              { label: 'Competitive', value: 'competitive' },
              { label: 'Product', value: 'product' },
              { label: 'Process', value: 'process' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setCategoryFilter(value)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  categoryFilter === value
                    ? 'bg-[#0066CC] text-white border-2 border-[#0066CC]'
                    : 'bg-[#f8f9fa] text-gray-700 border-2 border-transparent hover:bg-[#0066CC] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map(module => (
          <Link
            key={module._id}
            href={`/enablement/e-learning/${module.slug}`}
            className="block bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#0066CC] hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="bg-[#003D7A] text-white p-5">
              <div className="text-xs text-gray-300 uppercase tracking-wide mb-2">
                Learning Module
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">{module.title}</h3>
              <span className={`inline-block ${getCategoryColor(module.category)} px-3 py-1 rounded text-xs font-semibold mt-2`}>
                {getCategoryLabel(module.category)}
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">{module.oneLiner}</p>
              <div className="flex gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                {module.videoDuration && <span>{module.videoDuration} min video</span>}
                <span>{module.moduleType}</span>
              </div>
              <span className="text-[#0066CC] font-semibold text-sm inline-flex items-center gap-2">
                Start Learning →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredModules.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-xl font-semibold mb-2">No content found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </>
  );
}
