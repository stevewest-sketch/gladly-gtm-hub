#!/bin/bash

# Array of pages with format: path:slug:title:subtitle:color
pages=(
  "app/coe/bva/page.tsx:coe/bva:Business Value Assessment:Build compelling business cases and ROI models:green"
  "app/coe/ai-best-practices/page.tsx:coe/ai-best-practices:AI Best Practices:Guidelines for effective AI implementation:blue"
  "app/coe/customer-wins/page.tsx:coe/customer-wins:Customer Success Stories:Real-world examples of AI transformation:orange"
  "app/enablement/demo/page.tsx:enablement/demo:Demo Hub:Everything you need to deliver amazing demos:blue"
  "app/enablement/competitive/page.tsx:enablement/competitive:Competitive Intel:Stay ahead of the competition:orange"
  "app/enablement/training/page.tsx:enablement/training:Training Resources:Level up your skills:purple"
  "app/enablement/playbooks/page.tsx:enablement/playbooks:Playbooks:Step-by-step guides for success:blue"
  "app/enablement/toolkits/sales/page.tsx:enablement/toolkits/sales:Sales Toolkit:Everything sales needs to win:blue"
  "app/enablement/toolkits/csm/page.tsx:enablement/toolkits/csm:CSM Toolkit:Customer success resources:purple"
  "app/enablement/toolkits/success/page.tsx:enablement/toolkits/success:Solutions Consultant Toolkit:Technical resources for SCs:green"
  "app/enablement/toolkits/marketing/page.tsx:enablement/toolkits/marketing:Marketing Toolkit:Marketing assets and campaigns:orange"
  "app/product/sidekick-standalone/page.tsx:product/sidekick-standalone:Sidekick Standalone:AI-powered assistance for your team:purple"
  "app/product/sidekick-voice/page.tsx:product/sidekick-voice:Voice AI:Intelligent voice interactions:blue"
  "app/product/sidekick-email/page.tsx:product/sidekick-email:Email AI:Smart email automation:purple"
  "app/product/sidekick-sales/page.tsx:product/sidekick-sales:Sales AI:AI-powered sales tools:blue"
  "app/product/customer-ai/page.tsx:product/customer-ai:Customer AI:Intelligent customer insights:purple"
  "app/product/guides-journeys/page.tsx:product/guides-journeys:Guides & Journeys:Interactive customer guidance:blue"
  "app/product/app-platform/page.tsx:product/app-platform:App Platform:Extend and customize your platform:green"
  "app/resources/templates/page.tsx:resources/templates:Templates Library:Ready-to-use templates and resources:orange"
  "app/resources/content/page.tsx:resources/content:Content Hub:All your enablement content in one place:purple"
)

for page in "${pages[@]}"; do
  IFS=: read -r path slug title subtitle color <<< "$page"

  fullpath="/Users/steve.westgladly.com/my-website/my-website/my-website/$path"

  cat > "$fullpath" << 'PAGEOF'
import DynamicPage from '@/components/DynamicPage';

export default function Page() {
  return (
    <DynamicPage
      slug="SLUG_PLACEHOLDER"
      fallbackTitle="TITLE_PLACEHOLDER"
      fallbackSubtitle="SUBTITLE_PLACEHOLDER"
      fallbackColor="COLOR_PLACEHOLDER"
    />
  );
}
PAGEOF

  # Replace placeholders
  sed -i '' "s|SLUG_PLACEHOLDER|$slug|g" "$fullpath"
  sed -i '' "s|TITLE_PLACEHOLDER|$title|g" "$fullpath"
  sed -i '' "s|SUBTITLE_PLACEHOLDER|$subtitle|g" "$fullpath"
  sed -i '' "s|COLOR_PLACEHOLDER|$color|g" "$fullpath"

  echo "Updated: $path"
done

echo "All pages updated successfully!"
