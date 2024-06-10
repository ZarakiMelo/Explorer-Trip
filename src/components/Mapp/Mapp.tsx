import React from 'react'
import styles from './Mapp.module.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import { MappProps } from '../../types';

const Mapp:React.FC<MappProps> = ({allDestinations})=> {

const customIcon = new Icon({
  iconUrl : "./iconMapp.png",
  iconSize : [28,28]
})

const markersToDisplay = allDestinations.map((location)=>{
  if(location.lat && location.lng){
    return <Marker position={[location.lat,location.lng]} icon={customIcon}>
      <Popup>
        {location.name} <br /> Easily customizable.
      </Popup>
    </Marker>
  }
})



  return (
    <div className={styles.container}>
      <MapContainer className={styles.leaflet_container} center={[51.505, -0.09]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    {markersToDisplay}
                    </MapContainer>

    </div>
  )
}

export default Mapp
