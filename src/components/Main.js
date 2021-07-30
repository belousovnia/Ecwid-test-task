import React from 'react';
import { ImageTile } from './ImageTile';
import { Line } from './Line';

export function Main(props){

  function lineConstructor(URLImage) {
    let counterId = 0;
    let imagesReturn = []
    
    for (const i in URLImage){
      imagesReturn.push(<img src={URLImage[i]}/>);
    } 
    return imagesReturn
  };
  
  return (
    <div className='main' id='111'>
      {lineConstructor(props.imagesPars).map((i) => {return i})}
    </div>
  );
}

