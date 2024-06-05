////////////////////////INTERFACES////////////////////
/**
 * Represents a date value, which can be either a complete date or a pair of date values (start and end).
 */
export type ValuePiece = Date | null;

/**
 * Represents a date value, which can be either a complete date or a pair of date values (start and end).
 */
export type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * Represent a modal content.
 */
export type ModalContent = {
  state: boolean;
  message: string;
};

/**
 * Represent a trip.
 */
export type Trip = {
  state: boolean;
  name: string;
  startDay: Value;
};

/**
 * Represent a Image content.
 */
export interface ImageItem {
  src: string;
  text: string;
  description:string;
  number:number;
}



////////////////////////INTERFACES////////////////////

/**
 * Propriétés pour le composant Quote.
 */
export interface QuoteProps {
  text: string;
  author: string;
  position: 'left' | 'right';
}
/**
 * Propriétés pour le composant NewTrip.
 */
export interface NewTripProps {
  trip: Trip;
  handleNameChange: (name: string) => void;
  handleStartDayChange: (startDay: Value) => void;
  handleChangeState: (state: boolean) => void;
  formatDate: (date: Value) => string;
}
/**
 * Propriétés pour le composant ModalButton.
 */
export interface ModalButtonProps {
  color : string,
 text : string,
 action : () => void,
}

/**
 * Propriétés pour le composant StepCard.
 */
export interface StepCardProps {
  src: string;
  text:string;
  description:string;
  number:number;
}