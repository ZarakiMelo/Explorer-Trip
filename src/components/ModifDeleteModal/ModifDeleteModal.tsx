import React, { useState } from 'react';
import { ModifDeleteModalProps, Value, AlertModalContent } from '../../types';
import Modal from 'react-modal';
import { faPen, faStop } from '@fortawesome/free-solid-svg-icons';
import styles from './ModifDeleteModal.module.css';
import ActionButton from '../ActionButton/ActionButton';
import AlertModal from '../AlertModal/AlertModal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const customStyles: Modal.Styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "500px",
    width: "600px",
    borderRadius: "20px",
    border: "2px solid #5A6E55",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: "#e0ddda",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 9998,
  },
};

/**
 * ModifDeleteModal component for modifying or deleting a destination.
 * @param props - Props for the ModifDeleteModal component.
 * @returns JSX.Element
 */
const ModifDeleteModal: React.FC<ModifDeleteModalProps> = (props) => {
    const { openCloseModifModal, destination, modifModal, handleDeleteDestination, trip, changeDates, openAlertModal } = props;
  const [dates, setDates] = useState<Value>(destination.dates);
  const [modifMode, setModifMode] = useState<boolean>(false);

  const [alertModal, setAlertModal] = useState<AlertModalContent>({ type: "", state: false, message: "", icon: null, iconColor: "" });
    /**
   * Closes the alert modal.
   */
    const closeAlertModal = () => {
      setAlertModal({ ...alertModal, state: false, message: "" });
    }
  /**
   * Deletes the destination.
   */
  const deleteDestination = () => {
    openCloseModifModal();
    handleDeleteDestination(destination.id);
  }

  /**
   * Handles changes to the date range selected in the calendar.
   * @param dates - The new date range.
   */
  const handleDatesChange = (dates: Value) => {
    setDates(dates);
  }

  /**
   * Converts a null value to undefined.
   * @param value - The value to convert.
   * @returns The converted value or undefined.
   */
  const convertNullToUndefined = (value: Value): Date | undefined => {
    if (value === null) {
      return undefined;
    }
    if (Array.isArray(value)) {
      return value[0] ?? undefined;
    }
    return value;
  };

  /**
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: Value): string => {
    if (!date || Array.isArray(date)) return "";
    const options ={ day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };

  /**
   * Handles the submission of the date change.
   */
  const handleSubmit = () => {
    if (!validateDates()) {
      openAlertModal("Dates indisponibles", faPen, "#845A5A");
      return;
    } else {
      changeDates(dates, destination.id);
      openCloseModifModal();
      openAlertModal("Dates changées", faStop, "#5A6E55");
      setModifMode(false);
    }
  }

  /**
   * Validates the selected dates to ensure they do not overlap with existing locations.
   * @returns True if dates are valid, otherwise false.
   */
  const validateDates = (): boolean => {
    if (Array.isArray(dates) && dates[0] && dates[1]) {
      const newDateStart = dates[0] as Date;
      const newDateEnd = dates[1] as Date;
      for (const location of trip.locations) {
        if (Array.isArray(location.dates) && location.dates[0] && location.dates[1]) {
          const existingStartDate = location.dates[0] as Date;
          const existingEndDate = location.dates[1] as Date;
          if ((newDateStart > existingEndDate) || (newDateEnd < existingStartDate) || location.id === destination.id) {
            continue;
          } else {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  return (
    <Modal
      isOpen={modifModal}
      onRequestClose={()=>openCloseModifModal}
      style={customStyles}
      contentLabel="Modification Modal"
      shouldCloseOnOverlayClick={false}
    >
      {modifMode && (
        <div className={styles.modal_container}>
          <p className={styles.location}>{destination.name}</p>
          <Calendar
            onChange={handleDatesChange}
            value={dates}
            minDate={convertNullToUndefined(trip.startDay)}
            locale="fr"
            selectRange={true}
            formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: fr })}
            formatMonth={(locale, date) => format(date, 'LLLL', { locale: fr })}
            formatMonthYear={(locale, date) => format(date, 'LLLL yyyy', { locale: fr })}
          />
          <div className={styles.buttons_container}>
            <ActionButton action={handleSubmit} text="Valider" color={1} />
            <ActionButton action={() => setModifMode(false)} text="Annuler" color={1} />
          </div>
        </div>
      )}
      {!modifMode && (
        <div className={styles.modal_container}>
          <p className={styles.location}>{destination.name}</p>
          <div className={styles.dates_container}>
            <p className={styles.location}>
              {destination.dates && Array.isArray(destination.dates) ? formatDate(destination.dates[0]) : "error date"} au {destination.dates && Array.isArray(destination.dates) ? formatDate(destination.dates[1]) : "error date"}
            </p>
            <button className={styles.dates_change_button} type='button' onClick={() => setModifMode(true)}>Modifier les dates</button>
          </div>
          <div className={styles.buttons_container}>
            <ActionButton action={openCloseModifModal} text="Annuler" color={1} />
            <ActionButton action={deleteDestination} text="Supprimer" color={2} />
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ModifDeleteModal;
