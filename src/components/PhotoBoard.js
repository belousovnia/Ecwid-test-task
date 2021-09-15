import React from 'react';
import { DropZone } from './DropZone';

export function PhotoBoard(props){

  return (
    <div 
      className='photoBoard' 
      id='photoBoard'
      onDragOver={() => {
        document.getElementById('dropZone').style.zIndex = '2';
        document.getElementById('dropZone').style.height = '100%';
        document.getElementById('dropZone').style.width = '100%';
      }}
      onDragLeave={() => {
        document.getElementById('dropZone').style.zIndex = '-1';
        document.getElementById('dropZone').style.height = '0.1px';
        document.getElementById('dropZone').style.width = '0.1px';
      }}
      onDrop={() => {
        document.getElementById('dropZone').style.zIndex = '-1';
        document.getElementById('dropZone').style.height = '0.1px';
        document.getElementById('dropZone').style.width = '0.1px';
      }}
    >
      {props.countLine}
      <DropZone 
        parsNewImages = {props.parsNewImages}
        addNewImages = {props.addNewImages}
        setCountReaction = {props.setCountReaction}
        countReaction = {props.countReaction}
      />
    </div>
  );
}

