import React from 'react';
import styles from './AllDestinationsList.module.css'
import DestinationCard from '../DestinationCard/DestinationCard';
import { AllDestinationsListProps, ValuePiece } from '../../types';

/**
 * AllDestinationsList component to display a list of destinations.
 * @param trip - Trip object containing the locations.
 * @param handleDeleteDestination - Function to handle the deletion of a destination.
 * @param changeDates - Function to handle the change of dates for a destination.
 * @returns JSX Element
 */
const AllDestinationsList: React.FC<AllDestinationsListProps> = (props) => {
  const { trip, handleDeleteDestination, changeDates } = props;

  /**
   * Parses date strings into Date objects.
   * @param dates - Array of date strings.
   * @returns Tuple of Date objects or null.
   */
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
        trip={trip}
        changeDates={changeDates}
      />
    ));

  return (
    <div className={styles.list_container}>
      {displayLocations}
    </div>
  );
};

export default AllDestinationsList;
