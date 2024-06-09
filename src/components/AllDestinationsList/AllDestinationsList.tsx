import React from 'react';
import styles from './AllDestinationsList.module.css'
import DestinationCard from '../DestinationCard/DestinationCard';
import { AllDestinationsListProps } from '../../types';


const AllDestinationsList: React.FC<AllDestinationsListProps> = ({allDestinations}) => {


const displayLocations =

allDestinations.map((location,index)=>{
  if(location.dates && !(location.dates instanceof Date)){
    //console.log(typeof(location.dates[0]))
  }
    return    <DestinationCard key={index} destination={location}/>;
});
  return (
    <div className={styles.list_container}>
      {displayLocations}
          
    </div>

  )
}

export default AllDestinationsList
