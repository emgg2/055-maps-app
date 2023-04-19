import React, { useEffect } from 'react'

import { useMapbox } from '../hooks/useMapbox';


const initPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

export const MapPage = () => {

  // para suscribirse al nuevo marcardor con $ a final que es como una S en mayuscula 

  const { coords, setRef, newMarker$, markMovement$ } = useMapbox( initPoint );
  

  // new marker
  useEffect(() => {
   
    newMarker$.subscribe( marker => {
      // TODO: nuevo marcador emitir
      console.log('new marker',marker);
    })
  }, [ newMarker$ ]);

  useEffect( () => {
    markMovement$.subscribe( marker => {
      console.log('mark movements',  marker );

    })
  }, [ markMovement$ ])
  



  // marker movement, suscribirse al markerMovement defined id useMapabox 
  // TODO: useEffect, escuchar todos los movimientos emitidos del marcador que se está moviendo
  // por lo menos mostrar el objeto 
  
  return (
    <>

      <div className='info'>
        Lng: { coords.lng } | Lat: { coords.lat} | Zoom: { coords.zoom }
      </div>

      <div
      
        ref={ setRef }
         className='mapContainer'
      >

      </div>
    
    
    </>
  )
}
