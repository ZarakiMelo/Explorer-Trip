import React, {useState} from 'react';
import styles from './AllDestinationsList.module.css'
import DestinationCard from '../DestinationCard/DestinationCard';
import { AllDestinationsListProps } from '../../types';


const AllDestinationsList: React.FC<AllDestinationsListProps> = ({allDestinations, handleDeleteDestination}) => {
  const [modal, setModal] = useState<boolean>(false);
  //Modal functions
  const openCloseModal = () => {
    setModal(!modal)
  }

const displayLocations = allDestinations
  .filter((location) => {
    return Array.isArray(location.dates) && location.dates[0] instanceof Date;
  })
  .sort((a, b) => {
    const dateA = new Date((a.dates as [Date, Date])[0]).getTime();
    const dateB = new Date((b.dates as [Date, Date])[0]).getTime();
    return dateA - dateB; // Trier par date de début (ascendant)
  })
  .map((location) => {
    return (
      <DestinationCard
        key={location.id}
        destination={location}
        modal={modal}
        handleDeleteDestination={handleDeleteDestination}
        openCloseModal={openCloseModal}
      />
    );
  });

  return (
    <div className={styles.list_container}>
      {displayLocations}
          
    </div>

  )
}

export default AllDestinationsList
