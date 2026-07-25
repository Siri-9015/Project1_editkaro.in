import React, { useState, useRef, useCallback } from 'react';
import { COLOR_GRADING_PRESETS } from '../data/portfolioData';
import { Sliders, Sparkles, MoveHorizontal, Camera, Layers } from 'lucide-react';
import { soundFX } from '../lib/soundUtils';

export const ColorGradingSlider: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const preset = COLOR_GRADING_PRESETS[selectedPresetIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="color-grading" className="py-16 bg-[#090A0F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Color Grading Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Raw LOG to Filmic Master Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Drag the slider left and right to inspect how Editkaro transforms flat un-graded camera profiles into rich, cinematic motion picture frames.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {COLOR_GRADING_PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                soundFX.playPop();
                setSelectedPresetIndex(idx);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPresetIndex === idx
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 border border-violet-400'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider Frame */}
        <div className="max-w-4xl mx-auto bg-[#0D0E15] border border-white/15 rounded-2xl p-2 sm:p-4 shadow-2xl space-y-4">
          
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] rounded-xl overflow-hidden select-none cursor-ew-resize bg-black"
          >
            {/* After Image (Full width background) */}
            <img
              src={preset.afterImage}
              alt="After Color Grade"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* After Label Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-black text-xs font-black uppercase tracking-wider shadow-lg z-10">
              GRADED MASTER
            </div>

            {/* Before Image (Clipped container) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={preset.beforeImage}
                alt="Before Color Grade"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
              />

              {/* Before Label Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider z-10">
                RAW UN-GRADED LOG
              </div>
            </div>

            {/* Vertical Divider Drag Bar */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-cyan-400 border-2 border-black flex items-center justify-center text-black shadow-xl">
                <MoveHorizontal className="w-5 h-5 font-bold" />
              </div>
            </div>

          </div>

          {/* Preset Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-cyan-400" /> Source Profile:
              </span>
              <p className="font-bold text-white">{preset.cameraFormat}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> LUT Matrix:
              </span>
              <p className="font-bold text-white">{preset.lutUsed}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Style Notes:
              </span>
              <p className="text-slate-300">{preset.description}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
