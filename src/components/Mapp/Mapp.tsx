import React, { useEffect, useRef } from 'react';
import styles from './Mapp.module.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet-routing-machine';
import { MappProps } from '../../types';
import { LocationData } from '../../types';

const Mapp: React.FC<MappProps> = ({ allDestinations }) => {
  const mapRef = useRef<any>(null); // Ref pour accéder à l'instance de la carte

  const customIcon = new Icon({
    iconUrl: "./iconMapp.png",
    iconSize: [28, 28]
  });

  const markersToDisplay = allDestinations.map((location, index) => {
    if (location.lat && location.lng) {
      return (
        <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>
            {location.name} <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    }
    return null;
  });

    const startPoint = [51.505, -0.09];
    const endPoint = [51.51, -0.1];
  

    const routeLayer = L.Routing.control({
      waypoints: [
        L.latLng(startPoint[0], startPoint[1]),
        L.latLng(endPoint[0], endPoint[1])
      ]
    });

    useEffect(() => {
      if (mapRef.current && allDestinations.length > 0) {
        const bounds = allDestinations.map(({ lat, lng }: LocationData) => [lat!, lng!]);
        mapRef.current.fitBounds(bounds);
      }
  }, [allDestinations]);

  return (
    <div className={styles.container}>
      <MapContainer ref={mapRef} className={styles.leaflet_container} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersToDisplay}


        
      </MapContainer>
    </div>
  );
}

export default Mapp;
