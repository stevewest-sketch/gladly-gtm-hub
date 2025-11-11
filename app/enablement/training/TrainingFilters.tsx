'use client';

import { useState, useEffect } from 'react';

interface TrainingSession {
  _id: string;
  _type: 'trainingSession';
  title: string;
  dateDisplay: string;
  product: string;
  productLabel: string;
  description: string;
  duration: string;
  materials: string;
  dateFilter: string;
  link: string;
  tags?: string[];
}

interface TrainingFiltersProps {
  sessions: TrainingSession[];
}

export default function TrainingFilters({ sessions }: TrainingFiltersProps) {
  const [filteredSessions, setFilteredSessions] = useState<TrainingSession[]>(sessions);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Value Selling': 'bg-blue-600',
      'Sales Skills': 'bg-green-600',
      'GTM Strategy': 'bg-purple-600',
      'Product': 'bg-orange-600',
      'Team': 'bg-pink-600',
      'Professional Skills': 'bg-indigo-600',
      'Demo': 'bg-red-600',
      'Partner': 'bg-teal-600',
      'Competitive': 'bg-yellow-600',
      'Persona': 'bg-cyan-600',
    };
    return colors[category] || 'bg-gray-800';
  };

  useEffect(() => {
    const filtered = sessions.filter(session => {
      // Category filter
      if (categoryFilter !== 'all') {
        const categoryMatch = session.tags && session.tags.includes(categoryFilter);
        if (!categoryMatch) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = session.title.toLowerCase().includes(query);
        const descMatch = session.description?.toLowerCase().includes(query);
        const tagMatch = session.tags?.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || descMatch || tagMatch;
      }

      return true;
    });

    setFilteredSessions(filtered);
  }, [categoryFilter, searchQuery, sessions]);

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
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#009B00] transition-colors"
          />
        </div>

        {/* Category Tags */}
        <div>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { label: 'All', value: 'all' },
              { label: 'Value Selling', value: 'Value Selling' },
              { label: 'Sales Skills', value: 'Sales Skills' },
              { label: 'GTM Strategy', value: 'GTM Strategy' },
              { label: 'Product', value: 'Product' },
              { label: 'Team', value: 'Team' },
              { label: 'Professional Skills', value: 'Professional Skills' },
              { label: 'Demo', value: 'Demo' },
              { label: 'Partner', value: 'Partner' },
              { label: 'Competitive', value: 'Competitive' },
              { label: 'Persona', value: 'Persona' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setCategoryFilter(value)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  categoryFilter === value
                    ? 'bg-[#009B00] text-white border-2 border-[#009B00]'
                    : 'bg-[#f8f9fa] text-gray-700 border-2 border-transparent hover:bg-[#009B00] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Training Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSessions.map(session => (
          <a
            key={session._id}
            href={session.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#009B00] hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="bg-[#0D0D0D] text-white p-5">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                {session.dateDisplay}
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">{session.title}</h3>
              <span className={`inline-block ${getCategoryColor(session.productLabel)} px-3 py-1 rounded text-xs font-semibold mt-2`}>
                {session.productLabel}
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{session.description}</p>
              <div className="flex gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                <span>{session.duration}</span>
                <span>{session.materials}</span>
              </div>
              <span className="text-[#009B00] font-semibold text-sm inline-flex items-center gap-2">
                View Materials →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* No Results */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-xl font-semibold mb-2">No content found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </>
  );
}
