import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  {
    dimension: 'Knowledge',
    human: 0.7,
    ai: 0.9,
  },
  {
    dimension: 'Context',
    human: 0.9,
    ai: 0.3,
  },
  {
    dimension: 'Tools',
    human: 0.8,
    ai: 0.6,
  },
];

export default function HumanVsAIRadarChart() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid className="stroke-gray-300" />
            <PolarAngleAxis 
              dataKey="dimension"
              className="text-sm fill-gray-700"
              tick={{ fontSize: 12, fill: '#374151' }}
            />
            <PolarRadiusAxis 
              angle={90}
              domain={[0, 1]}
              className="text-xs fill-gray-500"
            />
            <Radar
              name="Human"
              dataKey="human"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="AI"
              dataKey="ai"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}