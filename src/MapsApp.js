import React from 'react'
import { MapPage } from './pages/MapPage'
import { SocketProvider } from './context/SocketContext'


export const MapsApp = () => {
  return (
    <div>
      <SocketProvider>
        <MapPage/>
      </SocketProvider>
    </div>
  )
}
