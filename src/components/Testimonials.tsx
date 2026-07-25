import React from 'react';
import { Star, Quote, Award, Sparkles, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-[#0D0E15] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-violet-400 uppercase tracking-widest px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
            Creator & Brand Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved By Top Creators & High-Growth Brands
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Here's what YouTubers, Esports teams, and eCommerce founders have to say about working with Editkaro.in.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl group"
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote Body */}
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                "{t.comment}"
              </p>

              {/* Metric Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Result: {t.metricAchieved}</span>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-cyan-400/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {t.name} <span className="text-slate-400 font-normal">{t.handle}</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.channelType} • <span className="text-cyan-400 font-mono">{t.subscribersOrReach}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
