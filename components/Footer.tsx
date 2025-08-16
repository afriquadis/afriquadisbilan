
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto py-4 px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AFRIQUADIS. Tous droits réservés.</p>
        <p className="mt-1 text-xs">Avis de non-responsabilité : Ce bilan est à titre informatif et ne remplace pas un avis médical professionnel.</p>
      </div>
    </footer>
  );
};