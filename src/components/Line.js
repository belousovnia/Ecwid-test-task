import React from 'react';
import { ImageTile } from './ImageTile';

export function Line(props){
  console.log(props.listImages);

  return (
    <div className='line' id='qwe'>
        {
        props.listImages.map( i => <ImageTile url={i}/> )
      }
    </div>
  );
}

