import { ToolkitPageMultiSection } from '@/components/toolkit';
import { marketingToolkitData } from '@/config/toolkits/marketing';

export default function MarketingToolkitPage() {
  return <ToolkitPageMultiSection {...marketingToolkitData} />;
}
