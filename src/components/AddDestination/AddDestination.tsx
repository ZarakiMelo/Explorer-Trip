import React, {useState}from 'react';
import styles from './AddDestination.module.css';
import Title from '../Title/Title';
import { Location } from '../../types';
import GooglePlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

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
        fontSize: '16px',
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: '16px',
        padding: '10px',

    }),
    singleValue: (provided: any) => ({
        ...provided,
        fontSize: '16px',

    }),
};


interface AddDestinationProps{
handleAddLocation : (location:Location) => void
}
type Coordinates = {
    lat:number | null,
    lng:number | null,
}
const AddDestination: React.FC<AddDestinationProps> = (handleAddLocation) => {
    const title = "Choisissez votre destination";
    const [value, setValue] = useState<any>(null);
    const [coordinates, setCoordinate]=useState<Coordinates>({ lat: null,
        lng: null});
    const [numberOfDay,setNumberOfDay] = useState<string>('');

    const handleSelect = (address: any) => {
        setValue(address);
        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCoordinate({lat,lng})
            
            })
            .catch(error => console.error('Error: ', error));
    };

    const handleSubmit=()=> {
        if(!validateDestination())return;
        const newLocation = {...coordinates,numberOfDay:Number(numberOfDay)};
        console.log({"nouvelle destination":newLocation})
    }
    const validateDestination = () => {
        if (!coordinates.lat || !coordinates.lng) {
            console.log('Saisir un lieu');
            return false;
        } else if (!numberOfDay || Number.isNaN(parseInt(numberOfDay))) {
            console.log('Saisir un nombre de jour valide !');
            return false;
        } 
        return true
    }

    const resetInputs = () =>{
        setValue(null);
        setCoordinate({lat:null,lng:null});
        setNumberOfDay("");
    }
    console.log({"coordinates":coordinates})

    return (
        <div className={styles.container}>
                     <Title text={title}/>
                     <div className={styles.inputs_container}>
                     
                         <div className={styles.input_container}>
                                  <p className={styles.input_title}>Nom :</p>
                                <GooglePlacesAutocomplete apiKey="AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4"
                                 selectProps={{
                                     value,
                                     onChange: handleSelect,
                                     styles: customStyles,
                                 }}/>
                         </div>
                         <div className={styles.input_container}>
                             <p className={styles.input_title}>Durée :</p>
                             <input className={styles.input_duration} value={numberOfDay} onChange={(e)=>{setNumberOfDay(e.target.value)}}></input>
                             
                         </div>
                     </div>
                     <div className={styles.buttons_container}>
                         <button onClick={handleSubmit}type='button'>Valider</button>
                         <button onClick={resetInputs} type='button'>Annuler</button>
                     </div>
       </div>
     
       )
     }
     
     export default AddDestination
     