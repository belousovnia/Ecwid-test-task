import React from 'react';

export function Head(props){
  return (
    <div className='head' key='2011'>
      <div className='headBlock1' key='1012'>

        <input 
          type="text" 
          className='inputURL' 
          id='inputURL'
        />
        

        <button 
          className='battonDownload' 
          onClick={() => props.addNewImages(
            document.getElementById('inputURL').value,
            document.getElementById('option').value
            )
          }
        >
          Загрузить
        </button>

        <select id='option'>
          <option value="1">Image</option>
          <option value="2">JSON</option>
        </select>
      </div>
    </div>
  );
}

