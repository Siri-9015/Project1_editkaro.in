import React, { useState } from 'react';
import { Play, Eye, Flame, Award, Wrench, Sparkles, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';
import { soundFX } from '../lib/soundUtils';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, onSelectItem }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  if (items.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-white/5 rounded-2xl border border-white/10 max-w-2xl mx-auto my-12">
        <Sparkles className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-pulse" />
        <h3 className="text-lg font-bold text-white mb-2">No videos matched your filter</h3>
        <p className="text-sm text-slate-400">
          Try clearing your search query or selecting a different video editing category above.
        </p>
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-12 bg-[#090A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our High-Impact Edits & Viral Campaigns
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Click on any project to open the interactive video breakdown, key editing techniques, frame-by-frame stepper, and performance stats.
          </p>
        </div>

        {/* Dynamic Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isVertical = item.aspectRatio === '9:16';

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  soundFX.playSwoosh();
                  onSelectItem(item);
                }}
                className={`group relative rounded-2xl bg-[#0D0E15] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between ${
                  item.featured ? 'ring-2 ring-violet-500/40' : ''
                }`}
              >
                
                {/* Media Container */}
                <div
                  className={`relative w-full bg-slate-950 overflow-hidden ${
                    isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? 'scale-105 opacity-20' : 'scale-100 opacity-90'
                    }`}
                  />

                  {/* Video Preview on Hover */}
                  {isHovered && !videoErrors[item.id] && (
                    <video
                      src={item.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      onError={() => {
                        setVideoErrors((prev) => ({ ...prev, [item.id]: true }));
                      }}
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-white/15">
                      {item.categoryLabel}
                    </span>

                    {item.metrics.views && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg">
                        <Flame className="w-3 h-3 fill-black" />
                        <span>{item.metrics.views}</span>
                      </span>
                    )}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-slate-300 z-10">
                    {item.duration}
                  </div>

                  {/* Hover Play Button Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 z-20 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>

                </div>

                {/* Card Meta Body */}
                <div className="p-5 space-y-4 bg-gradient-to-b from-[#0D0E15] to-[#12141F]">
                  
                  {/* Client & Title */}
                  <div>
                    <span className="text-xs text-slate-400 font-medium block mb-1">
                      Client: {item.client}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                    <div className="bg-white/5 p-2 rounded-lg text-left">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Watch Retention
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400">
                        {item.metrics.retention}
                      </span>
                    </div>

                    <div className="bg-white/5 p-2 rounded-lg text-left">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {item.metrics.conversion ? 'Ad Conversion' : 'Total Likes'}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400">
                        {item.metrics.conversion || item.metrics.likes || 'Viral Reach'}
                      </span>
                    </div>
                  </div>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                    <span>Inspect Breakdown & Stepper</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
