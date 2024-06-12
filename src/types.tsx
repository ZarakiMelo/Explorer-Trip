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
export type LocationData ={
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
  startDay: ValuePiece,
  locations:LocationData[],
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
  handleStartDayChange: (value: ValuePiece | [ValuePiece, ValuePiece]) => void;
  handleChangeState: (state: boolean) => void;
  formatDate: (date: Value) => string;
}
/**
 * Propriétés pour le composant ModalButton.
 */
export interface ActionButtonProps {
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
  destination : LocationData,
  openAlertModal : (message: string, icon : any, iconColor:string) => void,
  openCloseModifModal: (location?: LocationData) => void; 
 modifModal:boolean,
 formatDate: (date:ValuePiece) => void,
 handleDeleteDestination :(id:number) => void;
 trip:Trip,
 changeDates : (dates:Value,id:number) => void
}
/**
 * Propriétés pour le composant AddDestination.
 */
export interface AddDestinationProps{
  handleAddLocation : (location:LocationData) => void,
  trip : Trip,
  } 

  /**
 * Propriétés pour le composant DeleteTrip.
 */
export interface DeleteTripProps{
  handleDeleteTrip : () => void,
  openAlertModal : (message: string, icon : any, iconColor:string) => void,
  closeModal: () => void,
  modal:AlertModalContent,
  } 
  /**
 * Propriétés pour le composent DestinationCard.
 */
 export interface AllDestinationsListProps{
    trip:Trip,
   handleDeleteDestination :(id:number) => void
   changeDates : (dates:Value,id:number) => void
}
  /**
 * Propriétés pour le composant DestinationCard.
 */
export interface DestinationCardProps{
    destination : LocationData,
    handleDeleteDestination :(id:number) => void,
    trip:Trip
    changeDates : (dates:Value,id:number) => void
  }

    /**
 * Propriétés pour le composant Mapp.
 */
export interface MappProps{
  trip:Trip

}

    /**
 * Propriétés pour le composant RoutingMachin.
 */
    export interface RoutingMachinProps{
      trip : Trip,
      defaultIcon:L.Icon<L.IconOptions>

    }