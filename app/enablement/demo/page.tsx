'use client';

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#6B46C1] via-[#8C69F0] to-[#A78BFA] text-white py-[50px] px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-4">Demo Materials & Certification Hub</h1>
          <p className="text-[20px] opacity-95 max-w-[900px] mx-auto">
            Everything you need to deliver compelling Gladly product demonstrations—from setup to certification
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white py-5 px-10 sticky top-0 z-[100] shadow-sm">
        <div className="flex gap-3 justify-center items-center flex-wrap max-w-[1200px] mx-auto">
          <a href="#getting-started" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Getting Started
          </a>
          <a href="#certifications" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Certifications
          </a>
          <a href="#scripts" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Scripts & Flows
          </a>
          <a href="#environments" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Environments
          </a>
          <a href="#support" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all whitespace-nowrap">
            Support
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">

        {/* Quick Reference Box */}
        <div className="bg-[#DBEAFE] rounded-xl p-8 mb-[50px] border-l-4 border-[#3B82F6]">
          <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-[#1a1a1a]">Demo Org Password:</p>
              <p className="text-[#374151] font-mono">powerOf&</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Retalè Store Password:</p>
              <p className="text-[#374151] font-mono">gladly</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Reset Command:</p>
              <p className="text-[#374151] font-mono">/demo-reset</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Minimum Reset Time:</p>
              <p className="text-[#374151]">30 minutes before demo</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Support Channel:</p>
              <p className="text-[#374151]">#demo-support</p>
            </div>
          </div>
        </div>

        {/* Purple Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%)'}}></div>

        {/* Section 1: Getting Started */}
        <div id="getting-started" className="bg-[#F5F3FF] rounded-xl p-8 mb-[50px] scroll-mt-24 border-b-4" style={{borderImage: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%) 1'}}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[40px]">🚀</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Getting Started</h2>
              <p className="text-[14px] text-[#666666]">Essential setup, access, and tools to run your first Gladly demo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <a href="/enablement/demo/setup-guide" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Complete Demo Setup Instructions</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Step-by-step guide to access your demo org, install required plugins, configure Retalè storefront, and perform demo resets
              </p>
              <span className="text-[#8C69F0] font-semibold text-sm">View Setup Guide →</span>
            </a>

            {/* Card 2 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Access Your Demo Org</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Check if you have a demo org assigned, get your login credentials, and view the full list of demo organizations
              </p>
              <span className="text-[#8C69F0] font-semibold text-sm">Check Demo Orgs →</span>
            </a>

            {/* Card 3 */}
            <a href="https://retale-gladly.myshopify.com/" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Retalè Demo Store</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Access our fictional eCommerce brand used for product demonstrations. Password: gladly
              </p>
              <span className="text-[#8C69F0] font-semibold text-sm">Open Retalè Store →</span>
            </a>

            {/* Card 4 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Install Demo Plugins</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Download and configure the Gladly Chat plugin, Help Center extension, and iOS TestFlight app for seamless demos
              </p>
              <span className="text-[#8C69F0] font-semibold text-sm">Get Plugins →</span>
            </a>
          </div>
        </div>

        {/* CTA: New to Demos */}
        <div className="rounded-xl p-12 text-center mb-[50px] text-white" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)'}}>
          <h2 className="text-[32px] font-bold mb-4">New to Gladly Demos?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-[600px] mx-auto">
            Start with the complete setup guide to get your demo environment configured and ready
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/enablement/demo/setup-guide" className="bg-white text-[#8C69F0] px-8 py-4 rounded-lg font-semibold text-base hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Get Setup for Your First Demo
            </a>
            <a href="#certifications" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'}} className="text-white px-8 py-4 rounded-lg font-semibold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Browse Certification Programs
            </a>
          </div>
        </div>

        {/* Blue Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%)'}}></div>

        {/* Section 2: Demo Certification Programs */}
        <div id="certifications" className="bg-white rounded-xl p-8 mb-[50px] scroll-mt-24 border-b-4" style={{borderImage: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%) 1'}}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[40px]">🎓</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Certification Programs</h2>
              <p className="text-[14px] text-[#666666]">Structured learning paths to master Gladly demos for different audiences and scenarios</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#3B82F6] rounded-lg p-6 hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D]">15-Min Platform Demo Certification</h4>
                <span className="bg-[#1E40AF] text-white px-3 py-1 rounded-full font-semibold text-xs whitespace-nowrap">AE/AM/SC</span>
              </div>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Master the core 15-minute Gladly demo covering Sidekick Chat, Voice, SMS, Hero, and Journeys. For AEs, AMs, and SCs.
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">Start Certification →</span>
            </a>

            {/* Card 2 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#3B82F6] rounded-lg p-6 hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D]">UAT Customer Demo Certification</h4>
                <span className="bg-[#D1FAE5] text-[#10B981] px-3 py-1 rounded-full font-semibold text-xs whitespace-nowrap">CSM</span>
              </div>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Learn to demo within live customer environments for existing accounts, new stakeholders, and feature expansions
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">Start Certification →</span>
            </a>

            {/* Card 3 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#3B82F6] rounded-lg p-6 hover:bg-[#DBEAFE] hover:border-[#3B82F6] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <div className="mb-3">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D]">Custom Demo Process</h4>
              </div>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                For must-win deals &gt;$500k. Learn the timeline, RACI, and request process for custom branded demos
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">View Process →</span>
            </a>
          </div>
        </div>

        {/* Purple Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%)'}}></div>

        {/* Section 3: Scripts & Demo Flows */}
        <div id="scripts" className="bg-[#FAFAFA] py-[50px] px-10 -mx-10 mb-[50px] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[40px]">📝</span>
              <div>
                <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Scripts & Demo Flows</h2>
                <p className="text-[14px] text-[#666666]">Proven talk tracks and demo sequences for different products and scenarios</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Complete Platform Demo Script</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  10-15 minute demo flow covering proactive chat, Sidekick Actions, Sales, Answers, Voice/SMS, Hero, and Journeys
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Script →</span>
              </a>

              {/* Card 2 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Sidekick Chat Module</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Demo proactive, human-like chat support with multilingual capabilities and multi-intent handling
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Module →</span>
              </a>

              {/* Card 3 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Sidekick Voice & SMS Module</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Demonstrate conversational voice AI and seamless SMS handoffs with real-time examples
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Module →</span>
              </a>

              {/* Card 4 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Hero Platform Module</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Showcase the unified agent interface, customer timeline, and AI-powered assistance
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Module →</span>
              </a>

              {/* Card 5 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Journeys & Guides Module</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Explain how admins optimize AI performance with no-code tools and data-driven insights
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Module →</span>
              </a>

              {/* Card 6 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Demo Delivery Best Practices</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Hardware tips, workspace prep, talk track guidance, and transition questions for compelling demos
                </p>
                <span className="text-[#8C69F0] font-semibold text-sm">View Guide →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Blue Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%)'}}></div>

        {/* Section 4: Demo Environments & Tools */}
        <div id="environments" className="bg-[#EFF6FF] rounded-xl p-8 mb-[50px] scroll-mt-24 border-b-4" style={{borderImage: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%) 1'}}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[40px]">💻</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Demo Environments & Tools</h2>
              <p className="text-[14px] text-[#666666]">Live demo instances, reset tools, and support resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Reset Your Demo Environment</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Learn how to reset your demo org using /demo-reset in Slack. Takes 5-6 minutes. Always reset 30 minutes before demos.
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">View Instructions →</span>
            </a>

            {/* Card 2 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Configure Demo Customer</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Update Julie Chang&apos;s profile with your phone number for SMS and voice demos (required after each reset)
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">View Steps →</span>
            </a>

            {/* Card 3 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Gladly Chat Plugin Setup</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Configure the chat widget plugin for Retalè with correct organization settings (case-sensitive: &quot;myshop&quot;)
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">Setup Guide →</span>
            </a>

            {/* Card 4 */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
              <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Get Help & Stay Updated</h4>
              <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                Join #demo-support for troubleshooting, #demo for updates, and #demo-notification for reset confirmations
              </p>
              <span className="text-[#3B82F6] font-semibold text-sm">View Channels →</span>
            </a>
          </div>
        </div>

        {/* Orange Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #FFF7ED 0%, #F97316 50%, #FFF7ED 100%)'}}></div>

        {/* Section 5: Support & Resources */}
        <div id="support" className="bg-white py-[50px] px-10 -mx-10 mb-[50px] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[40px]">⚙️</span>
              <div>
                <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Support & Troubleshooting</h2>
                <p className="text-[14px] text-[#666666]">Get help when you need it and find answers to common issues</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#F97316] rounded-lg p-6 hover:bg-[#FED7AA] hover:border-[#F97316] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Common Demo Issues & Solutions</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Fix reset failures, access problems, plugin errors, and dataset issues with this troubleshooting guide
                </p>
                <span className="text-[#F97316] font-semibold text-sm">View Guide →</span>
              </a>

              {/* Card 2 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#F97316] rounded-lg p-6 hover:bg-[#FED7AA] hover:border-[#F97316] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Contact Demo Engineering</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Reach Kaylee Moser or Alice Blank for technical demo issues, custom dataset requests, or demo org access
                </p>
                <span className="text-[#F97316] font-semibold text-sm">Get Support →</span>
              </a>

              {/* Card 3 */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-l-[3px] border-[#F97316] rounded-lg p-6 hover:bg-[#FED7AA] hover:border-[#F97316] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Demo Certification FAQs</h4>
                <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                  Common questions about demo flows, setup, tools, and when to use different demo types
                </p>
                <span className="text-[#F97316] font-semibold text-sm">View FAQs →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-xl p-12 text-center text-white" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'}}>
          <div className="text-[48px] mb-4">🎯</div>
          <h2 className="text-[32px] font-bold mb-4">Ready to Master Your Demo Skills?</h2>
          <p className="text-lg opacity-95 mb-8 max-w-[700px] mx-auto">
            Start with a certification program or dive into the setup guide to get started today
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#certifications" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)'}} className="text-white px-8 py-4 rounded-lg font-semibold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Explore Certifications
            </a>
            <a href="/enablement/demo/setup-guide" className="bg-white text-[#3B82F6] px-8 py-4 rounded-lg font-semibold text-base hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              View Setup Guide
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a href="/" className="text-[#8C69F0] hover:text-[#7557d9] font-semibold">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
