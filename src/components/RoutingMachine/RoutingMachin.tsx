import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { RoutingMachinProps } from '../../types';

const RoutingMachin: React.FC<RoutingMachinProps> = ({ allDestinations }) => {
  const map = useMap();

  const waypoints: L.LatLng[] = [];

  useEffect(() => {
    allDestinations.forEach((location) => {
      if (location.lat && location.lng) {
        waypoints.push(L.latLng(location.lat, location.lng));
      }
    });

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
    }).addTo(map);

    return () => {
      if (isControl(routingControl)) {
        map.removeControl(routingControl);
      }
    };
  }, [map, allDestinations]);

  return null; 
};


function isControl(obj: any): obj is L.Control {
  return obj && typeof obj.removeFrom === 'function';
}

export default RoutingMachin;
