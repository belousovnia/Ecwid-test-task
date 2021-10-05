import React from 'react';
import { useDropzone } from 'react-dropzone';

export function DropZone(props) {

  const onDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      props.addNewImages(URL.createObjectURL(file), 1);
    })
  };

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  return (
    <div {...getRootProps()} 
      className='dropZone' 
      id='dropZone'
      onDragLeave={() => {
        document.getElementById('dropZone').style.zIndex = '-1';
        document.getElementById('dropZone').style.height = '0.1px';
        document.getElementById('dropZone').style.width = '0.1px';
      }}
    >
      <input {...getInputProps()} />
    </div>
  )
}
