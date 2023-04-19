import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid'; 
import { Subject } from 'rxjs';


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

  // Observables from RxJS
  // One of them related to movement
  const markMovement = useRef( new Subject() ); 
  // The second one related to newMarker, es un useRef() pq  no quiero que se vuelva a generar cada vez que el componente se renderiza. Quiero que se mantenga la referencia a este objeto 
  // este objeto se inicializa a new Subject que hay que importar de Rxjs
  const newMarker = useRef( new Subject() ); 

  
// map and coords
  const map = useRef();
  const [coords, setCoords] = useState(initPoint);


// create function in order to create markers
// no puede ser una funcion normal ya q cada vez q el hook se vuelva a ejecutar va a volver a crear esta función 
// lo q va a crear un nuevo espacio en memoria y aunq se le ponga la dependencia en el useEffect se va a estar ejecutando una y otra vez
// y crearía un montón de listeners de click de mapa

  const addMark = useCallback(
    (ev) => {
      
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4(); // TODO: si el marcador ya tiene id

        marker  
            .setLngLat([ lng, lat])
            .addTo( map.current )
            .setDraggable( true ); 

        markers.current[ marker.id ] = marker; 


        // TODO: si el marcador tiene ID no emitir

        // newMarker.current.next( marker ) o tb
        newMarker.current.next({
          id: marker.id,
          lng,
          lat
        })


        // listening markers movements
        // extraemos el target del evento ev { target }
        marker.on('drag' , ({ target }) => {
            const { id } = target;
            const {lng, lat } = target.getLngLat();

          markMovement.current.next({
            id,
            lng, 
            lat
          })

            // TODO: emitir los cambios del marcador, el objeto 
        })
    },
    [],
  )
  

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
    
    /*map.current?.on('click', ( ev ) => {
        addMark(ev); }) */
    // como en el evento solo recibe un argumento y llama a una función mandando el mismo evento se puede simplificar el código de la siguiente manera. Es JS
    // Lo q indica es que este listener va a llamar a un argumento, ese argumento se le pasa directamente a esa función "addMark" 
    map.current?.on('click', addMark ); 

  }, [addMark])
  
    

  
// exportar en orden alfabético cuando un hook exporta muchas cosas
// cuando se expone un observable, se pone un $ al final para indicar q es un observable

  return {
        addMark,
        coords,
        markers,
        markMovement$: markMovement.current,
        newMarker$: newMarker.current,
        setRef
  }
    
  
}
