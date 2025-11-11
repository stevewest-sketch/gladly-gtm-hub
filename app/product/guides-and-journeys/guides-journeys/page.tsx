import DynamicPage from '@/components/DynamicPage';

export default function Page() {
  return (
    <DynamicPage
      slug="guides-and-journeys"
      fallbackTitle="Guides TITLE_PLACEHOLDER Journeys"
      fallbackSubtitle="SUBGuides TITLE_PLACEHOLDER Journeys"
      fallbackColor="blue"
    />
  );
}
