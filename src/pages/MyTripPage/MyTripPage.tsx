import React, { useState, useEffect } from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';
import { Trip, Value, LocationData, ValuePiece, AlertModalContent } from '../../types';
import AddDestination from '../../components/AddDestination/AddDestination';
import Mapp from '../../components/Mapp/Mapp';
import DeleteTrip from '../../components/DeleteTrip/DeleteTrip';
import Divider from '../../components/Divider/Divider';
import AllDestinationsList from '../../components/AllDestinationsList/AllDestinationsList';

/**
 * MyTripPage component for managing and displaying trip details.
 */
const MyTripPage: React.FC = () => {
   /**
   * Loads the initial trip from localStorage or returns a default trip object.
   * @returns Initial trip object.
   */
  const loadInitialTrip = (): Trip => {
    try {
      const savedTrip = localStorage.getItem('trip');
      if (savedTrip) {
        const parsedTrip = JSON.parse(savedTrip);
        console.log("Loaded trip from localStorage:", parsedTrip);
        return {
          ...parsedTrip,
          startDay: parsedTrip.startDay ? new Date(parsedTrip.startDay) : new Date(),
        };
      }
      return createEmptyTrip();
    } catch (error) {
      console.error("Error parsing localStorage item 'trip':", error);
      return createEmptyTrip();
    }
  };

  const [trip, setTrip] = useState<Trip>(() => loadInitialTrip());
  const [alertModal, setAlertModal] = useState<AlertModalContent>({ type: "", state: false, message: "", icon: null, iconColor: "" });
  useEffect(() => {
    saveTripToLocalStorage(trip);
  }, [trip]);
  
   /**
   * Opens the alert modal with specified message, icon, and icon color.
   * @param message - Message to display in the alert modal.
   * @param icon - Icon to display in the alert modal.
   * @param iconColor - Color of the icon in the alert modal.
   */
   const openAlertModal = (message: string, icon: any, iconColor: string) => {
    setAlertModal({ ...alertModal, state: true, message, icon, iconColor });
  }
    /**
   * Closes the alert modal.
   */
    const closeAlertModal = () => {
      setAlertModal({ ...alertModal, state: false, message: "" });
    }
 
  /**
   * Creates an empty trip object.
   * @returns Empty trip object.
   */
  const createEmptyTrip = (): Trip => ({
    state: false,
    name: "",
    startDay: new Date(),
    locations: []
  });

  /**
   * Saves the trip to localStorage.
   * @param trip - The trip object to save.
   */
  const saveTripToLocalStorage = (trip: Trip) => {
    try {
      localStorage.setItem('trip', JSON.stringify(trip));
    } catch (error) {
      console.error("Error setting localStorage item 'trip':", error);
    }
  };

  /**
   * Handles the name change of the trip.
   * @param name - The new name of the trip.
   */
  const handleNameChange = (name: string) => {
    setTrip((prevTrip) => ({ ...prevTrip, name }));
  };

  /**
   * Handles the start day change of the trip.
   * @param startDay - The new start day of the trip.
   */
  const handleStartDayChange = (startDay: ValuePiece | [ValuePiece, ValuePiece]) => {
    const newStartDay = Array.isArray(startDay) ? startDay[0] : startDay;
    setTrip((prevTrip) => ({ ...prevTrip, startDay: newStartDay }));
  };

  /**
   * Toggles the state of the trip.
   * @param state - The current state of the trip.
   */
  const handleChangeState = (state: boolean) => {
    setTrip((prevTrip) => ({ ...prevTrip, state: !state }));
  };

  /**
   * Adds a new location to the trip.
   * @param location - The location to add.
   */
  const handleAddLocation = (location: LocationData) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      locations: [...prevTrip.locations, location]
    }));
  };

  /**
   * Deletes the trip.
   */
  const handleDeleteTrip = () => {
    setTrip(createEmptyTrip());
  };

  /**
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: Value): string => {
    if (!date || Array.isArray(date)) return "";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };

  /**
   * Deletes a destination from the trip.
   * @param id - The ID of the destination to delete.
   */
  const handleDeleteDestination = (id: number) => {
    const newLocations = trip.locations.filter((location) => location.id !== id);
    setTrip((prevTrip) => ({
      ...prevTrip,
      locations: newLocations
    }));
  };

  /**
   * Changes the dates of a location in the trip.
   * @param dates - The new dates for the location.
   * @param id - The ID of the location to update.
   */
  const changeDates = (dates: Value, id: number) => {
    const updatedLocations = trip.locations.map(location => {
      if (location.id === id) {
        return { ...location, dates };
      }
      return location;
    });
    setTrip((prevTrip) => ({
      ...prevTrip,
      locations: updatedLocations
    }));
  };

  console.log({ "Trip in MyTripPage": trip });

  return (
    <div className={styles.container}>
      <NewTrip
        trip={trip}
        handleNameChange={handleNameChange}
        handleStartDayChange={handleStartDayChange}
        formatDate={formatDate}
        handleChangeState={handleChangeState}
      />
      {trip.state && (
        <>
          <AddDestination handleAddLocation={handleAddLocation} trip={trip} />
          {trip.locations.length > 0 && (
            <>
              <Divider />
              <AllDestinationsList
                trip={trip}
                handleDeleteDestination={handleDeleteDestination}
                changeDates={changeDates}
              />
              <Divider />
              <Mapp trip={trip} />
            </>
          )}
          <Divider />
          <DeleteTrip handleDeleteTrip={handleDeleteTrip} openAlertModal={openAlertModal} modal={alertModal} closeModal={closeAlertModal} />
        </>
      )}
    </div>
  );
};

export default MyTripPage;
