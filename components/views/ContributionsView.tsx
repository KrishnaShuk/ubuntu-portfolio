// components/views/ContributionsView.tsx
import { Contribution } from '@/data/contributions';
import { FiGithub } from 'react-icons/fi';

interface ContributionsViewProps {
  contributions: Contribution[];
}

export default function ContributionsView({ contributions }: ContributionsViewProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-100">Open Source Contributions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributions.map((contrib) => (
          <a
            key={contrib.id}
            href={contrib.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-[#2c2c2c] rounded-lg border border-transparent hover:border-theme-accent hover:bg-white/5 transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-3">
              <FiGithub className="text-gray-400 mr-3 flex-shrink-0" />
              <h3 className="font-bold text-gray-100 truncate">{contrib.repo}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {contrib.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}