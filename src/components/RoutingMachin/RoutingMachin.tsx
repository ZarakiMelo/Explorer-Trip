
import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { RoutingMachinProps } from '../../types';
import { ValuePiece } from '../../types';

/**
 * RoutingMachin component for creating a route on a map using Leaflet Routing Machine.
 * @param trip - Trip object containing the locations and their respective dates.
 * @returns null
 */
const RoutingMachin: React.FC<RoutingMachinProps> = ({ trip }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null >(null);

   /**
   * Parses date strings into Date objects.
   * @param dates - Array of date strings.
   * @returns Tuple of Date objects or null.
   */
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
        console.log('Removing current routing control');
        map.removeControl(routingControlRef.current);
      }
    
      const waypoints: L.LatLng[] = [];
      sortedLocations.forEach((location) => {
        if (location.lat && location.lng) {
          waypoints.push(L.latLng(location.lat, location.lng));
        }
      });
    
      if (waypoints.length === 0) {
        console.log('No waypoints to display');
        return; // No waypoints to display
      }

      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        
      }).addTo(map);
    
      routingControlRef.current = routingControl;
    
      return () => {
        if (routingControlRef.current) {
          console.log('Cleaning up routing control');
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    }, [map, trip.locations]);
 
  return null; 
};

export default RoutingMachin;