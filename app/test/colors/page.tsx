'use client';

export default function ColorPalettePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Purple Gradient */}
      <div className="bg-gradient-to-br from-[#6B46C1] via-[#8C69F0] to-[#A78BFA] text-white py-20 px-10">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-5xl font-bold mb-4">Color Palette Test Page</h1>
          <p className="text-xl opacity-90">Exploring the Demo Hub color system</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-12">

        {/* Color Swatches */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Core Color Families</h2>

          {/* Purple Family */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Purple Family (Primary Brand)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-24 bg-[#6B46C1] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#6B46C1</p>
                <p className="text-xs text-[#666]">Deep Purple</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#8C69F0] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#8C69F0</p>
                <p className="text-xs text-[#666]">Gladly Purple</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#A78BFA] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#A78BFA</p>
                <p className="text-xs text-[#666]">Light Purple</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#E8E0F8] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#E8E0F8</p>
                <p className="text-xs text-[#666]">Pale Purple</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#F5F3FF] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#F5F3FF</p>
                <p className="text-xs text-[#666]">Ultra Light</p>
              </div>
            </div>
          </div>

          {/* Blue Family */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Blue Family (Complementary)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-24 bg-[#1E40AF] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#1E40AF</p>
                <p className="text-xs text-[#666]">Deep Blue</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#3B82F6] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#3B82F6</p>
                <p className="text-xs text-[#666]">Royal Blue</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#60A5FA] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#60A5FA</p>
                <p className="text-xs text-[#666]">Sky Blue</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#DBEAFE] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#DBEAFE</p>
                <p className="text-xs text-[#666]">Pale Blue</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#EFF6FF] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#EFF6FF</p>
                <p className="text-xs text-[#666]">Ultra Light</p>
              </div>
            </div>
          </div>

          {/* Green Family */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Green Family (Brand, Success)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-24 bg-[#007A00] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#007A00</p>
                <p className="text-xs text-[#666]">Deep Green</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#009B00] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#009B00</p>
                <p className="text-xs text-[#666]">Brand Green</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#10B981] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#10B981</p>
                <p className="text-xs text-[#666]">Light Green</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#D1FAE5] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#D1FAE5</p>
                <p className="text-xs text-[#666]">Pale Green</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#F0FDF4] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#F0FDF4</p>
                <p className="text-xs text-[#666]">Ultra Light</p>
              </div>
            </div>
          </div>

          {/* Black & Neutral Family */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Black & Neutral Family</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-24 bg-[#000000] rounded-lg shadow-md mb-2 border border-gray-200"></div>
                <p className="text-sm font-mono">#000000</p>
                <p className="text-xs text-[#666]">True Black</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#0D0D0D] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#0D0D0D</p>
                <p className="text-xs text-[#666]">Rich Black</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#1a1a1a] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#1a1a1a</p>
                <p className="text-xs text-[#666]">Charcoal</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#374151] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#374151</p>
                <p className="text-xs text-[#666]">Dark Gray</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-[#6B7280] rounded-lg shadow-md mb-2"></div>
                <p className="text-sm font-mono">#6B7280</p>
                <p className="text-xs text-[#666]">Medium Gray</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Gradient Combinations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Purple Hero */}
            <div className="bg-gradient-to-br from-[#6B46C1] via-[#8C69F0] to-[#A78BFA] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Purple Hero</h3>
              <p className="text-sm opacity-90 font-mono">#6B46C1 → #8C69F0 → #A78BFA</p>
            </div>

            {/* Blue Hero */}
            <div className="bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Blue Hero</h3>
              <p className="text-sm opacity-90 font-mono">#1E40AF → #3B82F6 → #60A5FA</p>
            </div>

            {/* Purple to Blue */}
            <div className="bg-gradient-to-r from-[#8C69F0] via-[#6B46C1] to-[#3B82F6] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Purple-to-Blue Transition</h3>
              <p className="text-sm opacity-90 font-mono">#8C69F0 → #6B46C1 → #3B82F6</p>
            </div>

            {/* Dark to Purple */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#6B46C1] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Dark to Purple</h3>
              <p className="text-sm opacity-90 font-mono">#1a1a1a → #6B46C1</p>
            </div>

            {/* Green Success */}
            <div className="bg-gradient-to-br from-[#10B981] to-[#007A00] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Green Success</h3>
              <p className="text-sm opacity-90 font-mono">#10B981 → #007A00</p>
            </div>

            {/* Purple to Green */}
            <div className="bg-gradient-to-r from-[#8C69F0] via-[#3B82F6] to-[#009B00] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Purple-Blue-Green Spectrum</h3>
              <p className="text-sm opacity-90 font-mono">#8C69F0 → #3B82F6 → #009B00</p>
            </div>
          </div>
        </section>

        {/* Button Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Button States</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Purple Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Purple Buttons</h3>
              <button className="w-full bg-gradient-to-br from-[#8C69F0] to-[#6B46C1] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#6B46C1] hover:to-[#8C69F0] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Primary CTA
              </button>
              <button className="w-full border-2 border-[#8C69F0] text-[#8C69F0] px-6 py-3 rounded-lg font-semibold hover:bg-[#F5F3FF] transition-all">
                Secondary
              </button>
            </div>

            {/* Blue Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Blue Buttons</h3>
              <button className="w-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#3B82F6] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Primary CTA
              </button>
              <button className="w-full border-2 border-[#3B82F6] text-[#3B82F6] px-6 py-3 rounded-lg font-semibold hover:bg-[#EFF6FF] transition-all">
                Secondary
              </button>
            </div>

            {/* Green Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Green Buttons</h3>
              <button className="w-full bg-gradient-to-br from-[#10B981] to-[#007A00] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#007A00] hover:to-[#10B981] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Success CTA
              </button>
              <button className="w-full border-2 border-[#009B00] text-[#009B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#F0FDF4] transition-all">
                Secondary
              </button>
            </div>
          </div>
        </section>

        {/* Section Examples with Alternating Pattern */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Section Pattern Examples</h2>

          {/* Purple Section */}
          <div className="bg-[#F5F3FF] rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Purple Theme Section</h3>
            <p className="text-[#666] mb-6">Ultra Light Purple background (#F5F3FF) with purple accents</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 1</h4>
                <p className="text-sm text-[#666]">Hover to see purple accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 2</h4>
                <p className="text-sm text-[#666]">Hover to see purple accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 3</h4>
                <p className="text-sm text-[#666]">Hover to see purple accent</p>
              </div>
            </div>
          </div>

          {/* Blue Section */}
          <div className="bg-[#EFF6FF] rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Blue Theme Section</h3>
            <p className="text-[#666] mb-6">Ultra Light Blue background (#EFF6FF) with blue accents</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 1</h4>
                <p className="text-sm text-[#666]">Hover to see blue accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 2</h4>
                <p className="text-sm text-[#666]">Hover to see blue accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#3B82F6] hover:bg-[#DBEAFE] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 3</h4>
                <p className="text-sm text-[#666]">Hover to see blue accent</p>
              </div>
            </div>
          </div>

          {/* Green Section */}
          <div className="bg-white rounded-xl p-8 border-l-4 border-[#009B00]">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Green Accent Section</h3>
            <p className="text-[#666] mb-6">White background with green accent border-left</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#009B00] hover:bg-[#D1FAE5] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 1</h4>
                <p className="text-sm text-[#666]">Hover to see green accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#009B00] hover:bg-[#D1FAE5] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 2</h4>
                <p className="text-sm text-[#666]">Hover to see green accent</p>
              </div>
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#009B00] hover:bg-[#D1FAE5] transition-all cursor-pointer">
                <h4 className="font-bold text-[#1a1a1a] mb-2">Card 3</h4>
                <p className="text-sm text-[#666]">Hover to see green accent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Typography with Color Context</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-[#0D0D0D] text-2xl font-bold mb-2">Primary Heading (#0D0D0D - Rich Black)</h3>
              <h4 className="text-[#1a1a1a] text-xl font-bold mb-2">Secondary Heading (#1a1a1a - Charcoal)</h4>
              <p className="text-[#374151] text-base mb-2">Dark Gray body text (#374151)</p>
              <p className="text-[#666666] text-base mb-2">Medium Gray descriptive text (#666666)</p>
              <p className="text-[#6B7280] text-sm">Light Gray meta text (#6B7280)</p>
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-[#8C69F0] hover:text-[#6B46C1] transition-colors">Purple Link</a>
              <a href="#" className="text-[#3B82F6] hover:text-[#1E40AF] transition-colors">Blue Link</a>
              <a href="#" className="text-[#009B00] hover:text-[#007A00] transition-colors">Green Link</a>
            </div>
          </div>
        </section>

        {/* Gradient Dividers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Gradient Section Dividers</h2>

          <div className="space-y-8">
            <div>
              <p className="text-sm text-[#666] mb-2">Purple Gradient Divider</p>
              <div className="h-1 bg-gradient-to-r from-[#E8E0F8] via-[#8C69F0] to-[#E8E0F8] rounded-full"></div>
            </div>

            <div>
              <p className="text-sm text-[#666] mb-2">Blue Gradient Divider</p>
              <div className="h-1 bg-gradient-to-r from-[#DBEAFE] via-[#3B82F6] to-[#DBEAFE] rounded-full"></div>
            </div>

            <div>
              <p className="text-sm text-[#666] mb-2">Green Gradient Divider</p>
              <div className="h-1 bg-gradient-to-r from-[#D1FAE5] via-[#009B00] to-[#D1FAE5] rounded-full"></div>
            </div>

            <div>
              <p className="text-sm text-[#666] mb-2">Multi-color Spectrum Divider</p>
              <div className="h-1 bg-gradient-to-r from-[#8C69F0] via-[#3B82F6] to-[#009B00] rounded-full"></div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
