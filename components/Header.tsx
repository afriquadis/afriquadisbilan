import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
            <img src="https://afriquadis.com/wp-content/uploads/2022/07/logo-afriquadis.png" alt="AFRIQUADIS Logo" className="h-12 w-auto"/>
            <h1 className="hidden sm:block text-2xl md:text-3xl font-bold text-gray-800 ml-4">
              Bilan Express Pro
            </h1>
        </div>
        <div className="hidden sm:block text-right">
             <p className="font-semibold text-brand-orange-dark">Diagnostic avancé</p>
             <p className="text-sm text-gray-500">Recommandations personnalisées</p>
        </div>
      </div>
    </header>
  );
};