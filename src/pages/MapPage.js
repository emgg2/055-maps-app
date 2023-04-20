import React, {useEffect } from 'react';
import { useSocketMapbox } from '../hooks/useSocketMapbox';


const initPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

export const MapPage = () => {

  const {  coords, setRef, activeMarks, createMark, moveMarkUpdated, newMark, setMarkUpdated} = useSocketMapbox ( initPoint );
  
  // get active markers 
  useEffect(()=>{ activeMarks() },[ activeMarks])
  // new marker
  useEffect(() => { newMark() }, [ newMark ]);
 // update marker position
  useEffect( () => { setMarkUpdated() }, [ setMarkUpdated ])
  // move markers all browsers connected, 
  useEffect(() => { moveMarkUpdated()}, [moveMarkUpdated])
  // create a new mark all browsers connected
  useEffect(() => { createMark(); }, [createMark])
  

  
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
