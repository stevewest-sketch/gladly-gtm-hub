'use client'

interface ButtonNavProps {
  buttons: Array<{
    id: string
    label: string
    icon?: string
    color?: string
  }>
  activeButton: string
  onButtonChange: (buttonId: string) => void
}

export default function ButtonNav({ buttons, activeButton, onButtonChange }: ButtonNavProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonChange(button.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 flex items-center ${
                activeButton === button.id
                  ? `${button.color || 'bg-[#8C69F0]'} text-white shadow-lg scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
              }`}
            >
              {button.icon && <span className="mr-2">{button.icon}</span>}
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
