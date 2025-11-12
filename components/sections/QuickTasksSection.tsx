import QuickTaskCard from '../homepage/QuickTaskCard';
import { GradientDivider } from '@/components/ui';

interface Task {
  emoji: string;
  title: string;
  link: string;
}

interface QuickTasksSectionProps {
  sectionTitle?: string;
  tasks: Task[];
}

export default function QuickTasksSection({
  sectionTitle = 'What do you need to do today?',
  tasks,
}: QuickTasksSectionProps) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <>
      <GradientDivider gradient="blue" />

      <div className="mb-[50px]">
        <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-6">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <QuickTaskCard
              key={index}
              emoji={task.emoji}
              title={task.title}
              link={task.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
