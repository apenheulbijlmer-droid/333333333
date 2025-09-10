import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Home, UtensilsCrossed, Info, MapPin } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="min-h-screen pt-24 relative">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-black"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(181, 153, 92, 0.15) 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, rgba(181, 153, 92, 0.1) 0%, transparent 70%)
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-[var(--gold)] font-serif text-9xl mb-4">404</h1>
          <p className="text-white text-2xl mb-8">Oeps! Deze pagina bestaat niet.</p>
          <p className="text-white/80 mb-12">
            Het lijkt erop dat je een verkeerde afslag hebt genomen. 
            Geen zorgen, we helpen je de weg terug te vinden!
          </p>

          {/* Search box */}
          <form 
            onSubmit={handleSearch}
            className="mb-12 max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Zoek op onze website..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-[var(--gold)]/30 
                         rounded-lg text-white placeholder-white/50 focus:outline-none
                         focus:border-[var(--gold)] transition-all duration-300
                         backdrop-blur-sm"
              />
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--gold)]"
              />
            </div>
          </form>

          {/* Navigation links */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: '/', icon: <Home size={24} />, text: 'Home' },
              { to: '/menu', icon: <UtensilsCrossed size={24} />, text: 'Menu' },
              { to: '/over-ons', icon: <Info size={24} />, text: 'Over Ons' },
              { to: '/#location', icon: <MapPin size={24} />, text: 'Locatie' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex flex-col items-center gap-3 p-6 rounded-lg
                         bg-white/5 border border-[var(--gold)]/30 backdrop-blur-sm
                         hover:bg-white/10 hover:border-[var(--gold)] 
                         transition-all duration-300 group"
              >
                <span className="text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="text-white font-medium">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}