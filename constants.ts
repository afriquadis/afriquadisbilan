import React from 'react';
import type { SymptomCategory, Pathology, Symptom } from './types';
import { LungsIcon, StomachIcon, BrainIcon, BodyIcon, UrinaryIcon, SkinIcon, FemaleIcon, MaleIcon } from './components/icons/CategoryIcons';

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: 'general',
    name: 'Général',
    icon: React.createElement(BodyIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
      { id: 'fatigue', name: 'Fatigue intense / Épuisement', weight: 5 },
      { id: 'fever', name: 'Fièvre', weight: 4 },
      { id: 'headache', name: 'Maux de tête', weight: 3 },
      { id: 'weight_loss', name: 'Perte de poids inexpliquée', weight: 5 },
      { id: 'excessive_thirst', name: 'Soif excessive', weight: 4 },
      { id: 'frequent_urination', name: 'Envie fréquente d\'uriner', weight: 4 },
      { id: 'dizziness', name: 'Vertiges / Étourdissements', weight: 3 },
      { id: 'pallor', name: 'Pâleur de la peau', weight: 4 },
      { id: 'chills', name: 'Frissons', weight: 4 },
      { id: 'sweating', name: 'Sueurs (notamment nocturnes)', weight: 3 },
    ],
  },
  {
    id: 'digestive',
    name: 'Digestif',
    icon: React.createElement(StomachIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
      { id: 'abdominal_pain', name: 'Douleurs abdominales', weight: 5 },
      { id: 'nausea', name: 'Nausées / Vomissements', weight: 4 },
      { id: 'bloating', name: 'Ballonnements / Gaz', weight: 2 },
      { id: 'heartburn', name: 'Brûlures d\'estomac', weight: 3 },
      { id: 'diarrhea', name: 'Diarrhée', weight: 3 },
      { id: 'constipation', name: 'Constipation', weight: 2 },
      { id: 'loss_of_appetite', name: 'Perte d\'appétit', weight: 4 },
    ],
  },
  {
    id: 'respiratory',
    name: 'Respiratoire',
    icon: React.createElement(LungsIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
      { id: 'cough', name: 'Toux sèche ou grasse', weight: 4 },
      { id: 'shortness_of_breath', name: 'Essoufflement', weight: 5 },
      { id: 'sore_throat', name: 'Mal de gorge', weight: 3 },
      { id: 'nasal_congestion', name: 'Nez bouché / qui coule', weight: 2 },
    ],
  },
  {
    id: 'urinary',
    name: 'Urinaire',
    icon: React.createElement(UrinaryIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
        { id: 'urinary_pain', name: 'Douleur ou brûlure en urinant', weight: 5 },
        { id: 'urinary_urgency', name: 'Besoin urgent et fréquent d\'uriner', weight: 4 },
        { id: 'dark_urine', name: 'Urine trouble, foncée ou odorante', weight: 3 },
        { id: 'blood_in_urine', name: 'Sang dans les urines', weight: 5 },
    ],
  },
  {
    id: 'skin_hair',
    name: 'Peau & Cheveux',
    icon: React.createElement(SkinIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
        { id: 'rash', name: 'Éruptions cutanées / Rougeurs', weight: 4 },
        { id: 'itching', name: 'Démangeaisons intenses', weight: 3 },
        { id: 'acne', name: 'Acné sévère ou persistante', weight: 2 },
        { id: 'hair_loss', name: 'Perte de cheveux anormale', weight: 4 },
    ],
  },
  {
    id: 'gyneco',
    name: 'Gynécologie',
    icon: React.createElement(FemaleIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
        { id: 'period_pain', name: 'Douleurs menstruelles intenses', weight: 4 },
        { id: 'irregular_periods', name: 'Règles irrégulières', weight: 5 },
        { id: 'vaginal_discharge', name: 'Pertes inhabituelles', weight: 3 },
        { id: 'hot_flashes', name: 'Bouffées de chaleur', weight: 4 },
    ],
  },
   {
    id: 'virility',
    name: 'Virilité',
    icon: React.createElement(MaleIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
        { id: 'low_libido', name: 'Baisse de la libido', weight: 5 },
        { id: 'erectile_dysfunction', name: 'Troubles de l\'érection', weight: 5 },
        { id: 'prostate_issues', name: 'Difficultés à uriner (jet faible)', weight: 4 },
    ],
  },
  {
    id: 'mood',
    name: 'Humeur',
    icon: React.createElement(BrainIcon, null),
    colorClass: 'brand-orange',
    symptoms: [
      { id: 'irritability', name: 'Irritabilité / Changement d\'humeur', weight: 3 },
      { id: 'concentration_issues', name: 'Difficultés de concentration', weight: 4 },
      { id: 'blurred_vision', name: 'Vision floue', weight: 2 },
      { id: 'anxiety', name: 'Anxiété / Stress', weight: 3 },
      { id: 'sleep_disturbances', name: 'Troubles du sommeil', weight: 4 },
    ],
  },
];

