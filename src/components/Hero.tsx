import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Sparkles, TrendingUp, Award, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundFX } from '../lib/soundUtils';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreWork }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heroStats = [
    { label: 'Total Views Generated', value: '120M+', icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Viral Edits Delivered', value: '250+', icon: Zap, color: 'text-amber-400' },
    { label: 'Client Retention', value: '98%', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Average Rating', value: '4.9/5', icon: Award, color: 'text-violet-400' },
  ];

  const tools = [
    'Adobe Premiere Pro',
    'After Effects',
    'DaVinci Resolve Studio',
    'Cinema 4D',
    'Topaz Video AI',
    'Blender 3D',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#090A0F]">
      {/* Glow Effects Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Full-Service Video Editing & Growth Agency</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              We Craft Videos That{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Stop The Scroll
              </span>{' '}
              & Drive Explosive Growth.
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Editkaro.in turns raw camera dumps into high-retention Reels, long-form YouTube essays, high-octane gaming montages, beat-synced football edits, and high-converting eCommerce ads.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundFX.playShutter();
                  onOpenBooking();
                }}
                className="group px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>Book Free Consultation Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFX.playSwoosh();
                  onExploreWork();
                }}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Showcase</span>
              </button>
            </div>

            {/* Key Stats Ticker */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/5 border border-white/5 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                      <span className={`text-lg sm:text-xl font-black ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Dynamic Showreel Video Player Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-white/15 to-white/5 p-1 backdrop-blur-xl shadow-2xl shadow-violet-900/40 border border-white/15">
              
              {/* Showreel Header Ribbon */}
              <div className="px-4 py-2.5 flex items-center justify-between bg-[#0D0E15] rounded-t-xl border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Editkaro Showreel 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">
                    4K 60FPS
                  </span>
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-[16/9] lg:aspect-[4/3] bg-black rounded-b-xl overflow-hidden group">
                {!videoError ? (
                  <video
                    className="w-full h-full object-cover"
                    src="https://vjs.zencdn.net/v/oceans.mp4"
                    poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
                    alt="Editkaro Showreel Preview"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Sound Controls Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      setIsMuted(!isMuted);
                    }}
                    className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors backdrop-blur-md cursor-pointer"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>

                {/* Bottom Video Badge & Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Editkaro Agency Showreel
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Beat Sync • Color Grade • Sound Design
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFX.playSwoosh();
                      onExploreWork();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-extrabold hover:bg-cyan-400 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    <span>Watch Clips</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Tools Ticker Banner */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Mastery Across Industry-Standard Editing Suite & FX Workflows
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {tools.map((tool) => (
              <div
                key={tool}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
