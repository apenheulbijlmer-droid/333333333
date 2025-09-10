import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0A0A0A] py-8 sm:py-12 border-t border-[var(--gold)]/20 relative z-20 safe-area-inset">
      {/* Gradient overlay for better separation */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60 mb-8 sm:mb-12"></div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left items-start">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 h-fit">
            <h3 className="font-serif text-[var(--gold)] text-xl mb-4 font-bold text-center">
              {t('footer.location')}
            </h3>
            <a 
              href="https://www.google.nl/maps/place/Manhattan+Food+%26+Drinks/@52.3560177,4.8300647,21z"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-[var(--gold)] 
                       transition-colors duration-300 mb-2 min-h-[3rem]"
              aria-label="Bekijk onze locatie op Google Maps - Manhattan Food & Drinks Amsterdam Nieuw-West"
              itemProp="address"
            >
              <MapPin size={20} className="text-[var(--gold)]" />
              <span className="font-medium" itemProp="streetAddress">Pieter Calandlaan 11, 1065 KH Amsterdam</span>
            </a>
            <p className="text-white/90 text-sm mt-1 mb-4 text-center md:text-left" itemProp="additionalProperty">
              Op 3 minuten loopafstand van Station Lelylaan
            </p>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-[var(--gold)]/20">
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
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 h-fit">
            <h3 className="font-serif text-[var(--gold)] text-xl mb-4 font-bold text-center">
              {t('footer.hours')}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2 text-white w-full">
                <Clock size={20} className="text-[var(--gold)]" />
                <span className="font-medium" itemProp="openingHours">Dinsdag t/m Zondag: 10:00 - 22:00</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white w-full">
                <Clock size={20} className="text-[var(--gold)] opacity-0" />
                <span className="font-medium" itemProp="openingHours">Maandag: Gesloten</span>
              </div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 h-fit">
            <h3 className="font-serif text-[var(--gold)] text-xl mb-4 font-bold text-center">
              {t('footer.contact')}
            </h3>
            <p className="flex items-center justify-center gap-2 mb-4 text-white">
              <Phone size={20} className="text-[var(--gold)]" />
              <span className="font-medium" itemProp="telephone">020 223 9900</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://www.instagram.com/manhattanfood020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--gold-hover)] 
                         transition-all duration-300 group min-h-[3rem] social-link"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} className="text-[var(--gold)] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-white group-hover:text-[var(--gold)]
                               transition-colors duration-300">
                  manhattanfood020
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-white text-sm">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}