export const ALL_SYMPTOMS: Symptom[] = SYMPTOM_CATEGORIES.flatMap(cat => cat.symptoms);


const getSymptomsWithWeights = (ids: string[]): { id: string, weight: number }[] => {
    return ids.map(id => {
        const symptom = ALL_SYMPTOMS.find(s => s.id === id);
        if (!symptom) {
            console.warn(`Symptom with id "${id}" not found.`);
            return { id, weight: 1 }; // Default weight if not found
        }
        return { id: symptom.id, weight: symptom.weight };
    });
};

export const PATHOLOGIES: Pathology[] = [
  {
    id: 'diabetes',
    name: 'Diabète (Suspicion)',
    description: 'Le diabète est une maladie chronique caractérisée par un excès de sucre dans le sang.',
    symptoms: getSymptomsWithWeights(['excessive_thirst', 'frequent_urination', 'fatigue', 'weight_loss', 'blurred_vision']),
    productKit: [
      { name: 'Pack Diabète Complet', description: '3 produits • Traitement complet', price: '35 000 FCFA' },
    ],
    lifestyleAdvice: [
      'Adoptez une alimentation équilibrée, pauvre en sucres rapides et en graisses saturées.',
      'Pratiquez une activité physique régulière (au moins 30 minutes par jour).',
      'Surveillez votre glycémie régulièrement.',
      'Maintenez une bonne hydratation en buvant beaucoup d\'eau.'
    ],
    urgency: 'modérée',
    categoryTag: 'Métabolique',
  },
  {
    id: 'anemia',
    name: 'Anémie',
    description: 'L\'anémie est une baisse anormale du taux d\'hémoglobine dans le sang, entraînant un mauvais transport de l\'oxygène.',
    symptoms: getSymptomsWithWeights(['fatigue', 'pallor', 'dizziness', 'headache', 'shortness_of_breath']),
    productKit: [
      { name: 'Pack Anémie Forte', description: '4 produits • Traitement complet', price: '40 500 FCFA' },
    ],
    lifestyleAdvice: [
      'Consommez des aliments riches en fer (légumes verts, lentilles, viande rouge).',
      'Associez la consommation de fer avec de la vitamine C pour une meilleure absorption.',
      'Évitez de boire du thé ou du café pendant les repas.',
      'Reposez-vous suffisamment.'
    ],
    urgency: 'modérée',
    categoryTag: 'Hématologique',
  },
  {
    id: 'malaria',
    name: 'Paludisme',
    description: 'Le paludisme (ou malaria) est une maladie infectieuse due à un parasite transmis par la piqûre de certains moustiques.',
    symptoms: getSymptomsWithWeights(['fever', 'chills', 'headache', 'sweating', 'nausea', 'fatigue']),
    productKit: [
      { name: 'Pack Paludisme Complet', description: '3 produits • Traitement complet', price: '31 500 FCFA' },
    ],
    lifestyleAdvice: [
      'Consultez un médecin d\'urgence pour confirmation et traitement.',
      'Utilisez des moustiquaires et des répulsifs pour prévenir les piqûres.',
      'Reposez-vous et hydratez-vous abondamment.',
      'Éliminez les eaux stagnantes autour de votre domicile.'
    ],
    urgency: 'élevée',
    categoryTag: 'Parasitaire',
  },
  {
    id: 'ulcer',
    name: 'Ulcère Gastrique',
    description: 'Un ulcère gastrique est une plaie qui se forme sur la muqueuse de l\'estomac.',
    symptoms: getSymptomsWithWeights(['abdominal_pain', 'heartburn', 'bloating', 'nausea', 'loss_of_appetite']),
    productKit: [
      { name: 'Pack Ulcère Confort', description: '3 produits • Traitement complet', price: '38 000 FCFA' },
    ],
    lifestyleAdvice: [
      'Évitez les aliments acides, épicés et gras.',
      'Mangez des repas plus petits et plus fréquents.',
      'Arrêtez le tabac et limitez la consommation d\'alcool.',
      'Gérez votre stress avec des techniques de relaxation.'
    ],
    urgency: 'modérée',
    categoryTag: 'Digestif',
  },
  {
    id: 'chronic_fatigue',
    name: 'Fatigue Chronique',
    description: 'Le syndrome de fatigue chronique est un état d\'épuisement complexe et de longue durée.',
    symptoms: getSymptomsWithWeights(['fatigue', 'concentration_issues', 'sleep_disturbances', 'headache', 'irritability']),
    productKit: [
      { name: 'Pack Énergie Vitale', description: '3 produits • Traitement complet', price: '29 500 FCFA' },
    ],
    lifestyleAdvice: [
      'Adoptez un rythme de sommeil régulier.',
      'Pratiquez une activité physique douce (marche, yoga).',
      'Adoptez une alimentation riche en vitamines et minéraux.',
      'Apprenez à gérer votre énergie tout au long de la journée, en alternant repos et activité.'
    ],
    urgency: 'faible',
    categoryTag: 'Général',
  },
  {
    id: 'urinary_infection',
    name: 'Infection Urinaire',
    description: 'Une infection urinaire est une infection qui peut toucher une ou plusieurs parties du système urinaire.',
    symptoms: getSymptomsWithWeights(['urinary_pain', 'urinary_urgency', 'dark_urine', 'fever', 'abdominal_pain']),
    productKit: [
      { name: 'Pack Confort Urinaire', description: '2 produits • Action ciblée', price: '25 000 FCFA' },
    ],
    lifestyleAdvice: [
      'Buvez beaucoup d\'eau (1.5 à 2 litres par jour) pour "nettoyer" la vessie.',
      'Ne vous retenez pas d\'uriner lorsque l\'envie se fait sentir.',
      'Urinez systématiquement après les rapports sexuels.',
      'Portez des sous-vêtements en coton.'
    ],
    urgency: 'modérée',
    categoryTag: 'Infectieux',
  },
    {
    id: 'female_hormonal_imbalance',
    name: 'Déséquilibre Hormonal (Femme)',
    description: 'Les fluctuations hormonales peuvent causer divers symptômes affectant le cycle menstruel, l\'humeur et le bien-être général.',
    symptoms: getSymptomsWithWeights(['irregular_periods', 'period_pain', 'acne', 'irritability', 'hot_flashes']),
    productKit: [
      { name: 'Pack Équilibre Féminin', description: '3 produits • Régulation hormonale', price: '42 000 FCFA' },
    ],
    lifestyleAdvice: [
      'Adoptez une alimentation riche en légumes verts, en bonnes graisses (avocat, noix) et en protéines.',
      'Pratiquez une activité physique régulière pour réguler les hormones et le stress.',
      'Assurez-vous d\'avoir un sommeil de qualité et suffisant.',
      'Limitez votre consommation de sucre, de caféine et d\'aliments transformés.'
    ],
    urgency: 'faible',
    categoryTag: 'Hormonal',
  },
];