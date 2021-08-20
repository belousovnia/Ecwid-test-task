import React, { useState } from 'react';
import { Head } from './components/Head';
import { PhotoBoard } from './components/PhotoBoard';

function App() {
  
  const requstImageURL = 'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json';
  
  const getImages = new XMLHttpRequest();
  getImages.open('GET', requstImageURL, false);
  getImages.send();
  const initionImages = JSON.parse(getImages.response);

  function JSONImagesPars(JSONImages) {
      let arrayImage = [];
      for (const key in JSONImages) {
        let URLimage =  JSONImages[key]; 
        arrayImage.push(URLimage['url']); 
      }
      return arrayImage
  };

  return (
  <>
    <Head/>
    <div className='main' id='main'>
      <PhotoBoard imagesPars={JSONImagesPars(initionImages['galleryImages'])}/>
    </div>
  </>
  );
}

export default App;
