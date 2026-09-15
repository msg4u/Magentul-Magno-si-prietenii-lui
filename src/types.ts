export type TabType = 'poveste' | 'activitate' | 'extensie' | 'ghid';

export type MaterialType = 
  | 'fier' 
  | 'otel' 
  | 'aluminiu' 
  | 'alama' 
  | 'aur' 
  | 'cupru' 
  | 'plastic' 
  | 'lemn' 
  | 'sticla' 
  | 'piatra' 
  | 'pluta' 
  | 'cauciuc' 
  | 'textil';

export interface TestObject {
  id: string;
  name: string;
  material: string;
  materialType: MaterialType;
  isMagnetic: boolean; // Is it an iron friend?
  description: string;
  childHint: string;
  scienceExplanation: string;
  iconName: string;
  color: string;
  inStory: boolean; // Featured in the original story?
  imageColor: string;
}

export interface PredictionState {
  [objectId: string]: 'prieten' | 'nu_prieten' | null;
}

export interface TestResultState {
  [objectId: string]: {
    tested: boolean;
    sortedTo: 'prieteni' | 'nu_prieteni' | null;
    isCorrectPrediction: boolean | null;
  };
}

export interface BarrierMaterial {
  id: string;
  name: string;
  thickness: string;
  allowsMagnetism: boolean;
  explanation: string;
  icon: string;
  color: string;
}
