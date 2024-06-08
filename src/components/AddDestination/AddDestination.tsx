import React, {useState}from 'react';
import styles from './AddDestination.module.css';
import Title from '../Title/Title';
import { AddDestinationProps, Coordinates, Value, ValuePiece } from '../../types';
import ConfirmCancelButton from '../ModalButton/ConfirmCancelButton';
import GooglePlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const customStyles = {
    container :(provided: any) => ({
        ...provided,
        width: "455px",
        marginBottom: "1rem",
        border: `3px solid #5A6E55`,
        borderRadius: "10px",
        marginTop:"10px",
    }),
    input: (provided: any) => ({
        ...provided,
        width: '100%',
        heigth:"100%",
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


const AddDestination: React.FC<AddDestinationProps> = ({handleAddLocation, trip}) => {
    const [open,setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>(null);
    const [dates, setDates] = useState<Value>([null,null]);
    const [coordinates, setCoordinates]=useState<Coordinates>({ lat: null,
        lng: null});

    const handleSelect = (address: any) => {
        setValue(address.label);
        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCoordinates({lat,lng});
            })
            .catch(error => console.error('Error: ', error));
    };

    const handleSubmit=()=> {
        if(!validateDestination())return;
        const newLocation = {...coordinates,dates,name:value};
        console.log({"Nouvelle destination":newLocation});
        handleAddLocation(newLocation);
        setValue(null);
        setCoordinates({ lat: null,
            lng: null});
        setDates([null,null]);
        setOpen(!open);
    }
    const validateDestination = () => {
        if (!coordinates.lat || !coordinates.lng) {
            console.log('Saisir un lieu');
            return false;
        } else if (!dates) {
            console.log('Saisir les dates !');
            return false;
        } 
        return true
    }
  
    const resetInputs = () =>{
        setValue(null);
        setCoordinates({lat:null,lng:null});
        setDates([null,null]);
    }

    const handleDatesChange = (dates:Value)=>{
        setDates(dates);
    }
    return (
        <div className={styles.container}>
            <div className={styles.open_button_container}>
                <button className={styles.window_button} type='button' onClick={()=>{setOpen(!open)}}>Choisissez votre destination</button>
            </div>
                     
                     {open && <>
                     <div className={styles.main_container}>
                         <div className={styles.img_container}>
                                <img src='/montainFromBoatPicture.jpg' alt='map planner'/>
                            </div>
                         <div className={styles.inputs_container}>
                                <div className={styles.name_input_container}>
                                        <p className={styles.input_title}>Nom :</p>
                                        <GooglePlacesAutocomplete apiKey="AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4"
                                        selectProps={{
                                            value,
                                            onChange: handleSelect,
                                            styles: customStyles,
                                        }}/>

                                </div>
                                <div className={styles.calendar_container}>
                                    <Calendar onChange={handleDatesChange} value={dates} minDate={new Date()} locale="fr" selectRange={true}
                                    formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: fr })}
                                    formatMonth={(locale, date) => format(date, 'LLLL', { locale: fr })}
                                    formatMonthYear={(locale, date) => format(date, 'LLLL yyyy', { locale: fr })}/>
                                </div>
                                    
                        
                            </div>
                            
                     </div>
                           
                     <div className={styles.buttons_container}>
                        <div className={styles.confirmButton_container}>
                            <ConfirmCancelButton action={handleSubmit} color={1} text="Valider"/>
                        </div>
                        <div className={styles.cancelButton_container}>
                            <ConfirmCancelButton action={resetInputs} color={3} text="Annuler"/>
                        </div>
                     </div>
                     </>}
       </div>
     
       )
     }
     
     export default AddDestination
     