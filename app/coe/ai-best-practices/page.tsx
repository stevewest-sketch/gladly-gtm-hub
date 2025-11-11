import DynamicPage from '@/components/DynamicPage';

export default function Page() {
  return (
    <DynamicPage
      slug="coe/ai-best-practices"
      fallbackTitle="AI Best Practices"
      fallbackSubtitle="SUBAI Best Practices"
      fallbackColor="blue"
    />
  );
}
