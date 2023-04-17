import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid'; 


mapboxgl.accessToken = 'pk.eyJ1IjoiZW1nZzIyMjIiLCJhIjoiY2t2djU1ZWxoM3QzazJudGsyZHg3MjU1MSJ9.Z5KPKymYnQGwQJ9ZBz3JRQ';


export const useMapbox = ( initPoint ) => {

    //referencia al DIV del mapa

  const mapDiv = useRef();
  // setRef nunca va a cambiar a menos  de q el nodo cambie y por eso vamos a usar useCallback, hace referencia al div del mapa
  // va a recibir el nodo donde quiero renderizar el mapa 
  // se necesita memorizar el resultado de la función
  // estop va a ayudar a tener siempre este mapa 
  // setRef es una función, comun y corriente pero al usar el useCallback se va a memorizar su producto

  // tb se exporta
  const setRef = useCallback(
    ( node ) => {
      mapDiv.current = node;
    },
    [],
  )

  // Referencia a los marcadores como un objeto
  const markers = useRef({});

  
// map and coords
  const map = useRef();
  const [coords, setCoords] = useState(initPoint);
  useEffect(() => {
    const mapObj = new mapboxgl.Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [initPoint.lng, initPoint.lat], // starting position [lng, lat]
      zoom: initPoint.zoom, // starting zoom
      });
      map.current = mapObj ;
  }, [ initPoint ])
  
  // while map is moving
  useEffect(() => {
   
    map.current?.on('move', () => {

      const {lng, lat} = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2)
      });

    });
  }, [ initPoint ])


  // click on map in order to get a mark 
  useEffect(() => {
    map.current?.on('click', ( ev ) => {
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4(); // TODO: si el marcador ya tiene id

        marker  
            .setLngLat([ lng, lat])
            .addTo( map.current )
            .setDraggable( true ); 

        markers.current[ marker.id ] = marker; 

    }) 
  }, [])
  
    

  
// exportar en orden alfabético cuando un hook exporta muchas cosas

  return {
        coords,
        markers,
        setRef
  }
    
  
}
