import React from 'react'

import { useMapbox } from '../hooks/useMapbox';


const initPoint = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

export const MapPage = () => {

  const { coords, setRef } = useMapbox( initPoint );
  

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
