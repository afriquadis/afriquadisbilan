import React, { useState, useCallback, useMemo } from 'react';
import { SYMPTOM_CATEGORIES } from '../constants';

interface SymptomSelectorProps {
  onDiagnose: (selectedSymptomIds: string[]) => void;
}

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({ onDiagnose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>(SYMPTOM_CATEGORIES[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSymptomToggle = useCallback((symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(symptomId)) {
        newSet.delete(symptomId);
      } else {
        newSet.add(symptomId);
      }
      return newSet;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    onDiagnose(Array.from(selectedSymptoms));
  }, [onDiagnose, selectedSymptoms]);

  const selectedCount = selectedSymptoms.size;

  const currentCategory = useMemo(() => {
    return SYMPTOM_CATEGORIES.find(c => c.id === activeCategory);
  }, [activeCategory]);
  
  const filteredSymptoms = useMemo(() => {
    if (!currentCategory) return [];
    if (!searchTerm) return currentCategory.symptoms;
    return currentCategory.symptoms.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentCategory, searchTerm]);

  const progressPercentage = Math.min((selectedCount / 6) * 100, 100); // Target 6 symptoms for full bar

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progression</span>
              <span className="text-sm font-bold text-brand-orange">{selectedCount} symptôme(s) sélectionné(s)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-brand-orange h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
      </div>
      
      <div className="text-center mb-6">
        <div className={`inline-block p-3 bg-brand-orange/10 rounded-full text-brand-orange-dark`}>
            {currentCategory?.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-2">{currentCategory?.name}</h2>
        <p className="text-gray-500 mt-1">Sélectionnez tous vos symptômes.</p>
      </div>
      
      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-4 overflow-x-auto p-1" aria-label="Tabs">
          {SYMPTOM_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setSearchTerm(''); }}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-lg w-24 h-24 transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-brand-orange/10 text-brand-orange-dark scale-105 shadow`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="w-8 h-8">{category.icon}</span>
              <span className="mt-2 text-xs font-semibold text-center">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher un symptôme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange"
          />
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[250px]">
        {filteredSymptoms.map(symptom => (
          <label
            key={symptom.id}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedSymptoms.has(symptom.id)
                ? `bg-brand-orange/10 border-brand-orange font-bold`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div>
              <span className="text-gray-700">{symptom.name}</span>
              <span className="block text-xs text-gray-500 font-normal">Poids: {symptom.weight}</span>
            </div>
            <input
              type="checkbox"
              checked={selectedSymptoms.has(symptom.id)}
              onChange={() => handleSymptomToggle(symptom.id)}
              className={`h-5 w-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange-dark`}
            />
          </label>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
        <button
          onClick={handleSubmit}
          disabled={selectedCount === 0}
          className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-brand-orange-light to-brand-orange-dark text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange-dark disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 transition-all duration-300 flex items-center justify-center"
        >
          Obtenir mon bilan
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};