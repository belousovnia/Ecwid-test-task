import React from 'react';

export function ImageTile(props){
  return (
      <img 
      className='imageTile' 
      src={props.imagesParms.src} 
      height={props.imagesParms.height} 
      width={props.imagesParms.width} 
      alt=""
      >
      </img>
    
  );
}
