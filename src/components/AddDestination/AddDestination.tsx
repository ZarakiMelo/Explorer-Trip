import React, {useState} from 'react';
import styles from './AddDestination.module.css';
import Title from '../Title/Title';
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


const AddDestination: React.FC= (handleAddLocation) => {
    const title = "Choisissez votre destination";
    const [value, setValue] = useState<any>(null);

    const handleSelect = (address: any) => {
        setValue(address);
        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log('Coordinates: ', { lat, lng });
               
            })
            .catch(error => console.error('Error: ', error));
    };
    console.log({"result":value})
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
                        <input className={styles.input_duration}></input>
                        
                    </div>
                </div>
                <div className={styles.buttons_container}>
                    <button type='button'>Valider</button>
                    <button type='button'>Annuler</button>
                </div>
  </div>

  )
}

export default AddDestination
