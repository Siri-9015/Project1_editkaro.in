import React from 'react';
import { Search, Smartphone, Monitor, Grid, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/portfolioData';
import { VideoCategory } from '../types';
import { soundFX } from '../lib/soundUtils';

interface CategoryFilterProps {
  selectedCategory: VideoCategory;
  onSelectCategory: (cat: VideoCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  aspectFilter: 'all' | '9:16' | '16:9';
  onAspectFilterChange: (aspect: 'all' | '9:16' | '16:9') => void;
  filteredCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  aspectFilter,
  onAspectFilterChange,
  filteredCount,
}) => {
  return (
    <section id="categories" className="py-8 bg-[#0D0E15] border-y border-white/10 sticky top-[80px] z-30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Controls Bar: Search & Aspect Ratio Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by client, title or tool..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Aspect Ratio Filter Toggles */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
            <span className="text-[11px] text-slate-400 font-semibold px-2 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3" /> Aspect:
            </span>
            <button
              onClick={() => {
                soundFX.playPop();
                onAspectFilterChange('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                aspectFilter === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => {
                soundFX.playPop();
                onAspectFilterChange('9:16');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                aspectFilter === '9:16'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>9:16 Reels</span>
            </button>
            <button
              onClick={() => {
                soundFX.playPop();
                onAspectFilterChange('16:9');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                aspectFilter === '16:9'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span>16:9 YouTube</span>
            </button>
          </div>

          {/* Result Count Badge */}
          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-cyan-400 font-bold">{filteredCount}</span> projects
          </div>

        </div>

        {/* Category Pill Scroll Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playSwoosh();
                  onSelectCategory(cat.id);
                }}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-black/40 text-cyan-200' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
