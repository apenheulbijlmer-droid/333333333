import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ReservationModal from './ReservationModal';

export const ReservationContext = React.createContext<{
  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (isOpen: boolean) => void;
}>({
  isReservationModalOpen: false,
  setIsReservationModalOpen: () => {},
});

export default function Layout() {
  const [isReservationModalOpen, setIsReservationModalOpen] = React.useState(false);

  return (
    <ReservationContext.Provider value={{ isReservationModalOpen, setIsReservationModalOpen }}>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Halal certification logo */}
        <img
          src="/New Project (2).png"
          alt="Halal Certified"
          className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 w-[50px] sm:w-[62px] z-50 opacity-90 hover:opacity-100 transition-all duration-300"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          aria-label="This restaurant is Halal certified"
          role="img"
        />
        <Navigation />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </div>
    </ReservationContext.Provider>
  );
}