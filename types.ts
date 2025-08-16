import React from 'react';

export interface Symptom {
  id: string;
  name: string;
  weight: number; // Importance of the symptom
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  symptoms: Symptom[];
  colorClass: string; // For dynamic UI theming
}

export interface Product {
  name: string;
  description: string;
  price?: string;
}

export interface Pathology {
  id: string;
  name: string;
  description: string;
  symptoms: { id: string; weight: number }[]; // Array of symptom IDs with their weights
  productKit: Product[];
  lifestyleAdvice: string[];
  urgency?: 'faible' | 'modérée' | 'élevée';
  categoryTag?: string;
}

export interface DiagnosticResultItem {
  pathology: Pathology;
  score: number; // Percentage match based on weights
  matchingSymptoms: Symptom[];
}

export interface DiagnosticReport {
  results: DiagnosticResultItem[];
  selectedSymptoms: Symptom[];
}