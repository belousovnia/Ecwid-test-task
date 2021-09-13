import React from 'react';

export function ImageTile(props){
  const controlKey = props.imagesParms.id;

  return (
    <div 
      className='imageBox'
    >
      <img
        className='cross'
        src="icons-cross.png" 
        alt=""
        onClick={() => props.deleteImages(controlKey)}
      />
      <img 
      className='image' 
      src={props.imagesParms.src} 
      height={props.imagesParms.height} 
      width={props.imagesParms.width}
      alt=""
      >
      </img>
    </div>
  );
}
