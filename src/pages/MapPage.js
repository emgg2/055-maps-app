import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1nZzIyMjIiLCJhIjoiY2t2djU1ZWxoM3QzazJudGsyZHg3MjU1MSJ9.Z5KPKymYnQGwQJ9ZBz3JRQ';
const initPoint = {
  lng: 5,
  lat: 34,
  zoom: 10
}

export const MapPage = () => {

  const mapDiv = useRef();
  const [map, setMap] = useState();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [initPoint.lng, initPoint.lat], // starting position [lng, lat]
      zoom: initPoint.zoom, // starting zoom
      });
      setMap ( map );
  }, [])
  


  return (
    <>
      <div
        ref={ mapDiv }
         className='mapContainer'
      >

      </div>
    
    
    </>
  )
}
