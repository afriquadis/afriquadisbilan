import React from 'react';
import type { DiagnosticReport, DiagnosticResultItem } from '../types';
import { LightBulbIcon, PhoneIcon, RefreshIcon, TagIcon, DownloadIcon } from './icons/ResultIcons';

const UrgencyTag: React.FC<{ urgency?: 'faible' | 'modérée' | 'élevée' }> = ({ urgency }) => {
  if (!urgency) return null;
  const colors = {
    faible: 'bg-brand-orange/10 text-brand-orange-dark',
    modérée: 'bg-brand-orange text-white',
    élevée: 'bg-brand-orange-dark text-white',
  };
  const text = {
    faible: 'Faible',
    modérée: 'Modérée',
    élevée: 'Élevée',
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors[urgency]}`}>
      Urgence: {text[urgency]}
    </span>
  );
};


const PathologyResultCard: React.FC<{ item: DiagnosticResultItem }> = ({ item }) => {
  const { pathology, score } = item;
  
  return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {pathology.categoryTag && (
                          <span className="text-xs font-semibold px-2.5 py-1 bg-brand-orange/10 text-brand-orange-dark rounded-full">
                              {pathology.categoryTag}
                          </span>
                      )}
                      <UrgencyTag urgency={pathology.urgency} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{pathology.name}</h3>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                  <p className="font-bold text-gray-800">Score: {score}</p>
                  <p className="text-sm text-gray-500">Confiance: {score}%</p>
                  <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1 ml-auto sm:mx-0">
                      <div className="bg-gradient-to-r from-brand-orange-light to-brand-orange-dark h-1.5 rounded-full" style={{ width: `${score}%` }}></div>
                  </div>
              </div>
          </div>
          
          <div className="space-y-6">
              {/* Product Kit Section */}
              <div className="p-4 rounded-lg bg-orange-50/50">
                   <h4 className="flex items-center text-md font-bold text-brand-orange-dark mb-3">
                      <TagIcon />
                      <span className="ml-2">Produits AFRIQUADIS recommandés</span>
                  </h4>
                  {pathology.productKit.map((product, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                          <div className="flex justify-between items-center">
                              <div>
                                  <p className="font-bold text-gray-800">{product.name}</p>
                                  <p className="text-sm text-gray-500">{product.description}</p>
                              </div>
                              <div className="text-right">
                                  <p className="font-bold text-lg text-brand-orange-dark">{product.price}</p>
                              </div>
                          </div>
                          <button className="w-full mt-3 px-4 py-2 bg-brand-orange text-white font-bold rounded-lg shadow-md hover:bg-brand-orange-dark transition-all duration-300">
                              Commander le Pack
                          </button>
                      </div>
                  ))}
              </div>

              {/* Lifestyle Advice Section */}
              <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="flex items-center text-md font-bold text-gray-800 mb-3">
                      <LightBulbIcon />
                      <span className="ml-2">Conseils d'hygiène de vie</span>
                  </h4>
                  <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600 text-sm">
                      {pathology.lifestyleAdvice.map((advice, index) => (
                          <li key={index}>{advice}</li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  );
};


export const DiagnosticResult: React.FC<{ report: DiagnosticReport; onReset: () => void }> = ({ report, onReset }) => {
  const hasResults = report.results.length > 0;
  const topScore = hasResults ? report.results[0].score : 0;
  
  const handleSave = () => {
    alert("Fonctionnalité bientôt disponible ! Vous pourrez sauvegarder vos résultats en PDF.");
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <div className="inline-block p-4 bg-white rounded-full shadow-md">
            <svg className="h-12 w-12 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Votre Bilan Express Pro</h2>
        <p className="text-gray-600 mt-2">Diagnostic avancé avec recommandations personnalisées.</p>
      </div>

      {/* Summary Dashboard */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border">
              <p className="text-3xl font-bold text-brand-orange">{report.selectedSymptoms.length}</p>
              <p className="text-sm text-gray-600">Symptômes signalés</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border">
              <p className="text-3xl font-bold text-brand-orange">{report.results.length}</p>
              <p className="text-sm text-gray-600">Pathologies détectées</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border col-span-2">
              <p className="text-3xl font-bold text-brand-orange">{topScore}<span className="text-xl">%</span></p>
              <p className="text-sm text-gray-600">Confiance maximum</p>
          </div>
      </div>

      {hasResults ? (
        <div className="space-y-8">
          {report.results.map(item => (
            <PathologyResultCard key={item.pathology.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune correspondance claire trouvée</h3>
            <p className="mt-1 text-sm text-gray-500">Pour un diagnostic précis, veuillez consulter un professionnel de santé.</p>
        </div>
      )}
      
      {/* Save Results Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-10 text-center">
        <h3 className="text-xl font-bold text-gray-800">Sauvegarder vos résultats</h3>
        <p className="text-gray-600 mt-2">Prenez une capture d'écran de vos résultats ou contactez nos experts pour un rapport détaillé.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
              onClick={handleSave}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-orange text-white font-bold rounded-lg shadow-md hover:bg-brand-orange-dark transition-all"
          >
              <DownloadIcon />
              <span className="ml-2">Sauvegarder</span>
          </button>
           <button
              onClick={onReset}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all"
          >
              <RefreshIcon />
              <span className="ml-2">Nouveau Bilan</span>
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">
          <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">Besoin d'un accompagnement personnalisé ?</h3>
              <p className="text-gray-600 mt-2">Nos experts sont à votre écoute pour vous guider.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                   <a
                      href="https://wa.me/22892543376" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-orange-light to-brand-orange-dark text-white font-bold rounded-lg shadow-md hover:scale-105 transition-all"
                    >
                      <PhoneIcon />
                      <span className="ml-2">Appeler un Expert</span>
                    </a>
              </div>
          </div>
      </div>
      
       <div className="bg-orange-50 border-l-4 border-brand-orange-dark text-orange-800 p-4 rounded-lg mt-6" role="alert">
          <p className="font-bold">Avertissement médical</p>
          <p className="text-sm">Ce bilan express utilise un système d'analyse de vos symptômes. Il s'agit d'un outil d'aide à l'orientation qui ne remplace pas une consultation médicale professionnelle.</p>
       </div>
    </div>
  );
};