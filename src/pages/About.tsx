import React from 'react';
import { useTranslation } from 'react-i18next';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function About() {
  const { t } = useTranslation();
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="pt-24 min-h-screen relative">
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
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 
            ref={titleRef}
            className={`font-serif text-4xl md:text-6xl text-[var(--gold)] text-center mb-12 reveal ${
              isTitleVisible ? 'visible' : ''
            }`}
          >
            Over Ons
          </h1>

          <div 
            ref={contentRef}
            className={`max-w-4xl mx-auto space-y-12 stagger-children ${
              isContentVisible ? 'visible' : ''
            }`}
          >
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[var(--gold)]/20 rounded-lg p-8 hover:border-[var(--gold)]/40 transition-all duration-300">
              <h2 className="font-serif text-2xl text-[var(--gold)] mb-4">Onze Geschiedenis</h2>
              <p className="text-white/90 leading-relaxed mb-6">
                Manhattan Food & Drinks, gevestigd in het bruisende hart van Amsterdam Nieuw-West, 
                is ontstaan uit een passie voor authentieke smaken en gastvrijheid. Sinds onze opening 
                hebben we ons ontwikkeld tot een geliefde ontmoetingsplek waar culinaire tradities 
                samenkomen met moderne innovatie.
              </p>
              <p className="text-white/90 leading-relaxed">
                Onze keuken combineert internationale invloeden met lokale ingrediënten, 
                waarbij we altijd streven naar de hoogste kwaliteit en 100% halal bereiding.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[var(--gold)]/20 rounded-lg p-8 hover:border-[var(--gold)]/40 transition-all duration-300">
              <h2 className="font-serif text-2xl text-[var(--gold)] mb-4">Onze Visie</h2>
              <p className="text-white/90 leading-relaxed">
                Bij Manhattan Food & Drinks geloven we dat eten mensen samenbrengt. 
                Onze missie is om een warme, uitnodigende omgeving te creëren waar gasten 
                kunnen genieten van hoogwaardige gerechten in een ontspannen sfeer. 
                We streven ernaar om elke maaltijd een bijzondere ervaring te maken, 
                of het nu gaat om een uitgebreid diner of een snelle lunch.
              </p>
            </div>

            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[var(--gold)]/20 rounded-lg p-8 hover:border-[var(--gold)]/40 transition-all duration-300">
              <h2 className="font-serif text-2xl text-[var(--gold)] mb-4">Kwaliteit & Service</h2>
              <p className="text-white/90 leading-relaxed">
                Kwaliteit staat bij ons voorop, zowel in onze gerechten als in onze service. 
                Ons toegewijde team staat klaar om u een onvergetelijke dining experience te 
                bezorgen. We selecteren zorgvuldig onze ingrediënten en werken volgens de 
                hoogste standaarden van voedselbereiding en hygiëne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}