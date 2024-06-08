import React from 'react';
import styles from './AllDestinationsList.module.css'
import { Location } from '../../types';
import DestinationCard from '../DestinationCard/DestinationCard';

interface AllDestinationsListProps{
    allDestinations : Location[],
}
const AllDestinationsList: React.FC<AllDestinationsListProps> = ({allDestinations}) => {
const displayLocations =allDestinations.map((location)=>{
    return<p>{location.lat}</p>
})
  return (
   /* <div>
      {displayLocations}
          
    </div>*/
<DestinationCard/>
  )
}

export default AllDestinationsList
