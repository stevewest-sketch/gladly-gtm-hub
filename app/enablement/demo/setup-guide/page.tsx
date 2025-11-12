'use client';

import QuickNav from '@/components/QuickNav';
import { GradientDivider } from '@/components/ui';
import { gradients } from '@/lib/theme';

export default function DemoSetupGuidePage() {
  const navLinks = [
    { label: 'Objective', anchor: 'objective' },
    { label: 'Getting Started', anchor: 'getting-started' },
    { label: 'Environment', anchor: 'environment' },
    { label: 'Reset Process', anchor: 'reset' },
    { label: 'Setup', anchor: 'logging-in' },
    { label: 'Demo Flow', anchor: 'demo-flow' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-white py-12 px-6" style={{background: gradients.purple}}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <a href="/enablement/demo" className="text-white hover:text-opacity-80 text-sm font-medium">
              ← Back to Demo Hub
            </a>
          </div>
          <div className="flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Demoing Gladly Setup Guide</h1>
              <p className="text-lg opacity-90">A step-by-step walkthrough for setting up and delivering compelling product demonstrations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex-shrink-0">
              <p className="text-xs font-medium mb-1 opacity-75">Demo Org Password</p>
              <p className="text-2xl font-mono font-bold tracking-wide">powerOf&</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickNav links={navLinks} />

      <div className="max-w-6xl mx-auto px-10 py-12">

        <GradientDivider gradient="purple" />

        {/* Demo Objective */}
        <section id="objective" className="mb-16 scroll-mt-20">
          <div className="bg-[#F5F3FF] rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%) 1'}}>
            <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-3">Demo Objective</h2>
            <p className="text-[14px] text-[#666666] mb-6">Your demo should prove that Gladly is:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 bg-[#8C69F0] rounded-full flex-shrink-0"></div>
                <p className="text-[#666666]">A modern, end-to-end, AI-powered, people-centered customer service platform</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 bg-[#8C69F0] rounded-full flex-shrink-0"></div>
                <p className="text-[#666666]">Built around a customer-centric data model (not ticket-first)</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 bg-[#8C69F0] rounded-full flex-shrink-0"></div>
                <p className="text-[#666666]">Powered by Sidekick for automation, contextual recommendations, and seamless agent assist</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 bg-[#8C69F0] rounded-full flex-shrink-0"></div>
                <p className="text-[#666666]">Radically personal and efficient, with clear value for both service and sales teams</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 bg-[#8C69F0] rounded-full flex-shrink-0"></div>
                <p className="text-[#666666]">Unlike legacy platforms, Gladly integrates voice, SMS, chat, and more into a single conversation</p>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="blue" />

        {/* Getting Started */}
        <section id="getting-started" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%) 1'}}>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#3B82F6] text-white rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
              <div>
                <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-2">Getting Started</h2>
                <p className="text-[14px] text-[#666666]">Join the right channels and understand the fundamentals</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Slack Channels */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Join Slack Channels</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <p className="font-mono font-semibold text-[#3B82F6] mb-1">#demo</p>
                    <p className="text-[13px] text-[#666666]">Updates & announcements</p>
                  </div>
                  <div className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <p className="font-mono font-semibold text-[#3B82F6] mb-1">#demo-support</p>
                    <p className="text-[13px] text-[#666666]">Help & troubleshooting</p>
                  </div>
                  <div className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <p className="font-mono font-semibold text-[#3B82F6] mb-1">#demo-roadmap</p>
                    <p className="text-[13px] text-[#666666]">Future plans</p>
                  </div>
                  <div className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <p className="font-mono font-semibold text-[#3B82F6] mb-1">#demo-notification</p>
                    <p className="text-[13px] text-[#666666]">Reset status</p>
                  </div>
                </div>
              </div>

              {/* Understanding Demo Orgs */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Understanding Demo Orgs</h3>
                <div className="space-y-3">
                  <details className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <summary className="font-semibold text-[#0D0D0D] cursor-pointer">What is a demo org?</summary>
                    <p className="text-[#666666] mt-3">A dedicated Gladly instance for product demonstrations with pre-configured channels, endpoints, and Sidekick integration.</p>
                  </details>
                  <details className="p-4 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                    <summary className="font-semibold text-[#0D0D0D] cursor-pointer">What is Retalè?</summary>
                    <p className="text-[#666666] mt-3">A fictional Shopify storefront for realistic eCommerce demo flows. <a href="https://retale-gladly.myshopify.com/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] font-semibold hover:underline">Visit Store →</a></p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="purple" />

        {/* Environment Access */}
        <section id="environment" className="mb-16 scroll-mt-20">
          <div className="bg-[#F5F3FF] rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%) 1'}}>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#8C69F0] text-white rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
              <div>
                <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-2">Environment Access</h2>
                <p className="text-[14px] text-[#666666]">Verify you have all demo components set up</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Demo Org */}
              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-white hover:border-[#8C69F0] transition-all duration-300">
                <h3 className="font-semibold text-[#0D0D0D] mb-2">Demo Org</h3>
                <p className="text-[#666666] mb-4">Check the demo orgs list for your assignment</p>
                <a href="#" style={{background: 'linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)'}} className="inline-block text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  View Demo Orgs List →
                </a>
              </div>

              {/* Retalè Access */}
              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-white hover:border-[#8C69F0] transition-all duration-300">
                <h3 className="font-semibold text-[#0D0D0D] mb-4">Retalè Access</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-[13px] text-[#666666]">Store: </span>
                    <a href="https://retale-gladly.myshopify.com/" target="_blank" rel="noopener noreferrer" className="text-[#8C69F0] font-semibold hover:underline">retale-gladly.myshopify.com</a>
                  </div>
                  <div>
                    <span className="text-[13px] text-[#666666]">Password: </span>
                    <code className="font-mono font-semibold text-[#374151]">gladly</code>
                  </div>
                </div>
              </div>

              {/* Required Plugins */}
              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-white hover:border-[#8C69F0] transition-all duration-300">
                <h3 className="font-semibold text-[#0D0D0D] mb-4">Required Plugins</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#0D0D0D]">Gladly Chat Plugin</p>
                    <a href="#" className="text-[#8C69F0] font-semibold hover:underline text-sm">Install →</a>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#0D0D0D]">Help Center Plugin</p>
                    <a href="https://drive.google.com/file/d/1VEeo0E1oJTdQsq5a_lnBl6-4u6RoMjU6/view" target="_blank" rel="noopener noreferrer" className="text-[#8C69F0] font-semibold hover:underline text-sm">Download →</a>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#0D0D0D]">iOS Chat Demo</p>
                    <a href="https://testflight.apple.com/join/PHNd7bd5" target="_blank" rel="noopener noreferrer" className="text-[#8C69F0] font-semibold hover:underline text-sm">TestFlight →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="blue" />

        {/* Demo Reset Process */}
        <section id="reset" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%) 1'}}>
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6] text-white rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
                <div>
                  <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-2">Demo Reset Process</h2>
                  <p className="text-[14px] text-[#666666]">How to reset your demo environment before each demo</p>
                </div>
              </div>
              <div className="bg-[#DBEAFE] rounded-lg p-4 border-l-4 border-[#3B82F6] flex-shrink-0">
                <p className="font-semibold text-[#1a1a1a]">⏱️ 5-6 minutes</p>
                <p className="text-[13px] text-[#666666] mt-1">Start 15-30 mins before</p>
              </div>
            </div>

            {/* Reset Flow */}
            <div className="space-y-4">
              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-[#0D0D0D] mb-1">Type /demo-reset</h4>
                    <p className="text-[#666666]">In any Slack channel or DM</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-[#0D0D0D] mb-2">Select Options</h4>
                    <ul className="text-[#666666] space-y-1">
                      <li>• Your org name</li>
                      <li>• Dataset: genericRetail</li>
                      <li>• Environment: demo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-[#0D0D0D] mb-1">Click "Submit"</h4>
                    <p className="text-[#666666]">Reset process begins</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-2 border-[#3B82F6] rounded-lg bg-[#DBEAFE]">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-[#0D0D0D] mb-2">Wait for Confirmation</h4>
                    <div className="space-y-1 text-[#666666]">
                      <div>⚪ In progress</div>
                      <div>🟢 Success</div>
                      <div>🔴 Failed (retry if needed)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="purple" />

        {/* Logging In */}
        <section id="logging-in" className="mb-16 scroll-mt-20">
          <div className="bg-[#F5F3FF] rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%) 1'}}>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#8C69F0] text-white rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">4</div>
              <div>
                <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-2">Logging In & Setup</h2>
                <p className="text-[14px] text-[#666666]">Complete these steps after reset confirmation</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Log into Gladly</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[13px] text-[#666666] mb-1">Agent Login:</p>
                    <code className="text-sm font-mono text-[#374151] bg-gray-50 px-3 py-1.5 rounded">agent@[yourorg].gladly.com</code>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#666666] mb-1">Admin Login:</p>
                    <code className="text-sm font-mono text-[#374151] bg-gray-50 px-3 py-1.5 rounded">admin@[yourorg].gladly.com</code>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border-2 border-[#8C69F0] rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Update Julie Chang</h3>
                    <p className="text-[13px] text-[#666666]">Required after every reset</p>
                  </div>
                </div>
                <ol className="space-y-2 text-[#666666] ml-8">
                  <li>1. Search: Julie Chang</li>
                  <li>2. Click Customers → Julie Chang</li>
                  <li>3. Replace phone with yours</li>
                  <li>4. Mark as SMS + Mobile</li>
                </ol>
              </div>

              <div className="p-5 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Configure Chat Plugin</h3>
                <ol className="space-y-2 text-[#666666]">
                  <li>1. Visit <a href="https://retale-gladly.myshopify.com/" className="text-[#8C69F0] font-semibold hover:underline">Retalè</a></li>
                  <li>2. Click Chat Plugin icon</li>
                  <li>3. Website: <code className="text-sm bg-gray-50 px-2 py-0.5 rounded text-[#374151]">myshop</code></li>
                  <li>4. Customer: Julie Chang</li>
                  <li>5. Org: yourname.gladly.com</li>
                  <li>6. Reset & refresh</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="blue" />

        {/* Best Practices */}
        <section id="best-practices" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%) 1'}}>
            <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-8">Best Practices</h2>

            <div className="space-y-6">
              <div className="p-5 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Before Demo</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li className="flex gap-2"><span className="text-[#3B82F6]">✓</span> Reset 30 mins before</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">✓</span> Log in as agent</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">✓</span> Update Julie's phone</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">✓</span> Save demo number</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">✓</span> Update iOS app</li>
                </ul>
              </div>

              <div className="p-5 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Hardware Setup</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li className="flex gap-2"><span className="text-[#3B82F6]">•</span> Use MacBook mic (not AirPods)</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">•</span> Turn off noise isolation</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">•</span> Hold phone in view</li>
                  <li className="flex gap-2"><span className="text-[#3B82F6]">•</span> Use second screen for notes</li>
                </ul>
              </div>

              <div className="p-5 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#DBEAFE] hover:border-[#3B82F6] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Engagement Tips</h3>
                <div className="space-y-3">
                  <div className="pl-4 border-l-2 border-[#3B82F6]">
                    <p className="text-[13px] text-[#666666] italic">"How does your team handle this today?"</p>
                  </div>
                  <div className="pl-4 border-l-2 border-[#3B82F6]">
                    <p className="text-[13px] text-[#666666] italic">"What channel would you automate first?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider gradient="purple" />

        {/* Demo Flow */}
        <section id="demo-flow" className="mb-16 scroll-mt-20">
          <div className="bg-[#FAFAFA] rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #E8E0F8 0%, #8C69F0 50%, #E8E0F8 100%) 1'}}>
            <div className="mb-8">
              <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-2">Core Demo Flow</h2>
              <p className="text-[14px] text-[#666666]">Follow this 10-15 minute sequence to demonstrate Gladly's complete value proposition</p>
            </div>

            {/* Visual Flow */}
            <div className="space-y-3 mb-8">
              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Proactive Chat</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Sidekick contacts Julie about broken zipper</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Context-aware automation</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Sidekick Actions</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Instant replacement offer</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Efficient resolution</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Sidekick Sales</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Product recommendations</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Not a static chatbot</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Sidekick Answers</h4>
                    <p className="text-[13px] text-[#666666] mb-1">"Can I pick up in-store?"</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Tone-aligned content</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Voice + SMS</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Real-time call + SMS tracking</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: True omnichannel</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Agent Handoff</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Full history + smart suggestions</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Context-rich experience</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">7</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Journeys</h4>
                    <p className="text-[13px] text-[#666666] mb-1">Automation performance insights</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Data-driven improvement</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#F3F3F3] rounded-lg hover:bg-[#E8E0F8] hover:border-[#8C69F0] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8C69F0] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">8</div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Guides Setup</h4>
                    <p className="text-[13px] text-[#666666] mb-1">No-code response logic</p>
                    <p className="text-[13px] text-[#666666] italic">Proves: Business admin control</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Talk Track */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#8C69F0]/20">
              <div className="p-4 bg-white rounded-lg border-l-4 border-green-600">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">✅ Do</h4>
                <ul className="space-y-1 text-[#666666]">
                  <li>• Personalize tone while keeping core messages</li>
                  <li>• Use customer stories ("Crate & Barrel does this...")</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg border-l-4 border-red-600">
                <h4 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">❌ Don't</h4>
                <ul className="space-y-1 text-[#666666]">
                  <li>• Read line-by-line from script</li>
                  <li>• Ask generic questions like "Does this look good?"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Orange Gradient Divider */}
        <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #FFF7ED 0%, #F97316 50%, #FFF7ED 100%)'}}></div>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-xl p-8 border-b-4" style={{borderImage: 'linear-gradient(90deg, #FFF7ED 0%, #F97316 50%, #FFF7ED 100%) 1'}}>
            <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-8">Troubleshooting & Support</h2>

            <div className="space-y-6 mb-8">
              <div className="p-5 bg-white border-l-[3px] border-[#F97316] rounded-lg hover:bg-[#FED7AA] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Generic Dataset Failures</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li>• Retry reset</li>
                  <li>• Check #demo-notification</li>
                  <li>• Contact <a href="#" className="text-[#F97316] font-semibold hover:underline">#demo-support</a> after 2+ failures</li>
                </ul>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-[#F97316] rounded-lg hover:bg-[#FED7AA] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Custom Dataset Issues</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li>• Common with datasets &gt;6 months old</li>
                  <li>• Reset 3+ days before needed</li>
                  <li>• Contact Demo Engineering</li>
                </ul>
              </div>

              <div className="p-5 bg-white border-l-[3px] border-[#F97316] rounded-lg hover:bg-[#FED7AA] transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">Access Problems</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li>• Demo org: <a href="#" className="text-[#F97316] font-semibold hover:underline">#demo-support</a></li>
                  <li>• Plugins: <a href="#" className="text-[#F97316] font-semibold hover:underline">#demo-support</a></li>
                  <li>• iOS app: Consumer team</li>
                </ul>
              </div>
            </div>

            <div className="p-5 bg-[#FFF7ED] rounded-lg border border-[#F97316]/20">
              <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-4">Support Resources</h3>
              <div className="space-y-3 text-[#666666]">
                <div>
                  <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Demo Engineering Team</p>
                  <p>Kaylee Moser, Alice Blank</p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Slack Channels</p>
                  <p>#demo-support, #it-help, #custom-demo-requests</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Checklist */}
        <div className="bg-[#8C69F0]/5 rounded-xl p-8 border border-[#8C69F0]/20">
          <h3 className="text-[26px] font-semibold text-[#1a1a1a] mb-6">Pre-Demo Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Demo reset (30+ mins)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Julie's profile updated</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Demo number saved</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Screen/audio tested</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Notes visible</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Use cases reviewed</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Questions ready</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#F3F3F3]">
              <input type="checkbox" className="w-5 h-5 text-[#8C69F0] rounded" />
              <span className="text-[13px] text-[#666666]">Customer stories prepared</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/enablement/demo" className="text-[#8C69F0] hover:text-[#7557d9] font-medium">
            ← Back to Demo Hub
          </a>
        </div>
      </div>
    </div>
  );
}
