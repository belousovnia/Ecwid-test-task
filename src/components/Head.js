import React from 'react';

export function Head(props){
  return (
    <div className='head'>
      <div className='headBlock1'>

        <input 
          type="text" 
          className='inputURL' 
          id='inputURL'
        />
        

        <button className='battonDownload' onClick={
          () => props.addNewImages(
            document.getElementById('inputURL').value,
            document.getElementById('option').value,
            )
        }>
          Загрузить
        </button>

        <select id='option'>
          <option value="1" key="">Image</option>
          <option value="2" key="">JSON</option>
        </select>
      </div>
    </div>
  );
}

