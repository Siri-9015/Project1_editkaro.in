import React, { useState } from 'react';
import { Flame, Music, Sparkles, Zap, CheckCircle, Video, Scissors, Layers, ShieldCheck } from 'lucide-react';
import { soundFX } from '../lib/soundUtils';

export const ProcessSection: React.FC = () => {
  const [activeSoundName, setActiveSoundName] = useState<string | null>(null);

  const steps = [
    {
      number: '01',
      title: 'Hook Optimization & Raw Trimming',
      description: 'We analyze your raw footage to isolate the first 3-second hook. Unnecessary pauses, filler words, and slow moments are surgically trimmed.',
      icon: Scissors,
      color: 'from-amber-500 to-orange-500',
    },
    {
      number: '02',
      title: 'Dynamic Pacing & B-Roll Sourcing',
      description: 'Pattern interrupts every 1.5–2.0 seconds keep viewer eyes locked. We source high-resolution relevant B-roll clips, archival shots, and stock visuals.',
      icon: Video,
      color: 'from-violet-500 to-indigo-500',
    },
    {
      number: '03',
      title: 'Sound Design & Motion FX',
      description: 'Audio is 50% of the video experience. We layer custom swooshes, sub-bass drops, pop triggers, and kinetic typography for maximum impact.',
      icon: Music,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      number: '04',
      title: 'Color Grading & Final Master',
      description: 'Every frame passes through our DaVinci Resolve color pipeline, matching skin tones and applying filmic LUTs before 4K export.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const soundDemos = [
    { name: 'Cinematic Swoosh', fn: () => soundFX.playSwoosh(), type: 'Transition' },
    { name: 'Sub-Bass Drop', fn: () => soundFX.playBassDrop(), type: 'Hook Impact' },
    { name: 'Pop Trigger', fn: () => soundFX.playPop(), type: 'Text Reveal' },
    { name: 'Camera Shutter', fn: () => soundFX.playShutter(), type: 'Snapshot' },
  ];

  const triggerSound = (demo: { name: string; fn: () => void }) => {
    demo.fn();
    setActiveSoundName(demo.name);
    setTimeout(() => setActiveSoundName(null), 800);
  };

  return (
    <section id="process" className="py-16 bg-[#0D0E15] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
            The Editkaro Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Turn Raw Clips Into Viral Hits
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Our systematic 4-stage post-production pipeline engineered specifically for high viewer retention and conversion.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors font-mono">
                    {step.number}
                  </span>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg text-black`}>
                    <Icon className="w-5 h-5 fill-black/20" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Sound Design Testboard */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-950/60 via-indigo-950/60 to-cyan-950/60 border border-white/15 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-bold text-sm">
                <Music className="w-4 h-4 animate-bounce" />
                <span>Interactive Sound Design Simulator</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Test Our Custom Sound FX Triggers
              </h3>
              <p className="text-xs text-slate-300">
                Click below to test how audio cues create subconscious pattern interrupts during video edits.
              </p>
            </div>

            {activeSoundName && (
              <div className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs animate-bounce shadow-lg">
                Playing: {activeSoundName} 🎵
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {soundDemos.map((demo) => (
              <button
                key={demo.name}
                onClick={() => triggerSound(demo)}
                className="p-3 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/15 text-white transition-all cursor-pointer text-center space-y-1 group"
              >
                <span className="text-[10px] text-slate-400 group-hover:text-black uppercase block font-mono">
                  {demo.type}
                </span>
                <span className="text-xs font-bold block">
                  {demo.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
