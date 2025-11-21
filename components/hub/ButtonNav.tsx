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
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonChange(button.id)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                activeButton === button.id
                  ? `${button.color || 'bg-[#8C69F0]'} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {button.icon && <span className="text-base">{button.icon}</span>}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
