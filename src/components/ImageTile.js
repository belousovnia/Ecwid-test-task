import React from 'react';

export function ImageTile(props){
  return (
    <div 
      className='imageBox'
      key='2001'
    >
      <img
        className='cross'
        src="icons-cross.png" 
        alt=""
        onClick={() => props.deleteImages(props.imagesParms.id)}
        key='2000'
      />
      <img 
      className='image' 
      src={props.imagesParms.src} 
      height={props.imagesParms.height} 
      width={props.imagesParms.width}
      alt=""
      key={props.imagesParms.id}
      >
      </img>
    </div>
  );
}
