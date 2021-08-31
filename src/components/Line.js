import React from 'react';
import { ImageTile } from './ImageTile';

export function Line(props){
  return (
    <div className='line' id='qwe'>
      {props.line.map( i => 
        <ImageTile 
          imagesParms={i}
          deleteImages={props.deleteImages}
        />)}
    </div>
  );
}

