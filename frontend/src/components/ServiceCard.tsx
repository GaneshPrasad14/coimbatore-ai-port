import { useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  return (
    <div
      className="group relative glass-card p-8 hover:bg-white/[0.05] transition-colors duration-500"
    >
      {/* Gradient Border Effect on Hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-500">
          <Icon size={24} className="text-white group-hover:text-black transition-colors duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white transition-colors">{title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">{description}</p>

        {/* Hover Arrow */}
        <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <span className="uppercase tracking-widest text-xs">Discover</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
