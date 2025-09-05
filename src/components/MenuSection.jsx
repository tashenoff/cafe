import { useState } from 'react';
import MenuItem from './MenuItem';

const MenuSection = ({ section, onAddToCart, onOpenModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-12">
      {/* Заголовок секции */}
      <div 
        className="flex items-center justify-between mb-6 pb-4 border-b border-gradient-to-r from-[#ff60a6]/40 via-purple-500/30 to-[#ff60a6]/40 cursor-pointer select-none group hover:border-[#ff60a6]/60 transition-all duration-300"
        onClick={toggleSection}
        tabIndex="0"
        role="button"
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSection();
          }
        }}
      >
        <div className="flex items-center gap-3">
          <span 
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full bg-gradient-to-tr from-[#ff60a6] via-purple-500 to-violet-500 shadow-lg shadow-[#ff60a6]/30 group-hover:shadow-[#ff60a6]/50 group-hover:scale-110 transition-all duration-300"
          ></span>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#ff60a6] via-purple-400 to-violet-400 bg-clip-text text-transparent group-hover:from-[#ff60a6] group-hover:to-[#ff60a6] transition-all duration-300">
            <span className="mr-3 text-xl">{section.icon}</span>
            {section.category}
          </h2>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 text-[#ff60a6] rounded-2xl px-4 py-2 bg-gradient-to-r from-[#ff60a6]/5 to-purple-500/5 hover:from-[#ff60a6]/20 hover:to-purple-500/20 focus:outline-none focus:ring-2 focus:ring-[#ff60a6]/40 backdrop-blur-sm border border-white/10 hover:border-[#ff60a6]/30 transition-all duration-300 shadow-lg hover:shadow-[#ff60a6]/20"
          aria-label={`Свернуть/развернуть: ${section.category}`}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Товары */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out ${
        isExpanded ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        {section.items.map((item, index) => (
          <MenuItem
            key={`${section.category}-${index}`}
            item={item}
            onAddToCart={onAddToCart}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
