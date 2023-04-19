import React, { useContext, useEffect } from 'react'

import { useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';


const initPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

export const MapPage = () => {

  const { socket } = useContext( SocketContext );

  // para suscribirse al nuevo marcardor con $ a final que es como una S en mayuscula 
  const { coords, setRef, newMarker$, markMovement$ } = useMapbox( initPoint );


  
  // get active markers 
  useEffect(()=>{
    socket?.on('active_marks', ( activeMarks ) => {
      console.log(activeMarks);
    })
  },[socket])

  // new marker
  useEffect(() => {
   
    newMarker$.subscribe( marker => {
      socket?.emit('new_mark', marker );
      
      // TODO: nuevo marcador emitir
      
      
      console.log('new');
    })
  }, [newMarker$, socket ]);



  useEffect( () => {
    markMovement$.subscribe( marker => {
      //socket?.emit('mark_movements', markMovement$ );

    })
  }, [ markMovement$ ])
  

  //TODO: escuchar nuevos marcadores
  useEffect(() => {
    socket?.on('new_mark', ( mark ) => {
      console.log(mark);
    })

  }, [socket])
  

  

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
