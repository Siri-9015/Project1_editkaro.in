import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { PortfolioGrid } from './components/PortfolioGrid';
import { VideoModal } from './components/VideoModal';
import { ColorGradingSlider } from './components/ColorGradingSlider';
import { ProcessSection } from './components/ProcessSection';
import { Testimonials } from './components/Testimonials';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

import { PORTFOLIO_ITEMS } from './data/portfolioData';
import { PortfolioItem, VideoCategory } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aspectFilter, setAspectFilter] = useState<'all' | '9:16' | '16:9'>('all');
  
  // Selected video for lightbox modal
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    category?: VideoCategory;
    note?: string;
    priceEstimate?: string;
  }>({});

  // Filter logic
  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Aspect match
      const matchesAspect = aspectFilter === 'all' || item.aspectRatio === aspectFilter;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tools.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesAspect && matchesSearch;
    });
  }, [selectedCategory, aspectFilter, searchQuery]);

  const handleOpenBooking = () => {
    setBookingPrefill({});
    setIsBookingOpen(true);
  };

  const handleExploreWork = () => {
    const portfolioEl = document.getElementById('portfolio');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSimilar = (item: PortfolioItem) => {
    setSelectedVideo(null);
    setBookingPrefill({
      category: item.category,
      note: `Inspired by portfolio project: "${item.title}" for ${item.client}.`,
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Header Navigation */}
      <Header
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Hero Section */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onExploreWork={handleExploreWork}
      />

      {/* Category Filter Controls */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        aspectFilter={aspectFilter}
        onAspectFilterChange={setAspectFilter}
        filteredCount={filteredItems.length}
      />

      {/* Main Portfolio Video Grid */}
      <PortfolioGrid
        items={filteredItems}
        onSelectItem={(item) => setSelectedVideo(item)}
      />

      {/* Color Grading Comparison Slider Section */}
      <ColorGradingSlider />

      {/* The Secret Sauce & Process Section */}
      <ProcessSection />

      {/* Client Reviews & Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Lightbox Video Breakdown Modal */}
      <VideoModal
        item={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onRequestSimilar={handleRequestSimilar}
      />

      {/* Consultation Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledCategory={bookingPrefill.category}
        prefilledNote={bookingPrefill.note}
        prefilledPriceEstimate={bookingPrefill.priceEstimate}
      />

    </div>
  );
}

