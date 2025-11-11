import QuickTaskCard from '../homepage/QuickTaskCard';

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
      {/* Blue Gradient Divider */}
      <div className="h-1 mb-[50px]" style={{background: 'linear-gradient(90deg, #DBEAFE 0%, #3B82F6 50%, #DBEAFE 100%)'}}></div>

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
