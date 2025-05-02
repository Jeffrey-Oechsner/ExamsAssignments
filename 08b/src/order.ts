/**
 * Repræsenterer en ordre placeret af en bruger.
 */
export interface Order {
    /** Unik ID for ordren */
    id: string;
    /** Liste over produktnavne i ordren */
    items: string[];
    /** Samlet pris for ordren */
    total: number;
  }
  