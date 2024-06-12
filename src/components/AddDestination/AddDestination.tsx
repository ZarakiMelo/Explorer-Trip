import React, { useState } from 'react';
import styles from './AddDestination.module.css';
import { AddDestinationProps, Coordinates, Value, AlertModalContent } from '../../types';
import AlertModal from '../AlertModal/AlertModal';
import ActionButton from '../ActionButton/ActionButton';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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
 * AddDestination component allows users to add a new destination to the trip.
 * @param handleAddLocation - Function to handle the addition of a new location.
 * @param trip - The trip object containing the trip details.
 * @returns JSX Element
 */
const AddDestination: React.FC<AddDestinationProps> = (props) => {
    const [openPage, setOpenPage] = useState<boolean>(false);
    const [value, setValue] = useState<any>(null);
    const [dates, setDates] = useState<Value>([null, null]);
    const [coordinates, setCoordinates] = useState<Coordinates>({ lat: null, lng: null });
    const [modal, setModal] = useState<AlertModalContent>({ type: "", state: false, message: "", icon: null, iconColor: "" });
    const { handleAddLocation, trip } = props;
    const apiKey = process.env.REACT_APP_API_KEY

    /**
     * Resets the input fields.
     */
    const resetInputs = () => {
        setValue(null);
        setCoordinates({ lat: null, lng: null });
        setDates([null, null]);
    }

    // Modal functions
    const openAlertModal = (message: string, icon: any, iconColor: string) => {
        setModal({ ...modal, state: true, message, icon, iconColor });
    }
    const closeAlertModal = () => { setModal({ ...modal, state: false, message: "" }) }

    /**
     * Handles the selection of an address from the Google Places Autocomplete.
     * @param address - The selected address object.
     */
    const handleSelect = (address: any) => {
        if (!address || !address.label) {
            console.error("Invalid address selected");
            return;
        }
        console.log({ "Lieu selectionné :": address.label });
        setValue(address);
        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
            })
            .catch(error => console.error('Error: ', error));
    };

    /**
     * Handles the submission of the new destination.
     */
    const handleSubmit = () => {
        if (!validateDestination()) return;
        const newLocation = { ...coordinates, dates, name: value.label, id: Date.now() };
        handleAddLocation(newLocation);
        resetInputs();
        setOpenPage(!openPage);
    }

    /**
     * Validates the selected destination.
     * @returns boolean - True if valid, false otherwise.
     */
    const validateDestination = (): boolean => {
        if (!coordinates.lat || !coordinates.lng) {
            openAlertModal("Saisir une destination", faPen, "#845A5A");
            return false;
        } else if (!validateDates()) {
            openAlertModal("Dates invalides", faPen, "#845A5A");
            return false;
        }
        return true;
    };

    /**
     * Validates the selected dates.
     * @returns boolean - True if valid, false otherwise.
     */
    const validateDates = (): boolean => {
        if (Array.isArray(dates) && dates[0] && dates[1]) {
            const newDateStart = dates[0] as Date;
            const newDateEnd = dates[1] as Date;
            for (const location of trip.locations) {
                if (Array.isArray(location.dates) && location.dates[0] && location.dates[1]) {
                    const existingStartDate = location.dates[0] as Date;
                    const existingEndDate = location.dates[1] as Date;
                    if ((newDateStart > existingEndDate) || (newDateEnd < existingStartDate)) {
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

    /**
     * Handles the change of dates in the calendar.
     * @param dates - The selected dates.
     */
    const handleDatesChange = (dates: Value) => {
        setDates(dates);
    }

    /**
     * Converts null to undefined for date values.
     * @param value - The date value.
     * @returns Date or undefined.
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

    return (
        <div className={styles.container} >
            <AlertModal modal={modal} closeModal={closeAlertModal}></AlertModal>
            <div className={styles.open_button_container}>
                <button className={styles.window_button} type='button' onClick={() => { setOpenPage(!openPage) }}>Ajouter une destination</button>
            </div>

            <div className={`${styles.window_container} ${openPage ? styles.open : ''}`}>
                <div className={styles.main_container}>
                    <div className={styles.img_container}>
                        <img src='/montainFromBoatPicture.jpg' alt='map planner' />
                    </div>
                    <div className={styles.inputs_container}>
                        <div className={styles.name_input_container}>
                            <p className={styles.input_title}>Nom :</p>
                            <GooglePlacesAutocomplete apiKey={apiKey}
                                selectProps={{
                                    value: value,
                                    onChange: handleSelect,
                                    getOptionLabel: (option: any) => option.label || "",
                                    getOptionValue: (option: any) => option.place_id || "",
                                    styles: customStyles,
                                }} />
                        </div>
                        <div className={styles.calendar_container}>
                            <Calendar onChange={handleDatesChange} value={dates} minDate={convertNullToUndefined(trip.startDay)} locale="fr" selectRange={true}
                                formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: fr })}
                                formatMonth={(locale, date) => format(date, 'LLLL', { locale: fr })}
                                formatMonthYear={(locale, date) => format(date, 'LLLL yyyy', { locale: fr })} />
                        </div>
                    </div>
                </div>

                <div className={styles.buttons_container}>
                    <div className={styles.confirmButton_container}>
                        <ActionButton action={handleSubmit} color={1} text="Valider" />
                    </div>
                    <div className={styles.cancelButton_container}>
                        <ActionButton action={resetInputs} color={3} text="Effacer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDestination
