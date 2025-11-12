interface BenchmarkPhase {
  period: string;
  target: string;
  focus: string;
  metrics: string;
  actions: string;
}

interface BenchmarkTableProps {
  phases: BenchmarkPhase[];
  title?: string;
}

export default function BenchmarkTable({ phases, title = "Performance Benchmarks" }: BenchmarkTableProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-[#0D0D0D] text-white p-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <span>📊</span>
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Timeline
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Target
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Focus Area
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Key Metrics
              </th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-bold text-[#0D0D0D]">{phase.period}</div>
                </td>
                <td className="p-4">
                  <div className="text-2xl font-bold text-primary-purple">
                    {phase.target}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {phase.focus}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {phase.metrics}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {phase.actions}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
