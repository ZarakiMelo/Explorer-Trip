import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { RoutingMachinProps } from '../../types';
import { ValuePiece } from '../../types';

const RoutingMachin: React.FC<RoutingMachinProps> = ({ trip}) => {
  const map = useMap();

  const parseDates = (dates: any): [ValuePiece, ValuePiece] | null => {
    if (Array.isArray(dates) && dates.length === 2) {
      return [new Date(dates[0]), new Date(dates[1])];
    }
    return null;
  };
  
  const sortedLocations = trip.locations
    .map((location) => {
      location.dates = Array.isArray(location.dates) ? parseDates(location.dates) : location.dates;
      return location;
    })
    .filter((location) => {
      if (Array.isArray(location.dates)) {
        return location.dates[0] instanceof Date && location.dates[1] instanceof Date;
      }
      return false;
    })
    .sort((a, b) => {
      const dateA = (a.dates as [Date, Date])[0].getTime();
      const dateB = (b.dates as [Date, Date])[0].getTime();
      return dateA - dateB;
    })

  useEffect(() => {
    const waypoints: L.LatLng[] = [];
    sortedLocations.forEach((location) => {
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
  }, [map, trip]);
  console.log({"RoutingMachin:":trip.locations})
  return null; 
};


function isControl(obj: any): obj is L.Control {
  return obj && typeof obj.removeFrom === 'function';
}

export default RoutingMachin;
