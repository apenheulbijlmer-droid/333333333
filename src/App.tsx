import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MapPin, Phone, Instagram, Facebook, Clock, ChevronDown, Utensils, X } from 'lucide-react';
import ReservationModal from './components/ReservationModal';

function App() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [menuItemsVisible, setMenuItemsVisible] = React.useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Handle video playback
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = video.duration;
        video.playbackRate = -1;
        setPlaybackRate(-1);
      } else if (video.currentTime <= 0.1) {
        video.currentTime = 0;
        video.playbackRate = 1;
        setPlaybackRate(1);
      }
    };

    const handleLoadedMetadata = () => {
      video.play().catch(error => {
        console.warn('Autoplay failed:', error);
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Handle click outside to close menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle menu items animation
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => setMenuItemsVisible(true), 150);
      return () => clearTimeout(timer);
    }
    setMenuItemsVisible(false);
  }, [isMobileMenuOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-[var(--gold)] text-4xl font-serif tracking-wider font-bold logo-fade-in
                          hover:scale-110 transition-all duration-300 cursor-pointer">M</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-[var(--gold)] transition-all duration-300 hover:scale-105">{t('nav.home')}</a>
            <a href="#menu" className="hover:text-[var(--gold)] transition-all duration-300 hover:scale-105">{t('nav.menu')}</a>
            <a href="#about" className="hover:text-[var(--gold)] transition-all duration-300 hover:scale-105">{t('nav.about')}</a>
            <a href="#contact" className="hover:text-[var(--gold)] transition-all duration-300 hover:scale-105">{t('nav.contact')}</a>
            <button 
              className="btn-primary"
              onClick={() => setIsReservationModalOpen(true)}
            >
              {t('nav.reserve')}
            </button>
          </div>
          <button className="md:hidden text-[var(--gold)]">
            <Menu
              size={24}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              className="hover:scale-110 transition-transform duration-200"
            />
          </button>
          {/* Mobile Menu Portal */}
          <div 
            className={`mobile-menu-overlay fixed inset-0 z-[100] md:hidden transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div
              ref={menuRef}
              className={`mobile-menu-content flex flex-col items-center justify-center min-h-screen px-6 py-16 transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-y-0' : 'translate-y-8'
              }`}
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-[var(--gold)] p-2 rounded-full hover:bg-white/10 
                           hover:rotate-90 transition-all duration-300 z-10 backdrop-blur-sm"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <div className={`space-y-6 text-center transition-all duration-300 delay-150 transform relative z-10 ${
                menuItemsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                {[
                  { href: '#home', text: t('nav.home') },
                  { href: '#menu', text: t('nav.menu') },
                  { href: '#about', text: t('nav.about') },
                  { href: '#contact', text: t('nav.contact') }
                ].map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl hover:text-[var(--gold)] transition-all duration-300 
                             hover:scale-105 hover:shadow-glow backdrop-blur-sm"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item.text}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsReservationModalOpen(true);
                  }}
                  className="btn-primary text-xl mt-8 w-full sm:w-auto backdrop-blur-sm"
                >
                  {t('nav.reserve')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0C0C0C] to-black"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="overflow-hidden w-full">
            <h1 className="flex flex-col items-center gap-2">
              <span className="title-modern text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl">
                Manhattan
              </span>
              <span className="title-modern text-[1.8rem] sm:text-3xl md:text-4xl lg:text-5xl !font-light tracking-widest">
                Food & Drinks
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 tracking-wide">{t('hero.tagline')}</p>
          <button 
            className="btn-primary text-lg"
            onClick={() => setIsReservationModalOpen(true)}
          >
            {t('hero.cta')}
          </button>
          <ChevronDown 
            className="absolute bottom-8 text-[var(--gold)] float-arrow hover:text-white 
                       transition-colors duration-300 cursor-pointer" 
            size={40} 
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[var(--dark-bg)]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl text-[var(--gold)] mb-6">{t('about.title')}</h2>
            <div className="w-20 h-0.5 bg-[var(--gold)] mb-6"></div>
            <p className="text-lg mb-6 leading-relaxed">
              {t('about.content1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('about.content2')}
            </p>
          </div>
          <div className="relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Chef plating"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-[var(--gold)] text-center mb-12">{t('menu.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('menu.appetizers'),
                dish: t('menu.dishes.foieGras'),
                price: "$32",
                icon: <Utensils className="text-[var(--gold)]" size={24} />
              },
              {
                title: t('menu.mainCourse'),
                dish: t('menu.dishes.wagyu'),
                price: "$85",
                icon: <Utensils className="text-[var(--gold)]" size={24} />
              },
              {
                title: t('menu.dessert'),
                dish: t('menu.dishes.souffle'),
                price: "$28",
                icon: <Utensils className="text-[var(--gold)]" size={24} />
              }
            ].map((item, index) => (
              <div
                key={index}
                className="menu-card"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-2xl text-[var(--gold)]">{item.title}</h3>
                  {item.icon}
                </div>
                <p className="text-lg mb-2">{item.dish}</p>
                <p className="text-[var(--gold)] font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Reservation */}
      <section id="contact" className="py-20 bg-[var(--dark-bg)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-[var(--gold)] mb-12">{t('contact.title')}</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={t('contact.form.name')}
                  className="input-modern"
                />
                <input
                  type="email"
                  placeholder={t('contact.form.email')}
                  className="input-modern"
                />
                <input
                  type="date"
                  className="input-modern"
                />
                <select
                  className="input-modern"
                >
                  <option value="">{t('contact.form.time')}</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary text-lg w-full md:w-auto"
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-0.5 bg-[var(--gold)] opacity-50 mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-serif text-[var(--gold)] text-xl mb-4">{t('footer.location')}</h3>
              <a 
                href="https://www.google.nl/maps/place/Manhattan+Food+%26+Drinks/@52.3560177,4.8300647,21z/data=!4m6!3m5!1s0x47c5e327b21b95d9:0xaf65f29e1d1500cf!8m2!3d52.3561109!4d4.8303338!16s%2Fg%2F11ww8n9zj1?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-[var(--gold)] transition-colors duration-300"
              >
                <MapPin size={20} className="text-[var(--gold)]" />
                Pieter Calandlaan 11, Amsterdam
              </a>
              <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.8876016241776!2d4.827470812309084!3d52.35601774767619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5e327b21b95d9%3A0xaf65f29e1d1500cf!2sManhattan%20Food%20%26%20Drinks!5e0!3m2!1sen!2snl!4v1708595361435!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manhattan Food & Drinks location"
                  className="w-full h-full hover:filter hover:contrast-110 transition-all duration-300"
                ></iframe>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-[var(--gold)] text-xl mb-4">{t('footer.hours')}</h3>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Clock size={20} className="text-[var(--gold)]" />
                {t('footer.schedule')}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[var(--gold)] text-xl mb-4">{t('footer.contact')}</h3>
              <p className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Phone size={20} className="text-[var(--gold)]" />
                +31 (20) 341 7265
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a href="#" className="text-[var(--gold)] hover:text-[var(--gold-hover)] transition-all duration-300 hover:scale-110">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-[var(--gold)] hover:text-[var(--gold-hover)] transition-all duration-300 hover:scale-110">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-400">
              {t('footer.rights', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </div>
  );
}

export default App;