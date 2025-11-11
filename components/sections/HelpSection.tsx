import HelpSectionComponent from '../homepage/HelpSection';

interface Button {
  text: string;
  link: string;
  variant: 'primary' | 'secondary';
}

interface HelpSectionProps {
  title?: string;
  description?: string;
  buttons: Button[];
}

export default function HelpSection({
  title = '💡 Can\'t find what you need?',
  description = 'Ask in Slack - the team will help you find it',
  buttons,
}: HelpSectionProps) {
  return (
    <HelpSectionComponent
      title={title}
      description={description}
      buttons={buttons}
    />
  );
}
