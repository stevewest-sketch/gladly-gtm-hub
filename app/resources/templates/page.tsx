export default function TemplateGalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-white py-[50px] px-10" style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-[48px] font-bold mb-4">Template Gallery</h1>
          <p className="text-[18px] max-w-[800px] mx-auto">
            Deck templates and slide inserts for your presentations
          </p>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="bg-white py-5 px-10 sticky top-0 z-[100] shadow-sm">
        <div className="flex gap-3 justify-center items-center flex-wrap max-w-[1200px] mx-auto">
          <a href="#brand-guidelines" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Brand Guidelines
          </a>
          <a href="#pitch-decks" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Pitch Decks
          </a>
          <a href="#product-decks" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Product Decks
          </a>
          <a href="#security-rfx" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Security + RFX
          </a>
          <a href="#implementation" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Implementation
          </a>
          <a href="#feature-slides" className="bg-[#F3F3F3] px-5 py-2.5 rounded text-sm font-semibold text-[#0D0D0D] hover:bg-[#8C69F0] hover:text-white transition-all">
            Feature Slides
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">

        {/* Brand Guidelines */}
        <div id="brand-guidelines" className="bg-white rounded-xl p-8 mb-[50px] shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">🎨</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Brand Guidelines</h2>
              <p className="text-sm text-[#666]">Branded templates and style guides</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
            <a href="#" className="bg-white border-[3px] border-[#8C69F0] rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col no-underline">
              <div className="bg-[#F3F3F3] min-h-[280px] flex items-center justify-center text-[#9ca3af] text-sm font-semibold border-b-2 border-[#E8E0F8]">
                Preview: Brand Guidelines Deck
              </div>
              <div className="p-7">
                <h3 className="text-2xl text-[#0D0D0D] font-bold mb-3">Gladly Brand Guidelines Deck</h3>
                <p className="text-[15px] text-[#4A4A4A] mb-4 leading-relaxed">
                  Complete brand style guide including logos, colors, typography, imagery guidelines, and best practices for creating on-brand materials
                </p>
                <div className="text-[13px] text-[#888] mb-5">45 slides • Updated Sep 2024</div>
                <span className="inline-block bg-[#8C69F0] text-white px-7 py-3 rounded font-semibold text-[15px] hover:bg-[#7557d9] transition-all">
                  Open Deck
                </span>
              </div>
            </a>

            <div className="flex flex-col gap-4">
              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Logo Assets</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">All logo variations and usage guidelines</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Download Assets →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Color Palette</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Official color codes and application examples</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Palette →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pitch Decks */}
        <div id="pitch-decks" className="bg-[#F3F3F3] py-[50px] px-10 -mx-10 mb-[50px] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
              <span className="text-[40px]">📊</span>
              <div>
                <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Pitch Decks</h2>
                <p className="text-sm text-[#666]">Full presentation templates for customer pitches</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
              <a href="#" className="bg-white border-[3px] border-[#8C69F0] rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col no-underline">
                <div className="bg-[#F3F3F3] min-h-[280px] flex items-center justify-center text-[#9ca3af] text-sm font-semibold border-b-2 border-[#E8E0F8]">
                  Preview: First Meeting Pitch Deck
                </div>
                <div className="p-7">
                  <h3 className="text-2xl text-[#0D0D0D] font-bold mb-3">First Meeting Pitch Deck</h3>
                  <p className="text-[15px] text-[#4A4A4A] mb-4 leading-relaxed">
                    Comprehensive first meeting template covering company overview, product capabilities, customer success stories, and next steps
                  </p>
                  <div className="text-[13px] text-[#888] mb-5">32 slides • Updated Oct 2024</div>
                  <span className="inline-block bg-[#8C69F0] text-white px-7 py-3 rounded font-semibold text-[15px] hover:bg-[#7557d9] transition-all">
                    Open Deck
                  </span>
                </div>
              </a>

              <div className="flex flex-col gap-4">
                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Specialized Team Pitch</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Pitch template for specialized team conversations</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>

                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Custom Template w/o Hero</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Customizable deck template without Hero content</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>

                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Buyer Persona Pitch</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Persona-specific pitch deck template</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">First Day Experience</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Day 1 pitch template</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Pitch (no team section)</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Streamlined pitch deck</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product Decks */}
        <div id="product-decks" className="bg-white rounded-xl p-8 mb-[50px] shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">📱</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Product Decks</h2>
              <p className="text-sm text-[#666]">Deep dive product presentation templates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
            <a href="#" className="bg-white border-[3px] border-[#8C69F0] rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col no-underline">
              <div className="bg-[#F3F3F3] min-h-[280px] flex items-center justify-center text-[#9ca3af] text-sm font-semibold border-b-2 border-[#E8E0F8]">
                Preview: Sidekick for Enterprise
              </div>
              <div className="p-7">
                <h3 className="text-2xl text-[#0D0D0D] font-bold mb-3">Sidekick for Enterprise</h3>
                <p className="text-[15px] text-[#4A4A4A] mb-4 leading-relaxed">
                  Enterprise-focused Sidekick presentation covering advanced features, security, scalability, and integration capabilities
                </p>
                <div className="text-[13px] text-[#888] mb-5">38 slides • Updated Oct 2024</div>
                <span className="inline-block bg-[#8C69F0] text-white px-7 py-3 rounded font-semibold text-[15px] hover:bg-[#7557d9] transition-all">
                  Open Deck
                </span>
              </div>
            </a>

            <div className="flex flex-col gap-4">
              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Product Storytelling Deck</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Narrative-driven product presentation</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Zendesk Alternative</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Competitive positioning against Zendesk</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Deep Dive Roadmap Kit</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Roadmap presentation template</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Security + RFX */}
        <div id="security-rfx" className="bg-[#F3F3F3] py-[50px] px-10 -mx-10 mb-[50px] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
              <span className="text-[40px]">🔒</span>
              <div>
                <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Security + RFX Templates</h2>
                <p className="text-sm text-[#666]">Security presentations and RFP response templates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
              <a href="#" className="bg-white border-[3px] border-[#8C69F0] rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col no-underline">
                <div className="bg-[#F3F3F3] min-h-[280px] flex items-center justify-center text-[#9ca3af] text-sm font-semibold border-b-2 border-[#E8E0F8]">
                  Preview: Security & SOC 2 Overview
                </div>
                <div className="p-7">
                  <h3 className="text-2xl text-[#0D0D0D] font-bold mb-3">Architecture, Security, and SOC 2</h3>
                  <p className="text-[15px] text-[#4A4A4A] mb-4 leading-relaxed">
                    Comprehensive security presentation covering system architecture, security controls, compliance certifications, and data protection
                  </p>
                  <div className="text-[13px] text-[#888] mb-5">42 slides • Updated Oct 2024</div>
                  <span className="inline-block bg-[#8C69F0] text-white px-7 py-3 rounded font-semibold text-[15px] hover:bg-[#7557d9] transition-all">
                    Open Deck
                  </span>
                </div>
              </a>

              <div className="flex flex-col gap-4">
                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">RFP Response Template</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Standard template for responding to RFPs</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>

                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">RFI Response Template</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Standard template for responding to RFIs</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>

                <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                  <h4 className="text-base text-[#0D0D0D] font-bold mb-2">VSA Response Template</h4>
                  <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Vendor security assessment template</p>
                  <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div id="implementation" className="bg-white rounded-xl p-8 mb-[50px] shadow-sm scroll-mt-24">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
            <span className="text-[40px]">⚙️</span>
            <div>
              <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Implementation Decks</h2>
              <p className="text-sm text-[#666]">Customer onboarding and implementation templates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
            <a href="#" className="bg-white border-[3px] border-[#8C69F0] rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col no-underline">
              <div className="bg-[#F3F3F3] min-h-[280px] flex items-center justify-center text-[#9ca3af] text-sm font-semibold border-b-2 border-[#E8E0F8]">
                Preview: Customer Onboarding Kickoff
              </div>
              <div className="p-7">
                <h3 className="text-2xl text-[#0D0D0D] font-bold mb-3">Customer Onboarding Kickoff</h3>
                <p className="text-[15px] text-[#4A4A4A] mb-4 leading-relaxed">
                  Complete kickoff presentation covering implementation timeline, milestones, team introductions, and success criteria
                </p>
                <div className="text-[13px] text-[#888] mb-5">28 slides • Updated Sep 2024</div>
                <span className="inline-block bg-[#8C69F0] text-white px-7 py-3 rounded font-semibold text-[15px] hover:bg-[#7557d9] transition-all">
                  Open Deck
                </span>
              </div>
            </a>

            <div className="flex flex-col gap-4">
              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">90 Day Implementation</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Phased implementation roadmap template</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">QBR Deck Template</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Quarterly business review presentation</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-5 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Success Renewal Deck</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Renewal conversation template</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">Open Template →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Feature Slides */}
        <div id="feature-slides" className="bg-[#F3F3F3] py-[50px] px-10 -mx-10 mb-[50px] scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-[3px] border-[#E8E0F8]">
              <span className="text-[40px]">✨</span>
              <div>
                <h2 className="text-[26px] text-[#1a1a1a] font-semibold mb-1">Feature Slides</h2>
                <p className="text-sm text-[#666]">Individual feature slides to insert into presentations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Auto Translate Feature Slides</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Slides showcasing automatic translation capabilities</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Slides →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">E-Escalate Widget</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Feature slides for escalation widget</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Slides →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Assisted Auth Slides</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Authentication feature presentation</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Slides →</span>
              </a>

              <a href="#" className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col no-underline">
                <h4 className="text-base text-[#0D0D0D] font-bold mb-2">Product Storytelling Slides</h4>
                <p className="text-[13px] text-[#4A4A4A] mb-3 leading-snug flex-grow">Narrative feature presentations</p>
                <span className="text-[#8C69F0] font-semibold text-[13px]">View Slides →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
