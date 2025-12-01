import DynamicPage from '@/components/DynamicPage';

export default function Page() {
  return (
    <DynamicPage
      slug="coe/customer-wins"
      fallbackTitle="Customer Success Stories"
      fallbackSubtitle="SUBCustomer Success Stories"
      fallbackColor="orange"
    />
  );
}
