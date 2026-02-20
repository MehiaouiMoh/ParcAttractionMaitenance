export interface MessageInterface {
  nom?: string;          // peut être anonyme
  prenom?: string;       // peut être anonyme
  message: string;       // texte obligatoire
  note_attraction?: number; // 1 à 5
}