import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Link, Send, Film, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoCategory } from '../types';
import { soundFX } from '../lib/soundUtils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledCategory?: VideoCategory;
  prefilledNote?: string;
  prefilledPriceEstimate?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledCategory = 'short-form',
  prefilledNote = '',
  prefilledPriceEstimate,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [category, setCategory] = useState<VideoCategory>(prefilledCategory);
  const [footageLink, setFootageLink] = useState('');
  const [note, setNote] = useState(prefilledNote);
  const [budget, setBudget] = useState('₹10k - ₹30k ($120 - $350)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playGlitchChime();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const refCode = `EK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0D0E15] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Book Consultation & Free Sample Edit</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Let's Build Your Next Viral Edit
              </h2>
              <p className="text-xs text-slate-400">
                Fill in your details below. Our lead video editor will review your channel and get back to you within 2 hours.
              </p>

              {prefilledPriceEstimate && (
                <div className="mt-2 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
                  Locked Estimate: {prefilledPriceEstimate}
                </div>
              )}
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@creator.com"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Channel / Brand URL</label>
                <input
                  type="text"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  placeholder="youtube.com/@yourchannel or @instagram"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Project Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as VideoCategory)}
                  className="w-full px-3.5 py-2.5 bg-[#121420] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="short-form">Short-Form Reel / TikTok / Short</option>
                  <option value="long-form">YouTube Long-Form / Podcast</option>
                  <option value="gaming">Gaming Montage / Stream Highlights</option>
                  <option value="football">Football & Sports Highlights</option>
                  <option value="ecommerce">eCommerce Product UGC Ad</option>
                  <option value="documentary">Vox/Hormozi Documentary Essay</option>
                  <option value="color-grading">Color Grading Master Only</option>
                  <option value="anime">Anime AMV & Beat Sync VFX</option>
                  <option value="ads">Brand Commercial & SaaS Motion</option>
                </select>
              </div>

            </div>

            {/* Drive / Raw Footage Link */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Link to Raw Footage or Inspiration (Optional)</span>
                <span className="text-[10px] text-slate-500">Google Drive, Dropbox or WeTransfer</span>
              </label>
              <input
                type="text"
                value={footageLink}
                onChange={(e) => setFootageLink(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
            </div>

            {/* Note Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Project Details & Creative Vision</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tell us about your target audience, pacing style, hook ideas or reference creators..."
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-xl shadow-violet-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-cyan-300" />
              <span>Submit Request & Schedule Call</span>
            </button>

          </form>
        ) : (
          /* Confirmation Screen */
          <div className="py-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">
                Request Confirmed!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{name}</span>! Our lead editor will review your project brief and email you at <span className="text-cyan-400 font-mono">{email}</span> within 2 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Reference ID:</span>
                <span className="text-cyan-300 font-bold">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Category:</span>
                <span className="text-white capitalize">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Response SLA:</span>
                <span className="text-emerald-400 font-bold">&lt; 2 Hours</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Return to Portfolio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
