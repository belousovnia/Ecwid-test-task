import React from 'react';

export function Head(props){
  return (
    <div className='head' key='2011'>
      <div className='headBlock1' key='1012'>

        <input 
          type="text" 
          className='inputURL' 
          id='inputURL'
          key='2013'
        />
        

        <button 
          className='battonDownload' 
          onClick={() => props.addNewImages(
            document.getElementById('inputURL').value,
            document.getElementById('option').value,
            )
          }
          key='2014'

        >
          Загрузить
        </button>

        <select id='option' key='2015'>
          <option value="1" key="2016">Image</option>
          <option value="2" key="2017">JSON</option>
        </select>
      </div>
    </div>
  );
}

