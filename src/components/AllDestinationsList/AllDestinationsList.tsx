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

const displayLocations =
allDestinations.map((location)=>{
  if(location.dates && !(location.dates instanceof Date)){
    //console.log(typeof(location.dates[0]))
  }
    return    <DestinationCard key={location.id} destination={location} modal={modal} handleDeleteDestination={handleDeleteDestination} openCloseModal={openCloseModal} />;
});


  return (
    <div className={styles.list_container}>
      {displayLocations}
          
    </div>

  )
}

export default AllDestinationsList
