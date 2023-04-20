import { useCallback, useContext} from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';


export const useSocketMapbox = ( initPoint ) => {

    const { socket } = useContext( SocketContext );

    // para suscribirse al nuevo marcardor con $ a final que es como una S en mayuscula 
    const { coords, setRef, newMarker$, markMovement$, addMark, moveMark } = useMapbox( initPoint );


    const activeMarks = useCallback(
      () => {
        socket?.on('active_marks', ( activeMarks ) => {      
            for( const key of Object.keys(activeMarks)) {
              addMark( activeMarks[key], key);
            }
          })
      },
      [socket, addMark],
    )
    

    
      // new marker

      const newMark = useCallback(
        () => {
            newMarker$.subscribe( marker => {
                socket?.emit('new_mark', marker );   
              })
        },
        [newMarker$, socket],
      )
      
      const setMarkUpdated = useCallback(
        () => {
            markMovement$.subscribe( marker => {
                socket?.emit('mark_updated', marker );     
          
              })
        },
        [ markMovement$, socket ],
      )
      
    
    
    
        const moveMarkUpdated = useCallback(
          () => {
            socket?.on('mark_updated', ( mark ) => {
                moveMark(mark)
              })
          },
          [socket, moveMark],
        )
        
      
      
          const createMark = useCallback(
            () => {
                socket?.on('new_mark', ( mark ) => {
                    addMark(mark, mark.id);
                  })
            },
            [socket, addMark],
          )
          

  return {
        activeMarks,
        coords,
        createMark, 
        moveMarkUpdated,
        newMark,
        setMarkUpdated,
        setRef

  }
}
