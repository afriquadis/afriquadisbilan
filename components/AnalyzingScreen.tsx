import React, { useState, useEffect } from 'react';

const steps = [
  'Analyse des symptômes...',
  'Croisement avec la base pathologique...',
  'Calcul des scores de confiance...',
  'Préparation de vos recommandations...',
];

export const AnalyzingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 600);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center animate-fade-in">
        <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-brand-orange/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-orange rounded-full animate-spin" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}></div>
            <div className="absolute inset-2 bg-brand-orange/10 rounded-full flex items-center justify-center">
                 <svg className="w-16 h-16 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                </svg>
            </div>
        </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Analyse en cours...</h2>
      <p className="text-gray-600 mt-2">Notre système analyse vos symptômes pour générer votre bilan...</p>
      
      <div className="w-full max-w-md mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-brand-orange-light to-brand-orange-dark h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
        </div>
        <p className="text-center text-gray-600 font-semibold mt-2">{progress}% - {steps[currentStep]}</p>
      </div>

       <div className="mt-8 text-sm text-gray-500">
          AFRIQUADIS Pro • Version 2.0
       </div>
    </div>
  );
};