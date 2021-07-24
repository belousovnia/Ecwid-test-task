import React from 'react';
import { ImageTile } from './ImageTile';

export function Main(props){
  return (
    <div className='main'>
        {
        props.JSONImagesPars(props.count).map( i => <ImageTile url={i} key={i}/>)
      }
    </div>
  );
}

