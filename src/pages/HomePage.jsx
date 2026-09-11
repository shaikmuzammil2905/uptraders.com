import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Heart, ShoppingCart, Star, Package, MapPin, Globe, 
  Users, Store, ShieldCheck, Truck, Utensils, Award, CheckCircle2,
  Droplet, Flame, Grid, Circle, Sparkles, Cloud, Gift, Wind, Bell
} from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ── Service & Trust Highlights (Authentic to UP Traders) ──────────────────────
function ServiceHighlights() {
  const services = [
    {
      icon: Store,
      title: 'Complete Grocery Range',
      subtitle: 'Rice, oil, ghee, pulses, spices & all FMCG items',
      color: '#1B7A2B',
      link: '/category/all'
    },
    {
      icon: ShieldCheck,
      title: 'Bulk Orders',
      subtitle: 'Wholesale & volume supply with special offers',
      color: '#FF9800',
      link: '/bulk-orders'
    },
    {
      icon: Utensils,
      title: 'Function Orders',
      subtitle: 'Provisions for weddings, parties & community events',
      color: '#D4AF37',
      link: '/function-orders'
    },
    {
      icon: Truck,
      title: 'Fast Local Delivery',
      subtitle: '1-Hour Delivery* in selected service areas',
      color: '#156321',
      link: '/contact'
    },
  ];

  return (
    <div className="animate-section px-4 md:px-24 mb-8 md:mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Link
              key={i}
              to={s.link}
              className="bg-white border border-green-900/10 rounded-2xl p-4 md:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-start gap-2.5 group"
            >
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight flex items-center gap-1 group-hover:text-brand-red transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 hidden md:inline" />
                  {s.title}
                </h4>
                <p className="text-[11px] md:text-xs text-gray-500 mt-1 leading-snug">
                  {s.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function HomePage() {
  const container = useRef(null);
  const { products, categories, loading } = useStoreData();
  const [banners, setBanners] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const reviewTrackRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  React.useEffect(() => {
    fetch(`${BACKEND_URL}/general/banners`)
      .then(r => r.json())
      .then(d => { if (d.banners) setBanners(d.banners); })
      .catch(e => console.error(e));

    fetch(`${BACKEND_URL}/general/reviews`)
      .then(r => r.json())
      .then(d => { if (d.reviews) setReviews(d.reviews.filter(r => r.is_active !== false)); })
      .catch(e => console.error(e));
  }, []);

  // Auto-scroll reviews if available
  React.useEffect(() => {
    const track = reviewTrackRef.current;
    if (!track || reviews.length === 0) return;
    let animFrame;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos += speed;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(step);
    };
    animFrame = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(step); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause);
    track.addEventListener('touchend', resume);
    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    };
  }, [reviews]);

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: container, dependencies: [loading] });

  return (
    <div ref={container} className="bg-brand-beige flex-grow w-full flex flex-col pb-8">
      <Header variant="home" />

      {/* Mobile Top Hero Section */}
      <div className="md:hidden bg-[#FFC107] pt-[140px] pb-10 px-4 relative flex flex-col items-center">
        {banners.length > 0 ? (
          <div className="relative w-full h-[185px] rounded-[20px] overflow-hidden shadow-xl bg-gradient-to-br from-[#1B7A2B] to-[#156321]">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="relative w-full h-full shrink-0">
                  <div className="absolute inset-0 flex flex-col justify-center px-5 z-10 w-[65%]">
                    <h2 className="text-white text-lg font-serif font-bold leading-tight mb-2 drop-shadow-md">
                      {banner.title}
                    </h2>
                    {(banner.link_url || banner.link_url === '') && (
                      <Link to={banner.link_url || "/category/all"} className="bg-[#FFC107] text-[#156321] text-[10px] font-extrabold px-4 py-2 rounded-lg w-fit shadow-md">
                        Shop Now
                      </Link>
                    )}
                  </div>
                  <div className="absolute right-0 bottom-0 h-full w-[55%] z-0">
                     <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover object-left" style={{ WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent)', maskImage: 'linear-gradient(to left, black 40%, transparent)' }} />
                  </div>
                </div>
              ))}
            </div>
            {banners.length > 1 && (
              <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-[185px] rounded-[20px] overflow-hidden shadow-xl bg-gradient-to-br from-[#1B7A2B] to-[#156321]">
            <div className="absolute inset-0 flex flex-col justify-center px-5 z-10 w-[68%]">
              <span className="text-brand-yellow text-[9px] font-extrabold tracking-widest uppercase mb-1">
                Complete Grocery Store
              </span>
              <h2 className="text-white text-xl font-serif font-bold leading-tight mb-1.5 drop-shadow-md">
                Your Complete<br />Grocery Store
              </h2>
              <p className="text-white/85 text-[10px] font-medium mb-3 line-clamp-2 leading-tight">
                Rice, pulses, oil, ghee, spices, grains & everyday FMCG essentials.
              </p>
              <div className="flex gap-2">
                <Link to="/category/all" className="bg-[#FFC107] text-[#156321] text-[9.5px] font-black px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                  Shop Now
                </Link>
                <Link to="/bulk-orders" className="bg-white/20 text-white text-[9.5px] font-bold px-3 py-1.5 rounded-lg border border-white/40 uppercase tracking-wider">
                  Bulk Orders
                </Link>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-[48%] z-0">
               <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80" alt="Groceries" className="w-full h-full object-cover object-center" style={{ WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent)', maskImage: 'linear-gradient(to left, black 30%, transparent)' }} />
            </div>
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="md:max-w-full mx-auto w-full pb-20 bg-white md:bg-transparent rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10 pt-6 md:pt-0">

        {/* Desktop Banner Section */}
        <div className="hidden md:block animate-section py-6">
          {banners.length > 0 ? (
            <div className="relative w-full md:w-[85%] lg:w-[75%] h-56 md:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 mx-auto px-4 md:px-0">
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {banners.map((banner) => (
                  <div key={banner.id} className="relative w-full h-full shrink-0">
                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-16">
                      <h2 className="text-white text-2xl md:text-5xl font-bold mb-4 leading-tight font-serif tracking-wide drop-shadow-lg">
                        {banner.title}
                      </h2>
                      {(banner.link_url || banner.link_url === '') && (
                        <div className="flex gap-4">
                          <Link to={banner.link_url || "/category/all"} className="bg-[#1B7A2B] text-white text-xs md:text-sm font-bold px-7 py-3 rounded-xl shadow-xl hover:bg-[#156321] transition-all">
                            SHOP NOW
                          </Link>
                          <Link to="/bulk-orders" className="bg-white text-gray-900 text-xs md:text-sm font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all">
                            ORDER IN BULK
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 md:h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center px-4 md:px-24 pt-2 md:pt-4 pb-2">
              <div className="relative w-full h-80 md:h-[380px] rounded-[24px] overflow-hidden shadow-xl border border-green-900/10 bg-[#FDF8F0] group">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80" alt="UP Traders Grocery Collection" className="w-full h-full object-cover object-right transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F0] via-[#FDF8F0]/95 md:via-[#FDF8F0]/90 to-transparent z-10 pointer-events-none w-full md:w-[75%]"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 z-10 w-[85%] md:w-[65%]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-extrabold uppercase tracking-wider w-fit mb-3">
                    Sangareddy's Trusted Grocery Store
                  </div>
                  <h1 className="text-gray-900 text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-[1.15] font-serif tracking-tight">
                    Your Complete<br />
                    <span className="text-[#1B7A2B]">Grocery Store</span>
                  </h1>
                  <p className="text-gray-700 text-xs md:text-sm lg:text-[15px] mb-6 md:mb-7 max-w-md leading-relaxed font-medium">
                    Rice, pulses, oil, ghee, spices, grains and everyday FMCG essentials delivered to your doorstep.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link to="/category/all" className="bg-[#1B7A2B] hover:bg-[#156321] text-white text-xs md:text-sm font-bold px-7 py-3 md:px-8 md:py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all tracking-wider uppercase">
                      SHOP NOW
                    </Link>
                    <Link to="/bulk-orders" className="bg-white hover:bg-gray-50 text-[#1B7A2B] border-2 border-[#1B7A2B] text-xs md:text-sm font-bold px-6 py-3 md:px-7 md:py-3 rounded-xl shadow-sm hover:shadow-md transition-all tracking-wider uppercase">
                      ORDER IN BULK
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Service / Trust Highlights ─────────────────────────────────── */}
        <ServiceHighlights />

        {/* Categories Grid */}
        <div className="animate-section px-4 md:px-24 mb-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-xs text-gray-500 mt-0.5">Explore our wide selection of groceries & daily provisions</p>
            </div>
            <Link to="/category/all" className="text-sm font-bold text-brand-red flex items-center gap-1 hover:underline">
              View All <span className="text-lg leading-none">&rsaquo;</span>
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-3">
            {categories.map((cat) => {
              return (
                <Link key={cat.id} to={`/category/${cat.id}`} className="group flex flex-col items-center gap-2">
                  <div className="w-[72px] h-[72px] md:w-28 md:h-28 rounded-full overflow-hidden shadow-xs hover:shadow-md bg-white border border-gray-100 p-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-brand-yellow">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                      {cat.image_url ? (
                        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 text-brand-red" />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-gray-800 text-center leading-tight line-clamp-2 px-1 max-w-[80px] md:max-w-[110px] group-hover:text-brand-red transition-colors">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Trending Products */}
        {products.filter(p => p.is_trending).length > 0 && (
          <div className="animate-section mb-10">
            <div className="flex justify-between items-center mb-4 px-4 md:px-24">
              <div>
                <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900">Daily Grocery Essentials</h3>
                <p className="text-xs text-gray-500">Popular staples chosen by local households</p>
              </div>
              <Link to="/category/all" className="text-xs font-bold text-brand-red hover:underline">View all</Link>
            </div>

            <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-24 pb-2 md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
              {products.filter(p => p.is_trending).slice(0, 5).map(product => (
                <div key={product.id} className="w-[160px] md:w-auto shrink-0 hover:-translate-y-1 transition-transform">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Festive / Bulk Special Banner */}
        <div className="animate-section px-4 md:px-24 mb-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-[#1B7A2B] to-[#156321] text-white p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="bg-[#FFC107] text-[#156321] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                Special Event & Bulk Supply
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                Planning a Function or Need Bulk Groceries?
              </h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4">
                We accept wholesale, catering, marriage and event grocery orders with doorstep delivery in Sangareddy.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/bulk-orders" className="bg-[#FFC107] hover:bg-[#ffca28] text-[#156321] text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider">
                  Bulk Inquiry
                </Link>
                <Link to="/function-orders" className="bg-white/15 hover:bg-white/25 text-white border border-white/40 text-xs font-bold px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider">
                  Function Orders
                </Link>
              </div>
            </div>
            <div className="hidden md:block w-48 h-36 shrink-0 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80" alt="Bulk Groceries" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Best Sellers */}
        {products.filter(p => p.is_bestseller).length > 0 && (
          <div className="animate-section mb-10 px-4 md:px-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900">Best Sellers</h3>
                <p className="text-xs text-gray-500">Highest quality staples and FMCG products</p>
              </div>
              <Link to="/category/all" className="text-xs font-bold text-brand-red hover:underline">View all</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {products.filter(p => p.is_bestseller).slice(0, 5).map(product => (
                <div key={product.id} className="hover:-translate-y-1 transition-transform">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews if provided by backend */}
        {reviews.length > 0 && (
          <section className="mb-4 overflow-hidden">
            <div className="px-4 md:px-24 mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">Customer Feedback</h3>
            </div>

            <div className="overflow-hidden w-full">
              <div
                ref={reviewTrackRef}
                className="flex gap-5 will-change-transform"
                style={{ width: 'max-content' }}
              >
                {[...reviews, ...reviews].map((rev, idx) => (
                  <div key={idx} className="w-[260px] md:w-[300px] p-6 shrink-0 bg-white border border-gray-100 rounded-[20px] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[180px]">
                    <div>
                      <div className="flex text-[#FFC107] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (rev.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-sm line-clamp-3">"{rev.comment}"</p>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-[#1B7A2B] flex items-center justify-center font-bold text-xs">
                        {(rev.name || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-xs">{rev.name || 'Customer'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
