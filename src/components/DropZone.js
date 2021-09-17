import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function DropZone(props) {

  const onDrop = acceptedFiles => {
    acceptedFiles.map(file => {
      props.addNewImages(URL.createObjectURL(file), 1)
      props.setCountReaction(() => {return props.countReaction + 1})
    })
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  return (
    <div {...getRootProps()} className='dropZone' id='dropZone'>
      <input {...getInputProps()} />
    </div>
  )
}
