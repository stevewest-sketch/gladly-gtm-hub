'use client';

import { useState } from 'react';

export default function BVAPage() {
  const [activeTab, setActiveTab] = useState('All Resources');
  const [activeProcess, setActiveProcess] = useState('pre-sales');

  const bvaResources = [
    // Core Tools
    {
      icon: '📊',
      title: 'BVA Input & Calculator',
      desc: 'Main tool for all BVA calculations with built-in benchmarks. Includes tabs for BVA 101, 201, and 301 analyses.',
      tag: 'Core Tools',
      meta: 'Spreadsheet',
      cta: 'Open Calculator →'
    },
    {
      icon: '💰',
      title: 'Pre-Sales BVA Calculator',
      desc: 'Build business cases with Gladly benchmarks based on customer data availability.',
      tag: 'Core Tools',
      meta: 'BVA 101, 201, 301',
      cta: 'Open Tool →'
    },
    {
      icon: '📈',
      title: 'Sidekick ROI Calculator',
      desc: 'Calculate current and future value by quantifying impact of Sidekick on agents and resolutions.',
      tag: 'Core Tools',
      meta: 'For Customers',
      cta: 'Open Calculator →'
    },
    {
      icon: '📋',
      title: 'BVA Readout Template',
      desc: 'Customer-facing presentation template to tell compelling value stories with financial justification.',
      tag: 'Core Tools',
      meta: 'Presentation',
      cta: 'Make a Copy →'
    },
    {
      icon: '📞',
      title: 'Sidekick Voice Pricing Calculator',
      desc: 'Estimate 3-year Sidekick Voice costs. Validate estimates with SMEs before using.',
      tag: 'Core Tools',
      meta: 'Voice specific',
      cta: 'Open Calculator →'
    },
    // Enablement
    {
      icon: '📊',
      title: 'Self-Service BVA Tools Deck',
      desc: 'How to use the new self-service BVA tools.',
      tag: 'Enablement',
      meta: 'October 15, 2025',
      cta: 'View Deck →'
    },
    {
      icon: '▶️',
      title: 'BVA Walkthrough Recording',
      desc: '1-hour walkthrough of new self-service tools.',
      tag: 'Enablement',
      meta: '17:28 video',
      cta: 'Watch Video →'
    },
    {
      icon: '📺',
      title: 'BVA Demo Walkthrough',
      desc: 'Video guide showing both BVA and ROI processes from start to finish.',
      tag: 'Enablement',
      meta: 'Full process',
      cta: 'Watch Demo →'
    },
    // Templates & Examples
    {
      icon: '👥',
      title: 'Customer Meeting Slides',
      desc: 'Core slide deck structure for customer meetings. Add latest product slides from CMS library.',
      tag: 'Templates',
      meta: 'Presentation',
      cta: 'Access Slides →'
    },
    {
      icon: '📋',
      title: 'Mutual Action Plan',
      desc: 'Template for tracking next steps after BVA presentation.',
      tag: 'Templates',
      meta: 'Project planning',
      cta: 'Get Template →'
    },
    {
      icon: '📊',
      title: 'Customer Presentation Best Practices',
      desc: 'Slide design and communication strategies for customer-facing presentations that resonate.',
      tag: 'Templates',
      meta: 'Customer Meeting Examples',
      cta: 'View Guide →'
    },
    {
      icon: '📊',
      title: 'BVA Deck for Customers',
      desc: 'Supplement your discovery or kick-off. Explains the Business Value Analysis program.',
      tag: 'Templates',
      meta: 'Introduction',
      cta: 'View Deck →'
    },
    {
      icon: '📄',
      title: 'Customer One-Pager',
      desc: 'Summary document for customers going through the BVA process.',
      tag: 'Templates',
      meta: '1-page summary',
      cta: 'Download →'
    },
    // Proof Points
    {
      icon: '📁',
      title: 'Customer Asset Library',
      desc: 'Customer decks, ROI calculators, QBR materials, and more. Submit your assets to be included.',
      tag: 'Proof Points',
      meta: 'Searchable repository',
      cta: 'Access Library →'
    },
    {
      icon: '🏆',
      title: 'Proof Point + CoE Repository',
      desc: 'Customer-approved stats, ROI data, and success metrics tagged with permission status.',
      tag: 'Proof Points',
      meta: 'Stats & metrics',
      cta: 'View Repository →'
    },
    // Best Practices
    {
      icon: '💡',
      title: 'Presentation Best Practices',
      desc: 'Tips for effective presentations and handling objections.',
      tag: 'Best Practices',
      meta: 'Guide',
      cta: 'Read Guide →'
    }
  ];

  const tabs = ['All Resources', 'Core Tools', 'Enablement', 'Templates', 'Proof Points', 'Best Practices'];

  const filteredResources = activeTab === 'All Resources'
    ? bvaResources
    : bvaResources.filter(r => r.tag === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white py-16 px-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[40px] font-bold mb-4">Business Value Analysis Playbook</h1>
          <p className="text-[18px] opacity-95 max-w-[900px] mx-auto">
            Quantify the impact of Gladly Sidekick. Build compelling business cases that win deals and prove ROI.
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white py-5 px-10 sticky top-0 z-[100] shadow-sm">
        <div className="flex gap-3 justify-center items-center flex-wrap max-w-[1200px] mx-auto">
          <a href="#overview" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Overview & Impact
          </a>
          <a href="#getting-started" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Getting Started
          </a>
          <a href="#bva-levels" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            BVA Levels
          </a>
          <a href="#process" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Process
          </a>
          <a href="#tools" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Tools & Resources
          </a>
          <a href="#best-practices" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Best Practices
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-12">

        {/* What is the Business Value Program */}
        <div id="overview" className="bg-white rounded-xl p-8 mb-8 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#DFDFDF]">
            <span className="text-[40px]">💼</span>
            <div>
              <h2 className="text-[18px] text-[#1a1a1a] font-semibold mb-1">Business Value Program</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-[15px] text-[#4A4A4A] mb-6 leading-relaxed">
                Quantify Gladly's financial impact through value-based discovery and structured business cases—from early messaging to full ROI models.
              </p>

              <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-3">Three-level framework:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#8C69F0] text-xl mt-0.5">101</span>
                  <span className="text-[15px] text-[#4A4A4A]"><strong>Value messaging & metrics</strong> — Lead with key capabilities</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C69F0] text-xl mt-0.5">201</span>
                  <span className="text-[15px] text-[#4A4A4A]"><strong>Value hypothesis</strong> — Quantify high-level opportunity</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C69F0] text-xl mt-0.5">301</span>
                  <span className="text-[15px] text-[#4A4A4A]"><strong>Detailed business case</strong> — Discovery + benchmarks + data</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-3">Proven impact:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white rounded-lg p-4 text-center">
                  <div className="text-[28px] font-bold mb-1">40%</div>
                  <div className="text-xs opacity-90">Higher win rate</div>
                </div>
                <div className="bg-gradient-to-br from-[#8C69F0] to-[#7B52D9] text-white rounded-lg p-4 text-center">
                  <div className="text-[28px] font-bold mb-1">$500K+</div>
                  <div className="text-xs opacity-90">Avg value shown</div>
                </div>
                <div className="bg-gradient-to-br from-[#009B00] to-[#007A00] text-white rounded-lg p-4 text-center">
                  <div className="text-[28px] font-bold mb-1">15%</div>
                  <div className="text-xs opacity-90">Deal size uplift</div>
                </div>
                <div className="bg-gradient-to-br from-[#252525] to-[#1a1a1a] text-white rounded-lg p-4 text-center">
                  <div className="text-[28px] font-bold mb-1">30 min</div>
                  <div className="text-xs opacity-90">Quick analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Tools, Two Audiences */}
        <div id="getting-started" className="bg-[#0D0D0D] py-12 px-10 -mx-10 mb-8 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-3 text-white text-center">Two Tools, Two Audiences</h2>
            <p className="text-[15px] text-[#CCCCCC] mb-10 text-center max-w-[800px] mx-auto">
              Choose the right approach based on who you're working with and what data you have available
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pre-Sales Path */}
              <div>
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#F3F3F3] rounded-full p-4">
                      <span className="text-[36px]">📊</span>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0D0D0D]">Pre-Sales BVA</h3>
                      <p className="text-[15px] text-[#8C69F0] font-semibold">For Prospects</p>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                    Build compelling business cases early in the sales cycle—before the deal is closed
                  </p>

                  <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-[#0D0D0D] mb-2">Best for:</p>
                    <ul className="space-y-2 text-[15px] text-[#4A4A4A]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#8C69F0]">•</span>
                        <span>Early deal cycle conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8C69F0]">•</span>
                        <span>Building financial justification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8C69F0]">•</span>
                        <span>Competitive evaluations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-sm text-[#666] mb-6">
                    <span className="font-semibold text-[#0D0D0D]">Minimum data:</span> Total volume + one CPC figure
                  </div>

                  <a href="#process" className="block w-full bg-[#8C69F0] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#7B52D9] transition-all">
                    See BVA Workflow →
                  </a>
                </div>

              </div>

              {/* ROI Path */}
              <div>
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#FAE8FF] rounded-full p-4">
                      <span className="text-[36px]">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0D0D0D]">ROI Calculator</h3>
                      <p className="text-[15px] text-[#C084FC] font-semibold">For Customers</p>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                    Demonstrate actual value delivered using real Sidekick performance data
                  </p>

                  <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-[#0D0D0D] mb-2">Best for:</p>
                    <ul className="space-y-2 text-[15px] text-[#4A4A4A]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#C084FC]">•</span>
                        <span>Renewal conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C084FC]">•</span>
                        <span>Quarterly business reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C084FC]">•</span>
                        <span>Upsell opportunities</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-sm text-[#666] mb-6">
                    <span className="font-semibold text-[#0D0D0D]">Minimum data:</span> Sidekick usage metrics from platform
                  </div>

                  <a href="#process" className="block w-full bg-[#C084FC] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#A855F7] transition-all">
                    See ROI Workflow →
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* BVA Levels */}
        <div id="bva-levels" className="bg-[#F3F3F3] py-[40px] px-10 -mx-10 mb-8 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-2 text-[#0D0D0D]">Choose Your BVA Level</h2>
            <p className="text-base text-[#666] mb-6">Match your analysis to your available prospect data</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* BVA 101 */}
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F3F3F3] text-[#8C69F0] px-3 py-1 rounded-full font-bold text-sm">101</span>
                  <h3 className="text-[16px] font-bold text-[#0D0D0D]">Quick Estimate</h3>
                </div>
                <p className="text-sm text-[#666] mb-3">⏱️ 15 min | 📊 Minimal data</p>
                <p className="text-sm text-[#4A4A4A] mb-2">Total volume + one CPC</p>
              </div>

              {/* BVA 201 */}
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F3F3F3] text-[#8C69F0] px-3 py-1 rounded-full font-bold text-sm">201</span>
                  <h3 className="text-[16px] font-bold text-[#0D0D0D]">Channel Analysis</h3>
                </div>
                <p className="text-sm text-[#666] mb-3">⏱️ 30-45 min | 📊 Moderate data</p>
                <p className="text-sm text-[#4A4A4A] mb-2">Volume by channel + CPC + handle times</p>
              </div>

              {/* BVA 301 */}
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F3F3F3] text-[#8C69F0] px-3 py-1 rounded-full font-bold text-sm">301</span>
                  <h3 className="text-[16px] font-bold text-[#0D0D0D]">Full ROI Model</h3>
                </div>
                <p className="text-sm text-[#666] mb-3">⏱️ 1-2 hours | 📊 Detailed data</p>
                <p className="text-sm text-[#4A4A4A] mb-2">All 201 + agent costs + revenue + 3-year projections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div id="process" className="bg-[#F5F5F7] py-[35px] px-10 -mx-10 mb-8 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            {/* Pre-Sales BVA Workflow */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[30px]">📊</span>
                <div>
                  <h2 className="text-[18px] text-[#0D0D0D] font-bold mb-0.5">Pre-Sales BVA Workflow</h2>
                  <p className="text-xs text-[#8C69F0] font-semibold uppercase tracking-wide">FOR PROSPECTS</p>
                </div>
              </div>

              {/* Compact Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {/* Step 1 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Gather Data</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Discovery call</li>
                    <li>• Current metrics</li>
                    <li>• Channel breakdowns</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Choose Level</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• 101: Minimal data</li>
                    <li>• 201: Channel data</li>
                    <li>• 301: Full analysis</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Input Data</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Open calculator</li>
                    <li>• Fill yellow cells</li>
                    <li>• Review benchmarks</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Review Outputs</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Check outputs</li>
                    <li>• Validate with SC</li>
                    <li>• Ensure defensible</li>
                  </ul>
                </div>

                {/* Step 5 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Customize Deck</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Copy template</li>
                    <li>• Add customer data</li>
                    <li>• Add proof points</li>
                  </ul>
                </div>

                {/* Step 6 */}
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-4 hover:border-[#8C69F0] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#8C69F0] text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Present & Iterate</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Walk through findings</li>
                    <li>• Gather feedback</li>
                    <li>• Update model</li>
                  </ul>
                </div>
              </div>

              {/* Watch BVA Demo */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 flex items-start gap-4 border border-[#E5E7EB]">
                <div className="flex-shrink-0">
                  <iframe
                    src="https://drive.google.com/file/d/1obQ9In3hYjEwyNJRom1RuXL6AGEP5Qld/preview"
                    className="w-[160px] h-[90px] rounded"
                    allow="autoplay"
                  ></iframe>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0D0D0D] mb-1">Watch BVA Demo</h3>
                  <p className="text-xs text-[#666] mb-3">
                    See the complete pre-sales BVA process
                  </p>
                  <a href="https://drive.google.com/file/d/1obQ9In3hYjEwyNJRom1RuXL6AGEP5Qld/view" target="_blank" rel="noopener noreferrer" className="bg-[#009B00] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-[#007A00] transition-all inline-block">
                    Watch Demo →
                  </a>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-[#999] uppercase tracking-wider">SEPARATE TOOL</span>
            </div>

            {/* ROI Calculator Workflow */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[30px]">🎯</span>
                <div>
                  <h2 className="text-[18px] text-[#0D0D0D] font-bold mb-0.5">ROI Calculator Workflow</h2>
                  <p className="text-xs text-[#C084FC] font-semibold uppercase tracking-wide">FOR CUSTOMERS</p>
                </div>
              </div>

              {/* Compact Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {/* Step 1 */}
                <div className="bg-white border-2 border-[#FAE8FF] rounded-lg p-4 hover:border-[#C084FC] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#C084FC] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Collect Data</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Pull Sidekick reports</li>
                    <li>• Assist & resolution rates</li>
                    <li>• Handle time data</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white border-2 border-[#FAE8FF] rounded-lg p-4 hover:border-[#C084FC] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#C084FC] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Input Data</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Current performance</li>
                    <li>• Baseline metrics</li>
                    <li>• Agent costs</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white border-2 border-[#FAE8FF] rounded-lg p-4 hover:border-[#C084FC] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#C084FC] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Generate Report</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• 3-year projections</li>
                    <li>• Validate calculations</li>
                    <li>• Export summary</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white border-2 border-[#FAE8FF] rounded-lg p-4 hover:border-[#C084FC] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-[#C084FC] text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">Present Value</h4>
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#666] ml-9">
                    <li>• Share in QBR</li>
                    <li>• Highlight wins</li>
                    <li>• Discuss goals</li>
                  </ul>
                </div>
              </div>

              {/* Watch ROI Calculator Demo */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 flex items-start gap-4 border border-[#E5E7EB]">
                <div className="flex-shrink-0">
                  <iframe
                    src="https://drive.google.com/file/d/1Nr9U0yuTBw0e0wWN8wr8VvzU4Ujq0skp/preview"
                    className="w-[160px] h-[90px] rounded"
                    allow="autoplay"
                  ></iframe>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0D0D0D] mb-1">Watch ROI Calculator Demo</h3>
                  <p className="text-xs text-[#666] mb-3">
                    Learn how to generate executive-ready ROI reports
                  </p>
                  <a href="https://drive.google.com/file/d/1Nr9U0yuTBw0e0wWN8wr8VvzU4Ujq0skp/view" target="_blank" rel="noopener noreferrer" className="bg-[#8C69F0] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-[#7B52D9] transition-all inline-block">
                    Watch Demo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div id="best-practices" className="bg-[#F3F3F3] py-12 px-10 -mx-10 mb-8 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-2 text-[#0D0D0D]">Best Practices</h2>
            <p className="text-base text-[#666] mb-8">Tips for success from our top performers</p>

          {/* Best Practice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#F9FAFB] border-l-2 border-[#8C69F0] rounded p-6">
              <h5 className="text-base font-bold text-[#0D0D0D] mb-4">Before the Meeting</h5>
              <ul className="text-sm text-[#666] space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Send deck 24 hours in advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Prepare talking points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Anticipate questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Have backup slides ready</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F9FAFB] border-l-2 border-[#8C69F0] rounded p-6">
              <h5 className="text-base font-bold text-[#0D0D0D] mb-4">During Presentation</h5>
              <ul className="text-sm text-[#666] space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Start with "What We Heard"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Lead with executive summary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Use their language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Focus on outcomes not features</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F9FAFB] border-l-2 border-[#8C69F0] rounded p-6">
              <h5 className="text-base font-bold text-[#0D0D0D] mb-4">After Presentation</h5>
              <ul className="text-sm text-[#666] space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Send summary within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Include links to resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Document questions to research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C69F0] flex-shrink-0">•</span>
                  <span>Schedule next steps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Do's and Don'ts - Grouped Layout */}
          <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-6">Do's and Don'ts</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pitfalls Column */}
            <div>
              <div className="bg-[#FFEBEE] border-2 border-[#E44F4F] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 text-2xl">⚠️</span>
                  <h4 className="text-[18px] font-bold text-red-900">Common Pitfalls to Avoid</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-2 border-red-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Don't make up data or guess wildly</p>
                    <p className="text-sm text-[#666]">Use benchmarks and be transparent about assumptions</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-2 border-red-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Don't overpromise results</p>
                    <p className="text-sm text-[#666]">Set realistic expectations based on data</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-2 border-red-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Don't skip validation</p>
                    <p className="text-sm text-[#666]">Always review with SC/manager first</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices Column */}
            <div>
              <div className="bg-[#E8F5E9] border-2 border-[#009B00] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 text-2xl">✅</span>
                  <h4 className="text-[18px] font-bold text-green-900">Best Practices</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-2 border-green-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Use benchmarks transparently</p>
                    <p className="text-sm text-[#666]">Show conservative and optimistic scenarios</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-2 border-green-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Show multiple scenarios</p>
                    <p className="text-sm text-[#666]">Customize slides with customer context</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-2 border-green-400">
                    <p className="text-[15px] font-semibold text-[#0D0D0D] mb-1">Review before presenting</p>
                    <p className="text-sm text-[#666]">Include quality, experience, revenue impacts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Tools & Resources - Organized by Category */}
        <div id="tools" className="bg-[#F3F3F3] py-12 px-10 -mx-10 mb-8 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-2 text-[#0D0D0D]">Tools & Resources</h2>
            <p className="text-base text-[#666] mb-10">Everything you need to build compelling value stories</p>

            {/* Core Tools - Calculators */}
            <div className="mb-10">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Calculators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bvaResources.filter(r => r.tag === 'Core Tools').map((resource, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline flex items-start gap-4"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg p-2.5 flex-shrink-0">
                      <span className="text-[20px]">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-[#0D0D0D] mb-1">{resource.title}</h4>
                      <p className="text-xs text-[#888] mb-2">{resource.meta}</p>
                      <p className="text-sm text-[#666] leading-relaxed mb-2">
                        {resource.desc}
                      </p>
                      <span className="text-[#009B00] text-xs font-semibold">{resource.cta}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="mb-10">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bvaResources.filter(r => r.tag === 'Templates').map((resource, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline flex items-start gap-4"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg p-2.5 flex-shrink-0">
                      <span className="text-[20px]">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-[#0D0D0D] mb-1">{resource.title}</h4>
                      <p className="text-xs text-[#888] mb-2">{resource.meta}</p>
                      <p className="text-sm text-[#666] leading-relaxed mb-2">
                        {resource.desc}
                      </p>
                      <span className="text-[#009B00] text-xs font-semibold">{resource.cta}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Enablement */}
            <div className="mb-10">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Enablement & Training</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bvaResources.filter(r => r.tag === 'Enablement').map((resource, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline flex items-start gap-4"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg p-2.5 flex-shrink-0">
                      <span className="text-[20px]">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-[#0D0D0D] mb-1">{resource.title}</h4>
                      <p className="text-xs text-[#888] mb-2">{resource.meta}</p>
                      <p className="text-sm text-[#666] leading-relaxed mb-2">
                        {resource.desc}
                      </p>
                      <span className="text-[#009B00] text-xs font-semibold">{resource.cta}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Proof Points */}
            <div>
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Proof Points & Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bvaResources.filter(r => r.tag === 'Proof Points' || r.tag === 'Best Practices').map((resource, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline flex items-start gap-4"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg p-2.5 flex-shrink-0">
                      <span className="text-[20px]">{resource.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-[#0D0D0D] mb-1">{resource.title}</h4>
                      <p className="text-xs text-[#888] mb-2">{resource.meta}</p>
                      <p className="text-sm text-[#666] leading-relaxed mb-2">
                        {resource.desc}
                      </p>
                      <span className="text-[#009B00] text-xs font-semibold">{resource.cta}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How to Request Support */}
        <div className="bg-[#F3F3F3] py-[35px] px-10 -mx-10 mb-8">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold mb-2 text-[#0D0D0D]">How to Request Support</h2>
            <p className="text-base text-[#666] mb-6">Get help with your BVA and business cases</p>

            <div className="bg-[#F9FAFB] border-l-2 border-[#8C69F0] rounded p-5 mb-4">
              <p className="text-sm text-[#4A4A4A] mb-3 leading-relaxed">
                Always start with our self-service BVA tools and <a href="#" className="text-[#009B00] font-semibold hover:underline">reach out for enablement support</a> to learn how to use them.
              </p>
              <div className="space-y-2 text-sm text-[#4A4A4A]">
                <div className="flex gap-3">
                  <span className="text-[#8C69F0] font-bold flex-shrink-0">1.</span>
                  <p><strong>Identify your need:</strong> Use BVA resources on this site</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8C69F0] font-bold flex-shrink-0">2.</span>
                  <p><strong>Reach out with questions via:</strong> Support request workflow</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#8C69F0] font-bold flex-shrink-0">3.</span>
                  <p><strong>Fill out assessment if needed:</strong> 1:1 call with SC (optional)</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5">
                <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-3">Who to Contact</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">BVA methodology:</p>
                    <p className="text-[#666]">Revenue Enablement team</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">Technical issues:</p>
                    <p className="text-[#666]">Christian (Staff Revenue Enablement Manager)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">Presentation support:</p>
                    <p className="text-[#666]">Gina (templates and operations)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">Customer-specific guidance:</p>
                    <p className="text-[#666]">Your aligned SC</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5">
                <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-3">Slack Channels & Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">#revenue-enablement</p>
                    <p className="text-[#666]">General questions</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">#bva-program</p>
                    <p className="text-[#666]">Tips, wins, and peer support</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">#sales</p>
                    <p className="text-[#666]">Share BVA success stories</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">Office Hours:</p>
                    <p className="text-[#666] text-xs">Weekly drop-in: Tuesdays 2-3pm PT</p>
                    <p className="text-[#666] text-xs">Monthly deep-dive: Last Friday of month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Links */}
        <div className="bg-gradient-to-br from-[#F3F3F3] to-[#DFDFDF] rounded-xl p-12 text-center">
          <div className="text-[48px] mb-4">🧮</div>
          <h2 className="text-[18px] text-[#0D0D0D] font-bold mb-4">Ready to Build Your Analysis?</h2>
          <p className="text-[16px] text-[#4A4A4A] mb-8 max-w-[700px] mx-auto">
            Access the calculators and start quantifying value today
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto mb-8">
            {/* Pre-Sales BVA Calculator */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#F3F3F3] rounded-lg p-3">
                  <span className="text-[32px]">📊</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0D0D0D]">Pre-Sales BVA</h3>
                  <p className="text-sm text-[#8C69F0]">For Prospects</p>
                </div>
              </div>
              <p className="text-[15px] text-[#666] mb-6">
                Choose from 101, 201, or 301 based on available data. Build projected ROI for deals.
              </p>
              <a href="#" className="bg-[#8C69F0] text-white px-6 py-3 rounded font-semibold text-base hover:bg-[#7B52D9] transition-all inline-block w-full text-center">
                Open BVA Calculator →
              </a>
            </div>

            {/* ROI Calculator */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FAE8FF] rounded-lg p-3">
                  <span className="text-[32px]">🎯</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0D0D0D]">ROI Calculator</h3>
                  <p className="text-sm text-[#C084FC]">For Customers</p>
                </div>
              </div>
              <p className="text-[15px] text-[#666] mb-6">
                Pull Sidekick metrics and generate value reports for renewals and QBRs.
              </p>
              <a href="#" className="bg-[#C084FC] text-white px-6 py-3 rounded font-semibold text-base hover:bg-[#A855F7] transition-all inline-block w-full text-center">
                Open ROI Calculator →
              </a>
            </div>
          </div>

          <p className="text-sm text-[#666]">Questions? Join weekly office hours or reach out in #bva-program</p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a href="/coe" className="text-[#009B00] hover:text-[#007A00] font-semibold">
            ← Back to Center of Excellence
          </a>
        </div>
      </div>
    </div>
  );
}
