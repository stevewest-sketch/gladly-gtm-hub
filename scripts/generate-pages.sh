#!/bin/bash

# Array of pages to create with [path, title, subtitle, color]
pages=(
  "coe:Center of Excellence:Tools and best practices for driving AI adoption:purple"
  "coe/bva:Business Value Assessment:Build compelling business cases and ROI models:green"
  "coe/ai-best-practices:AI Best Practices:Guidelines for effective AI implementation:blue"
  "coe/customer-wins:Customer Success Stories:Real-world examples of AI transformation:orange"
  "enablement/toolkits/sales:Sales Toolkit:Demos battle cards plays and sales materials:blue"
  "enablement/toolkits/csm:CSM Toolkit:QBRs adoption value tools and renewal resources:purple"
  "enablement/toolkits/success:SC Toolkit:Demo environments technical docs and POC materials:green"
  "enablement/toolkits/marketing:Marketing Toolkit:Campaigns content templates and brand assets:orange"
  "enablement/demo:Demo Hub:Everything you need to deliver amazing demos:blue"
  "enablement/competitive:Competitive Intelligence:Battle cards and competitive positioning:orange"
  "enablement/training:Training Center:Learn the platform and level up your skills:purple"
  "enablement/playbooks:Sales Playbooks:Proven strategies and plays that win deals:blue"
  "product/sidekick-standalone:Sidekick Standalone:AI-powered assistance for your team:purple"
  "product/sidekick-voice:Sidekick Voice:Transform voice conversations with AI:blue"
  "product/sidekick-email:Sidekick Email:AI email assistance and automation:green"
  "product/sidekick-sales:Sidekick Sales:AI-driven sales intelligence:orange"
  "product/customer-ai:Customer AI:Personalized customer experiences at scale:purple"
  "product/guides-journeys:Guides & Journeys:Build engaging customer journeys:blue"
  "product/app-platform:App Platform:Extend and customize your platform:green"
  "resources/templates:Templates Library:Ready-to-use templates and resources:orange"
  "resources/content:Content Hub:All your enablement content in one place:purple"
)

for page in "${pages[@]}"; do
  IFS=: read -r path title subtitle color <<< "$page"
  mkdir -p "/Users/steve.westgladly.com/my-website/my-website/my-website/app/$path"
  
  cat > "/Users/steve.westgladly.com/my-website/my-website/my-website/app/$path/page.tsx" << PAGEOF
import PageTemplate from '@/components/PageTemplate';

export default function Page() {
  return (
    <PageTemplate
      title="$title"
      subtitle="$subtitle"
      heroColor="$color"
    >
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Content coming soon. This page is ready to be populated with your materials.
        </p>
      </div>
    </PageTemplate>
  );
}
PAGEOF
done

echo "Created ${#pages[@]} pages!"
