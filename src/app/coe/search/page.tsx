import { Suspense } from 'react';
import { CoeSearchPage } from '@/components/coe/search/CoeSearchPage';

export const metadata = {
  title: 'Search | CoE Hub',
  description:
    'Search the Center of Excellence for best practices, proof points, tools, and more.',
};

function SearchPageContent() {
  return <CoeSearchPage />;
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading search...</div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
