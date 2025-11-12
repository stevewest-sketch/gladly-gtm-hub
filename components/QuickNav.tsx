'use client';

interface QuickNavLink {
  label: string;
  anchor: string;
}

interface QuickNavProps {
  links: QuickNavLink[];
}

export default function QuickNav({ links }: QuickNavProps) {
  if (!links || links.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      const offset = 96; // Height of fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white py-6 px-6 sticky top-0 z-[100]">
      <div className="flex gap-2 justify-center items-center max-w-[1400px] mx-auto overflow-x-auto">
        {links.map((link, index) => (
          <a
            key={index}
            href={`#${link.anchor}`}
            onClick={(e) => handleClick(e, link.anchor)}
            className="bg-neutral-background px-5 py-2.5 rounded text-sm font-semibold text-neutral-black hover:bg-primary-purple hover:text-white hover:-translate-y-0.5 transition-all whitespace-nowrap flex-shrink-0"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
