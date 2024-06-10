import React, { useEffect } from 'react';
import styles from './Mapp.module.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { MappProps} from '../../types';
import RoutingMachin from '../RoutingMachine/RoutingMachin';

const Mapp: React.FC<MappProps> = ({ allDestinations }) => {

let DefaultIcon = L.icon({
  iconUrl: "./iconMapp.png",
  iconSize: [28, 28]
});
L.Marker.prototype.options.icon = DefaultIcon

  return (
    <div className={styles.container}>
      <MapContainer className={styles.leaflet_container} center={[57.74, 11.94]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    
         <RoutingMachin allDestinations={allDestinations} defaultIcon={DefaultIcon}/>
      </MapContainer>
    </div>
  );
}


export default Mapp;
