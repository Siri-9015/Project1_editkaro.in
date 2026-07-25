import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, ChevronLeft, ChevronRight, Flame, Sparkles, CheckCircle2, Music, Wrench, Quote } from 'lucide-react';
import { PortfolioItem } from '../types';
import { soundFX } from '../lib/soundUtils';

interface VideoModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onRequestSimilar: (item: PortfolioItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose, onRequestSimilar }) => {
  if (!item) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'overview' | 'techniques' | 'sound'>('overview');
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      soundFX.playPop();
    }
  };

  // Frame Stepper (step ~0.04s per frame at 25fps)
  const stepFrame = (direction: 'prev' | 'next') => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      const frameDuration = 0.04;
      videoRef.current.currentTime += direction === 'next' ? frameDuration : -frameDuration;
      soundFX.playPop();
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Card Container */}
      <div className="relative w-full max-w-5xl bg-[#0D0E15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 border border-white/20 text-slate-300 hover:text-white hover:bg-black transition-colors"
          aria-label="Close Lightbox Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Video Player & Custom Controls */}
        <div className="lg:w-3/5 bg-black flex flex-col justify-between relative">
          
          {/* Main Video Element */}
          <div className="relative flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[380px] bg-slate-950">
            {!hasError ? (
              <video
                ref={videoRef}
                src={item.videoUrl}
                poster={item.thumbnailUrl}
                className="max-h-[60vh] w-full object-contain"
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Custom Player Controls Toolbar */}
          <div className="p-3 bg-[#090A0F] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white">
            
            {/* Play/Pause & Mute */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Frame Stepper */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => stepFrame('prev')}
                  className="px-2 py-1 rounded text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-0.5 cursor-pointer"
                  title="Previous Frame (0.04s)"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Frame</span>
                </button>
                <button
                  onClick={() => stepFrame('next')}
                  className="px-2 py-1 rounded text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-0.5 cursor-pointer"
                  title="Next Frame (0.04s)"
                >
                  <span>Frame</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Speed Selector & Fullscreen */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-[11px] font-mono">
                {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => changeSpeed(rate)}
                    className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                      playbackRate === rate ? 'bg-cyan-500 text-black font-extrabold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Breakdown & Tabs */}
        <div className="lg:w-2/5 p-5 sm:p-6 bg-[#0D0E15] overflow-y-auto flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Header Badge & Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  {item.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.client}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white leading-snug">
                {item.title}
              </h2>
            </div>

            {/* Performance Stats Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-violet-950/40 via-indigo-950/40 to-cyan-950/40 border border-white/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-medium">Views</span>
                <span className="text-sm font-black text-amber-400">{item.metrics.views}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-medium">Retention</span>
                <span className="text-sm font-black text-emerald-400">{item.metrics.retention}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-medium">Impact</span>
                <span className="text-sm font-black text-cyan-400">{item.metrics.conversion || item.metrics.likes || 'Viral'}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('techniques')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'techniques'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Techniques
              </button>
              <button
                onClick={() => setActiveTab('sound')}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'sound'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Sound FX
              </button>
            </div>

            {/* Tab Content 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                <p>{item.description}</p>

                {item.testimonial && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 relative">
                    <Quote className="w-5 h-5 text-cyan-400/30 absolute top-2 right-2" />
                    <p className="italic text-slate-200 mb-2">"{item.testimonial.quote}"</p>
                    <span className="font-bold text-white block">{item.testimonial.author}</span>
                    <span className="text-[10px] text-slate-400">{item.testimonial.role}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tab Content 2: Techniques */}
            {activeTab === 'techniques' && (
              <div className="space-y-2.5 text-xs animate-fadeIn">
                <p className="text-slate-400 font-medium">Key Editing Highlights Applied:</p>
                <div className="space-y-2">
                  {item.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Content 3: Sound FX */}
            {activeTab === 'sound' && (
              <div className="space-y-3 text-xs animate-fadeIn">
                <p className="text-slate-400 font-medium">Sound Design Layers Applied:</p>
                <div className="grid grid-cols-1 gap-2">
                  {item.soundDesignHighlights.map((sfx, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-2 text-slate-200">
                        <Music className="w-3.5 h-3.5 text-amber-400" />
                        <span>{sfx}</span>
                      </div>
                      <button
                        onClick={() => soundFX.playSwoosh()}
                        className="px-2 py-1 rounded text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-semibold transition-all cursor-pointer"
                      >
                        Listen Demo
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Action CTA */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                soundFX.playShutter();
                onRequestSimilar(item);
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Get an Edit Like This for Your Channel</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
