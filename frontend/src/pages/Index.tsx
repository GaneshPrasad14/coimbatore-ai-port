import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7003/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch portfolio:', err);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(items.map(item => item.category))].sort();

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <Hero />


        {/* Filter Section - Horizontal Scroll */}
        <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 overflow-hidden">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 items-center">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest shrink-0 mr-4 border-r border-white/10 pr-6 hidden md:block">
                Filter By
              </span>

              <button
                onClick={() => setSelectedCategory('All')}
                className={`text-xs md:text-sm font-bold uppercase tracking-widest shrink-0 transition-all duration-300 px-4 py-2 rounded-full border ${selectedCategory === 'All'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-500 border-transparent hover:border-white/20 hover:text-white'
                  }`}
              >
                All Projects
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs md:text-sm font-bold uppercase tracking-widest shrink-0 transition-all duration-300 px-4 py-2 rounded-full border ${selectedCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-500 border-transparent hover:border-white/20 hover:text-white'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid - Brutalist */}
        <section className="border-b border-white/10 bg-white/5">
          <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-0.5 bg-black border border-black/10">
            {filteredItems.map((item, index) => (
              <a
                key={item.domain + index}
                href={`https://${item.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-neutral-900 overflow-hidden block"
              >
                {/* Image */}
                <img
                  src={item.imageUrl || `https://s0.wp.com/mshots/v1/https://${item.title}?w=600&h=600`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-40"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/600x600/1a1a1a/FFF?text=${item.title}`;
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur-[2px]">

                  {/* Absolute Badge & Arrow */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-0.5 text-[8px] font-mono text-black bg-white/90 uppercase tracking-wider rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowRight className="text-white w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  <div className="flex flex-col gap-0.5 w-full px-2">
                    <h3 className="text-xs md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 truncate tracking-widest uppercase mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 line-clamp-2 leading-tight tracking-widest uppercase">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA - Minimalist */}

        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Index;
