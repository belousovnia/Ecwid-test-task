import React from 'react';

export function ImageTile(props){
  return (
    <div 
      className='imageBox'
    >
      <img
        className='cross'
        src="icons-cross.png" 
        alt=""
        onClick={() => props.deleteImages(props.imagesParms.id)}
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
