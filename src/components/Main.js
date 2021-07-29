import React from 'react';
import { ImageTile } from './ImageTile';
import { Line } from './Line';

export function Main(props){

  function lineConstructor() {
    let counterId = 0;
    let check = false;
    let finishedImagesArray = [];
    let lineArray = [];
    let iLine;
    
    for (const i in props.imagesPars){
      counterId += 1;
      lineArray.push(props.imagesPars[i]);
      iLine = <Line listImages={lineArray}/>
      setTimeout(() => {
        let element1 = document.getElementById('111').offsetWidth;
      } , 1)
      console.log(element1);
    } 

    return finishedImagesArray

  
  };

  lineConstructor();

  return (
    <div className='main' id='111'>
    </div>
  );
}

