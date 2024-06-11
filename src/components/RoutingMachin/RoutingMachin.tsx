/*import React, { useEffect } from 'react';
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
  console.log({"RoutingMachin - locations": trip.locations})
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
    map.eachLayer(layer => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });
    
    const waypoints: L.LatLng[] = [];
    console.log({"RoutingMachin - sortedLocations": sortedLocations})
    sortedLocations.forEach((location) => {
      if (location.lat && location.lng) {
        waypoints.push(L.latLng(location.lat, location.lng));
      }
    });
    console.log({"RoutingMachin - waypoints:":waypoints})
    const routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      
    }).addTo(map);

    return () => {
      if (isControl(routingControl)) {
         console.log({"RoutingMachin - RoutingControl:":waypoints})
        map.removeControl(routingControl);
      }
    };
  }, [map, trip.locations]);
 
  return null; 
};


function isControl(obj: any): obj is L.Control {
  return obj && typeof obj.removeFrom === 'function';
}

export default RoutingMachin;*/
import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { RoutingMachinProps } from '../../types';
import { ValuePiece } from '../../types';

const RoutingMachin: React.FC<RoutingMachinProps> = ({ trip }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

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
      if (routingControlRef.current) {
        console.log('Routing - controlCourant détecté')
        map.removeControl(routingControlRef.current);
      }
    
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
    
      routingControlRef.current = routingControl;
    
      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    }, [map, trip.locations]);
 
  return null; 
};

export default RoutingMachin;