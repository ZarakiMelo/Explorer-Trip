////////////////////////INTERFACES////////////////////

import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

/**
 * Represents a date value, which can be either a complete date or a pair of date values (start and end).
 */
export type ValuePiece = Date | null;

/**
 * Represents a date value, which can be either a complete date .
 */
export type Value =  ValuePiece | [ValuePiece, ValuePiece] ;

/*
 * Represent a Coordinate Object.
 */
export type Coordinates = {
  lat:number | null,
  lng:number | null,
}

/**
 * Represent a location.
 */
export type Location ={
  id: number,
  lat:number | null,
  lng:number | null,
  dates : Value,
  name:string,
}

/**
 * Represent a trip.
 */
export type Trip = {
  state: boolean,
  name: string,
  startDay: Value,
  locations:Location[],
};


/**
 * Represent a Image content.
 */
export interface ImageItem {
  src: string,
  text: string,
  description:string,
  number:number,
}

/**
 * Represent a modal content.
 */
export type AlertModalContent = {
  type : string,
  state: boolean,
  message: string,
  icon : any,
  iconColor : string,
};

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
export interface ConfirmCancelButtonProps {
color : number,
 text : string,
 action : () => void,
}

/**
 * Propriétés pour le composant StepCard.
 */
export interface StepCardProps {
  src: string,
  text:string,
  description:string,
  number:number,
}

/**
 * Propriétés pour le composant AlertModal.
 */
export interface AlertModalProps{
  modal:AlertModalContent,
  closeModal : () => void,
}
/**
 * Propriétés pour le composant ModifDeleteModal.
 */
export interface ModifDeleteModalProps{

  destination : Location,
  openCloseModal:()=> void,
 modal:boolean,
 formatDate: (date:ValuePiece) => void,
 handleDeleteDestination :(id:number) => void
}
/**
 * Propriétés pour le composant AddDestination.
 */
export interface AddDestinationProps{
  handleAddLocation : (location:Location) => void,
  trip : Trip,
  } 

  /**
 * Propriétés pour le composant DeleteTrip.
 */
export interface DeleteTripProps{
  handleDeleteTrip : () => void,
  } 
  /**
 * Propriétés pour le composant DestinationCard.
 */
 export interface AllDestinationsListProps{
    allDestinations : Location[],
   handleDeleteDestination :(id:number) => void
}
  /**
 * Propriétés pour le composant DestinationCard.
 */
export interface DestinationCardProps{
    destination : Location,
    handleDeleteDestination :(id:number) => void,
    modal: boolean,
    openCloseModal:()=> void,
  }

    /**
 * Propriétés pour le composant Mapp.
 */
export interface MappProps{
  allDestinations : Location[],
}

    /**
 * Propriétés pour le composant RoutingMachin.
 */
    export interface RoutingMachinProps{
      allDestinations : Location[],
      defaultIcon:L.Icon<L.IconOptions>
    }