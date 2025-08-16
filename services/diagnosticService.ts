import { PATHOLOGIES, ALL_SYMPTOMS } from '../constants';
import type { DiagnosticReport, DiagnosticResultItem, Symptom, Pathology } from '../types';

// Minimum number of matching symptoms to consider a pathology
const MIN_SYMPTOM_MATCH = 2;

const calculateScore = (pathology: Pathology, selectedSymptomIds: string[]): { score: number; matchingSymptoms: Symptom[] } => {
  const totalPathologyWeight = pathology.symptoms.reduce((sum, s) => sum + s.weight, 0);
  if (totalPathologyWeight === 0) return { score: 0, matchingSymptoms: [] };

  let matchedWeight = 0;
  const matchingSymptomDetails: Symptom[] = [];

  pathology.symptoms.forEach(pathologySymptom => {
    if (selectedSymptomIds.includes(pathologySymptom.id)) {
      matchedWeight += pathologySymptom.weight;
      const symptomDetail = ALL_SYMPTOMS.find(s => s.id === pathologySymptom.id);
      if (symptomDetail) {
        matchingSymptomDetails.push(symptomDetail);
      }
    }
  });

  if (matchingSymptomDetails.length < MIN_SYMPTOM_MATCH) {
    return { score: 0, matchingSymptoms: [] };
  }

  const score = Math.round((matchedWeight / totalPathologyWeight) * 100);
  return { score, matchingSymptoms: matchingSymptomDetails };
};


export function getDiagnostic(selectedSymptomIds: string[]): DiagnosticReport {
  if (selectedSymptomIds.length === 0) {
    return { results: [], selectedSymptoms: [] };
  }

  const results: DiagnosticResultItem[] = [];

  PATHOLOGIES.forEach(pathology => {
    const { score, matchingSymptoms } = calculateScore(pathology, selectedSymptomIds);
    
    if (score > 0) {
      results.push({
        pathology,
        score,
        matchingSymptoms: matchingSymptoms,
      });
    }
  });

  const sortedResults = results.sort((a, b) => b.score - a.score);

  const selectedSymptomsDetails: Symptom[] = ALL_SYMPTOMS.filter(symptom => selectedSymptomIds.includes(symptom.id));

  return {
    results: sortedResults.slice(0, 3), // Return only the top 3 most likely results
    selectedSymptoms: selectedSymptomsDetails
  };
}