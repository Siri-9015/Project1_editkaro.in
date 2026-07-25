import React from 'react';
import { Film, Sparkles, Youtube, Instagram, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080C] border-t border-white/10 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#0D0E15] rounded-[11px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                Editkaro<span className="text-cyan-400">.in</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Editkaro.in is a premier social media video editing and growth marketing agency. We engineer high-retention video content for YouTube creators, Esports teams, eCommerce brands, and influencers worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 text-slate-300 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 border border-white/10 text-slate-300 transition-colors"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10 text-slate-300 transition-colors"
                aria-label="X Twitter Account"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Video Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Editing Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">Short-Form Reels</a></li>
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">YouTube Long-Form</a></li>
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">Gaming Montages</a></li>
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">Football Highlights</a></li>
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">eCommerce UGC Ads</a></li>
              <li><a href="#categories" className="hover:text-cyan-300 transition-colors">Documentary Style</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Agency Suite
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#color-grading" className="hover:text-cyan-300 transition-colors">Cinematic Color Grading</a></li>
              <li><a href="#process" className="hover:text-cyan-300 transition-colors">Sound Design & FX</a></li>
              <li><a href="#process" className="hover:text-cyan-300 transition-colors">Hook Optimization</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-300 transition-colors">Thumbnail & Motion Design</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>hello@editkaro.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                <span>Mumbai / Remote Worldwide</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Editkaro.in — All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with <Sparkles className="w-3 h-3 text-amber-400" /> for creators & brands.
          </p>
        </div>

      </div>
    </footer>
  );
};
