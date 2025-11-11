'use client';

export default function QuickSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6">🚀 Quick Setup Guide</h1>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h2 className="text-2xl font-bold mb-2">Step 1: Authenticate</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Go to <a href="/studio" className="text-blue-600 underline">/studio</a></li>
              <li>Log in with your Sanity account (Google, GitHub, or Email)</li>
              <li>Once logged in, you&apos;ll see the Studio interface</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h2 className="text-2xl font-bold mb-2">Step 2: Create Homepage</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>In Sanity Studio, click <strong>&quot;Homepage&quot;</strong> in the left sidebar</li>
              <li>Fill in the fields using the data below</li>
              <li>Click the green <strong>&quot;Publish&quot;</strong> button when done</li>
            </ol>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h2 className="text-2xl font-bold mb-2">Step 3: View Your Site</h2>
            <p className="text-gray-700">
              Visit <a href="/" className="text-blue-600 underline">http://localhost:3000</a> to see your homepage!
            </p>
          </div>

          {/* Hero Section Data */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">📝 Hero Section Data</h3>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <strong>Hero Title:</strong><br/>
                <code className="bg-white px-2 py-1 rounded">The GTM Hub</code>
              </div>
              <div>
                <strong>Hero Subtitle:</strong><br/>
                <code className="bg-white px-2 py-1 rounded">Your central hub for selling, supporting, and growing with Gladly</code>
              </div>
              <div>
                <strong>Search Placeholder:</strong><br/>
                <code className="bg-white px-2 py-1 rounded">Search for battle cards, templates, demos, product info...</code>
              </div>
            </div>
          </div>

          {/* Team Toolkits */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">💼 Team Toolkits (Add 4 cards)</h3>
            <p className="text-sm mb-4">Click &quot;+ Add item&quot; under Team Toolkits, then fill each card:</p>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <strong>Card 1:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><strong>Emoji:</strong> 💼</li>
                  <li><strong>Title:</strong> Sales Toolkit</li>
                  <li><strong>Description:</strong> Demos, battle cards, plays, and sales materials</li>
                  <li><strong>Link:</strong> /enablement/toolkits/sales</li>
                  <li><strong>Color:</strong> Blue (Sales)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <strong>Card 2:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><strong>Emoji:</strong> 🎯</li>
                  <li><strong>Title:</strong> CSM Toolkit</li>
                  <li><strong>Description:</strong> QBRs, adoption, value tools, and renewal resources</li>
                  <li><strong>Link:</strong> /enablement/toolkits/csm</li>
                  <li><strong>Color:</strong> Purple (CSM)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <strong>Card 3:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><strong>Emoji:</strong> 🔧</li>
                  <li><strong>Title:</strong> SC Toolkit</li>
                  <li><strong>Description:</strong> Demo environments, technical docs, and POC materials</li>
                  <li><strong>Link:</strong> /enablement/toolkits/success</li>
                  <li><strong>Color:</strong> Green (SC)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <strong>Card 4:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><strong>Emoji:</strong> 📣</li>
                  <li><strong>Title:</strong> Marketing Toolkit</li>
                  <li><strong>Description:</strong> Campaigns, content, templates, and brand assets</li>
                  <li><strong>Link:</strong> /enablement/toolkits/marketing</li>
                  <li><strong>Color:</strong> Orange (Marketing)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Tasks */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">⚡ Quick Tasks (Add 6 cards)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border text-sm">
                <strong>1.</strong> 🎬 Prepare for Demo → /enablement/demo
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <strong>2.</strong> 📊 Run a QBR → /qbr
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <strong>3.</strong> ⚔️ Handle Competitor → /enablement/competitive
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <strong>4.</strong> 💰 Build Business Case → /enablement/bva
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <strong>5.</strong> 🚀 Drive Adoption → /coe
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <strong>6.</strong> 🎓 Access Training → /enablement/training
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">🤖 Products (Add 7 cards)</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2 rounded">🤖 Sidekick Standalone</div>
              <div className="bg-white p-2 rounded">📞 Sidekick Voice</div>
              <div className="bg-white p-2 rounded">✉️ Sidekick Email</div>
              <div className="bg-white p-2 rounded">💵 Sidekick Sales</div>
              <div className="bg-white p-2 rounded">🧠 Customer AI</div>
              <div className="bg-white p-2 rounded">🗺️ Guides & Journeys</div>
              <div className="bg-white p-2 rounded">🔌 App Platform</div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">💡 Help Section</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Title:</strong> 💡 Can&apos;t find what you need?</div>
              <div><strong>Description:</strong> Ask in Slack - the team will help you find it</div>
              <div>
                <strong>Button 1:</strong> #enablement-resources (Primary) → https://gladly.slack.com/
              </div>
              <div>
                <strong>Button 2:</strong> Browse All Content (Secondary) → #
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
            <div className="flex gap-4 justify-center">
              <a
                href="/studio"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
              >
                Open Sanity Studio →
              </a>
            </div>
            <p className="mt-4 text-sm opacity-90">
              Tip: Keep this page open while filling in the Studio!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
