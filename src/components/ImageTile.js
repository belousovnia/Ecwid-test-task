import React from 'react';

export function ImageTile(props){
console.log(props.url);
  return (
    <img className='imageTile' src={props.url} alt="" />
  );
}
