import React, {useContext} from 'react';
import { Context } from './context';


export function ImageTile(props){
  const openImage = useContext(Context);

  return (
    <div 
      className='imageBox'
    >
      <img 
        className='image' 
        src={props.imagesParms.src} 
        height={props.imagesParms.height} 
        width={props.imagesParms.width}
        onClick={() => openImage(props.imagesParms.src, props.imagesParms.id)}
      />
    </div>
  );
}
