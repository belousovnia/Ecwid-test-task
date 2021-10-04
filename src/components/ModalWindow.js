import React from 'react';
import iconTrash from './icon-trash.png'

export function ModalWindow(props){

  return (
    <div
      className='modalWindow'
      id='modalWindow'
      onClick={() => {document.getElementById('modalWindow').style.display = 'none'}}
    >
      <div className='modalContainer'>
        <img className='modalImage' src={props.src}/>
        <img 
          src={iconTrash} 
          className='iconTrash'
          onClick={() => {props.deleteImages(props.idImage)}} 
        /> 
      </div>
      
    </div>
  );
}
