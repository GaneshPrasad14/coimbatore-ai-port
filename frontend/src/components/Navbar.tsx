import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; path: string }[] = [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
          ? 'glass border-white/[0.08] py-4'
          : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <span className="text-3xl tracking-tight text-white mix-blend-difference font-['Berkshire_Swash']">coimbatore.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-all duration-300 hover:text-white ${isActive(link.path) ? 'text-white' : 'text-gray-400'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-white transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {/* Removed Contact CTA */}
          </div>

          {/* Mobile Menu Button */}
        </div>
      </nav>

    </>
  );
};

export default Navbar;
