import React, { useState, useEffect} from 'react';
import { Head } from './components/Head';
import { PhotoBoard } from './components/PhotoBoard';
import { Line } from './components/Line'

function App() {

  class MyImages {
    constructor(src, height, width, id){
      this.src = src;
      this.ratio = width / height;
      this.height = height;
      this.width = width;
      this.id = id;
    }

    chancheHeight(newHeight){
      this.height = newHeight;
      this.width = newHeight * this.ratio;
    }
  }

//-----------------------------------------------------------------------------
  // Принимает ссылку на JSON с фотографиями и возвращает их в виде объекта.

  function requstJSON(urlJSON){
    const getImages = new XMLHttpRequest();
    getImages.open('GET', urlJSON, false);
    getImages.send();
    return JSON.parse(getImages.response)
  };
  
// ----------------------------------------------------------------------------
  //  Принимает JSON с данными о изображениях. Возвращает массив 
  // с адресами изображений. 

  function JSONImagesPars(JSONImages) {
    console.log(JSONImages);

    let arrayImage = [];
    for (const key in JSONImages) {
      let URLimage =  JSONImages[key]; 
      arrayImage.push(URLimage['url']); 
    }
    return arrayImage
  };

//---------------------------------------------------------------------------------------
  //  Принимает массив ссылок на изображения.Возвращает массив с 
  // объектами класса MyImages созданных из этик изображений.

  let id = 0;

  function parsNewImages(URLImage){
    let tagImages = [];
    let newParmsImages = [];

    for (const i in URLImage){
      let a = new Image();
      a.src = URLImage[i]; 
      tagImages.push(a);
    };
  
    for (let i=0; i < tagImages.length; i++){
      newParmsImages[i] = new MyImages(
        tagImages[i].src,
        tagImages[i].height,
        tagImages[i].width,
        id
      )

      id += 1;
    };
    return newParmsImages
  }
  
// --------------------------------------------------------------------------------------
  //  Принимает массив с объектами MyImages и строит на их основе линии с 
  // изображениями, восвращаемые в массиве.  

  function lineConstructor(dataImages, fullWidth) {

    let lineImages = [];
    let steckImages = [];
    let lineWidth = 0;
    let startWidth = 200;

    if (fullWidth < 800){
      startWidth = 150;
    };
      
    for (let i=0; i < dataImages.length; i++){
      dataImages[i].chancheHeight(startWidth);
      steckImages.push(dataImages[i]);
      lineWidth = 0;
        
      for (let i=0; i<steckImages.length; i++){
        lineWidth += steckImages[i].width;
      };

      if (lineWidth >= fullWidth){
        
        const changesWidth = fullWidth - (
          lineWidth - steckImages[steckImages.length - 1].width);

        let extraImages = steckImages.pop();
        let sumRatio = 0;

        for (let i=0; i < steckImages.length; i++){
          sumRatio += steckImages[i].ratio;
        }

        const additionFactor = (changesWidth - (
          steckImages.length + 1) * 10)  / sumRatio;

        const checkWidth = additionFactor * steckImages.length
         + steckImages.length * 10 + 10

        while (checkWidth > fullWidth){
          additionFactor -= 0.5
        };

        for (let i=0; i < steckImages.length; i++){
          steckImages[i].chancheHeight(startWidth + additionFactor - 0.5);
        }

        lineImages.push(steckImages);
        steckImages = [extraImages];
      };

      if (i == dataImages.length - 1){
        lineImages.push(steckImages);
      };
    };

    return lineImages   
  };

  //-------------------------------------------------------------------------------------
  
  //  Загруска начальных изображений. 

  const requstImageURL = 'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json';
  const initionImages = requstJSON(requstImageURL);

  //  Раздел с хуками и работой с Dom

  const [countReaction, setCountReaction] = useState(0)
  const [countLine, setCountLine] = useState([]);
  const [countWidth, setCountWidth] = useState(0)
  const [count, setCount] = useState(parsNewImages(
    JSONImagesPars(initionImages['galleryImages'])));

  function buildingImagesTile(arrMyImages, cWidth) {
    setCountLine(lineConstructor(arrMyImages, cWidth).map((i) => 
    <Line
      line={i}
      deleteImages={deleteImages}
     />))
  }

  useEffect(() => {
    console.log('effect');
    console.log(count);
    setCountWidth(document.getElementById('photoBoard').clientWidth);
    buildingImagesTile(count, countWidth);
  }, [countWidth, countReaction])

  function handleResize(){
    setCountWidth(document.getElementById('photoBoard').clientWidth)
  }

  window.addEventListener("resize", handleResize);


  //--------------------------------------------------------------------------- 

  function deleteImages(idDelete){
    let countCopyDelete = count;
    for (let i=0; i < countCopyDelete.length; i++){
      if (countCopyDelete[i].id == idDelete){
        countCopyDelete.splice(i, 1);
        setCount(countCopyDelete);
        setCountReaction(countReaction + 1)
        break;
      }
    }
  };

  // -------------------------------------------------------------------------- 

  function addNewImages(urlNewImages, optionAdd){
    if (optionAdd == 1){
      const newImages = parsNewImages([urlNewImages]);
      setCount(count.concat(newImages));

    }else if (optionAdd == 2){
      const newArrUrl = requstJSON(urlNewImages);
      const newArrImages = JSONImagesPars(newArrUrl['galleryImages']);
      const newImagesJSON = parsNewImages(newArrImages);
      setCount(count.concat(newImagesJSON));
    }

    document.getElementById('inputURL').value = ''
    setCountReaction(countReaction + 1);
  };

  // --------------------------------------------------------------------------

  return (
  <>
    <Head
      addNewImages={addNewImages}
    />
    <div className='main' id='main'>
      <PhotoBoard 
        countLine = {countLine}
      />
    </div>
  </>
  );
}

export default App;
