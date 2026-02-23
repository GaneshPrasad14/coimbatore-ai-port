import { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface PortfolioCardProps {
  domain: string;
  description: string;
  index: number;
}

const PortfolioCard = ({ domain, description, index }: PortfolioCardProps) => {
  // Generate a screenshot URL using a placeholder service
  const screenshotUrl = `https://image.thum.io/get/width/800/crop/600/https://${domain}`;

  return (
    <div
      className="group relative glass-card overflow-hidden transition-colors duration-500"
    >
      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        <img
          src={screenshotUrl}
          alt={`${domain} website`}
          className="w-full h-full object-cover object-top transition-opacity duration-1000 ease-out"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />

        {/* Overlay - Gradient Reveal */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />

        {/* External Link Icon - Centered Reveal */}
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
        >
          <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <ExternalLink size={24} />
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-gray-300 transition-colors">
          {domain}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
