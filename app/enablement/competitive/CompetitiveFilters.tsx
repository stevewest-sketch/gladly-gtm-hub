'use client';

import { useState, useEffect } from 'react';

interface CompetitiveResource {
  _id: string;
  title: string;
  description: string;
  competitor: string;
  resourceType: string;
  icon: string;
  lastUpdated: string;
  link: string;
}

interface CompetitiveFiltersProps {
  resources: CompetitiveResource[];
}

const competitors = [
  { label: 'All Competitors', value: 'all' },
  { label: 'Zendesk', value: 'zendesk' },
  { label: 'Salesforce', value: 'salesforce' },
  { label: 'Freshdesk', value: 'freshdesk' },
  { label: 'Intercom', value: 'intercom' },
  { label: 'Genesys', value: 'genesys' },
  { label: 'Other', value: 'other' },
];

const resourceTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Battle Cards', value: 'battlecard' },
  { label: 'Comparisons', value: 'comparison' },
  { label: 'Positioning', value: 'positioning' },
  { label: 'Win/Loss', value: 'winloss' },
  { label: 'Objections', value: 'objections' },
];

export default function CompetitiveFilters({ resources }: CompetitiveFiltersProps) {
  const [filteredResources, setFilteredResources] = useState<CompetitiveResource[]>(resources);
  const [competitorFilter, setCompetitorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    const filtered = resources.filter(resource => {
      const competitorMatch = competitorFilter === 'all' || resource.competitor === competitorFilter || resource.competitor === 'all';
      const typeMatch = typeFilter === 'all' || resource.resourceType === typeFilter || resource.resourceType === 'all';
      return competitorMatch && typeMatch;
    });

    setFilteredResources(filtered);
  }, [competitorFilter, typeFilter, resources]);

  return (
    <>
      {/* Filters */}
      <div className="bg-[#f8f9fa] rounded-xl p-8 mb-8">
        <div className="text-gray-600 text-sm uppercase tracking-wide font-semibold mb-4">
          Filter Competitive Resources:
        </div>

        <div className="mb-5">
          <span className="block text-sm font-semibold mb-2 text-gray-900">By Competitor:</span>
          <div className="flex gap-2 flex-wrap">
            {competitors.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setCompetitorFilter(value)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  competitorFilter === value
                    ? 'bg-[#009B00] text-white border-2 border-[#009B00]'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-[#009B00] hover:text-white hover:border-[#009B00]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold mb-2 text-gray-900">By Resource Type:</span>
          <div className="flex gap-2 flex-wrap">
            {resourceTypes.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  typeFilter === value
                    ? 'bg-[#009B00] text-white border-2 border-[#009B00]'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-[#009B00] hover:text-white hover:border-[#009B00]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredResources.map(resource => (
          <div
            key={resource._id}
            className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#009B00] hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="bg-[#0D0D0D] text-white p-6 text-center">
              {resource.icon && (
                <div className="text-3xl mb-2">{resource.icon}</div>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{resource.title}</h3>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                {resource.competitor.charAt(0).toUpperCase() + resource.competitor.slice(1)} • {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#0D0D0D] leading-relaxed mb-4">
                {resource.description}
              </p>
              {resource.lastUpdated && (
                <div className="text-xs text-gray-500 mb-4">
                  {resource.lastUpdated}
                </div>
              )}
              <a
                href={resource.link}
                className="inline-block bg-[#009B00] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#007a00] transition-colors"
              >
                View Resource
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-xl font-semibold mb-2">No competitive resources found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </>
  );
}
