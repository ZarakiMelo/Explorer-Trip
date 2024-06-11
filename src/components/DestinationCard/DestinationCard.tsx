import React, { useState } from 'react';
import styles from './DestinationCard.module.css';
import { DestinationCardProps, ValuePiece, AlertModalContent } from '../../types';
import ModifDeleteModal from '../ModifDeleteModal/ModifDeleteModal';
import AlertModal from '../AlertModal/AlertModal';

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "455px",
    marginBottom: "1rem",
    border: `3px solid #5A6E55`,
    borderRadius: "10px",
    marginTop: "10px",
  }),
  input: (provided: any) => ({
    ...provided,
    width: '100%',
    height: "100%",
    fontSize: '20px',
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: '20px',
    padding: '10px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: '20px',
  }),
};

/**
 * DestinationCard component for displaying individual destination details.
 * @param props - Props for the DestinationCard component.
 * @returns JSX.Element
 */
const DestinationCard: React.FC<DestinationCardProps> = (props) => {
  const [modifModal, setModifModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<AlertModalContent>({ type: "", state: false, message: "", icon: null, iconColor: "" });
  const { destination, handleDeleteDestination, trip, changeDates } = props;

  /**
   * Toggles the modification modal.
   */
  const openCloseModifModal = () => {
    setModifModal(!modifModal);
  };

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
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: ValuePiece): string => {
    if (!date || !(date instanceof Date)) return "false";
    const options =  { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };;
    return date.toLocaleDateString('fr-FR', options);
  };

  /**
   * Handles the click event for modifying the destination.
   */
  const handleClick = () => {
    openCloseModifModal();
  }

  return (
    <div className={styles.card_container}>
      <AlertModal modal={alertModal} closeModal={closeAlertModal} />
      <ModifDeleteModal
        openAlertModal={openAlertModal}
        formatDate={formatDate}
        modifModal={modifModal}
        openCloseModifModal={openCloseModifModal}
        destination={destination}
        handleDeleteDestination={handleDeleteDestination}
        trip={trip}
        changeDates={changeDates}
      />
      <div className={styles.card_media}>
        {/* Media content goes here */}
      </div>
      <div className={styles.card_infos}>
        <p>{destination.name.slice(0, 20)}</p>
        {destination.dates && Array.isArray(destination.dates) && (
          <>
            <p>{formatDate(destination.dates[0])} au {formatDate(destination.dates[1])}</p>
          </>
        )}
        <div className={styles.button_container}>
          <button className={styles.delete_button} type='button' onClick={handleClick}>Modifier</button>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
