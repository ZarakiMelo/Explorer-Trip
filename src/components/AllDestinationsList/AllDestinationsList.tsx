import React, {useState} from 'react';
import styles from './AllDestinationsList.module.css'
import DestinationCard from '../DestinationCard/DestinationCard';
import { AllDestinationsListProps, ValuePiece } from '../../types';
import { Value,LocationData } from '../../types';


const AllDestinationsList: React.FC<AllDestinationsListProps> = ({trip, handleDeleteDestination}) => {
  //const [modal, setModal] = useState<boolean>(false);
  //const [selectedDestination, setSelectedDestination] = useState<LocationData | null>(null);

  /*const openCloseModal = (destination?: LocationData) => {
    setSelectedDestination(destination || null);
    setModal(!modal);
  };*/

if(Array.isArray(trip.locations[0].dates))console.log("Location type dates before filter:", typeof(trip.locations[0].dates[0]));

const parseDates = (dates: any): [ValuePiece, ValuePiece] | null => {
  if (Array.isArray(dates) && dates.length === 2) {
    return [new Date(dates[0]), new Date(dates[1])];
  }
  return null;
};


const displayLocations = trip.locations
  .map((location) => {
    location.dates = Array.isArray(location.dates) ? parseDates(location.dates) : location.dates;
    return location;
  })
  .filter((location) => {
    if (Array.isArray(location.dates)) {
      return location.dates[0] instanceof Date && location.dates[1] instanceof Date;
    }
    return false;
  })
  .sort((a, b) => {
    const dateA = (a.dates as [Date, Date])[0].getTime();
    const dateB = (b.dates as [Date, Date])[0].getTime();
    return dateA - dateB;
  })
  .map((location) => (
    <DestinationCard
      key={location.id}
      destination={location}
      handleDeleteDestination={handleDeleteDestination}
    />
  ));

  //console.log({"AllDestinations - Tableau envoyé en props à DestinationCard:":displayLocations})
  return (
    <div className={styles.list_container}>
      {displayLocations}
          
    </div>

  )
}

export default AllDestinationsList
