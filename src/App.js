import React, { useState, useEffect} from 'react';
import { Head } from './components/Head';
import { PhotoBoard } from './components/PhotoBoard';
import { Line } from './components/Line';
import { ModalWindow } from './components/ModalWindow';
import { Context } from './components/context';

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

    chancheWidth(newWidth){
      this.width = newWidth;
      this.height = newWidth / this.ratio;
    }
  };

//-------------------------------------------------------------------------------------
  // Генератор рандобного номена, ничего не принимает только возвращает рандомное число.


  function getRandomInt() {
    const min = Math.ceil(1000000000);
    const max = Math.floor(9999999999);
    return Math.floor(Math.random() * (max - min)) + min; 
  };

//-----------------------------------------------------------------------------
  //  Принимает ссылку на JSON с фотографиями и возвращает их в виде объекта.

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
    
    let arrayImage = [];

    for (const key in JSONImages) {
      let URLimage = JSONImages[key]; 
      arrayImage.push(URLimage['url']); 
    };

    return arrayImage
  };

//---------------------------------------------------------------------------------------
  //  Принимает массив ссылок на изображения. Добавляет изображения на сайт.

  const [count, setCount] = useState([]);

  function parsNewImages(URLImage){
   
    for (const i in URLImage){
      let a = new Image();
      a.src = URLImage[i];
      a.addEventListener("load", () => {
        let newMyImage = new MyImages(
          a.src,
          a.height,
          a.width,
          getRandomInt()
        );

        let newImage = count;
        newImage.push(newMyImage);
        setCount(newImage);
        
        buildingImagesTile(count, countWidth);
      });
      a.addEventListener("error", () => {
        alert('Произошла ошибка при загрузки изображения, пожалуйста проверьте ссылку');
      });

    };
  };

  
// --------------------------------------------------------------------------------------
  //  Принимает массив с объектами MyImages и строит на их основе линии с 
  // изображениями, восвращаемые в массиве.  

  function lineConstructor(dataImages, fullWidth) {

    if (fullWidth === 0){
      fullWidth = document.getElementById('photoBoard').clientWidth;
    };

    let lineImages = [];
    let steckImages = [];
    let lineWidth = 0;
    let startWidth = 200;
    let checkPadding = 1;

    if (fullWidth < 800){
      startWidth = 150;
    };
      
    for (let i=0; i < dataImages.length; i++){
      dataImages[i].chancheHeight(startWidth);
      steckImages.push(dataImages[i]);
      lineWidth = 0;
      
        
      for (let i=0; i<steckImages.length; i++){
        lineWidth += steckImages[i].width;
        checkPadding += 1
      };

      if (lineWidth + checkPadding*10 >= fullWidth){

        checkPadding = 1;
        
        const changesWidth = fullWidth - (
          lineWidth - steckImages[steckImages.length - 1].width);

        let extraImages = steckImages.pop();
        let sumRatio = 0;

        for (let i=0; i < steckImages.length; i++){
          sumRatio += steckImages[i].ratio;
        };

        let additionFactor = (changesWidth - (
          steckImages.length + 1) * 10)  / sumRatio;

        let checkWidth = additionFactor * steckImages.length
         + steckImages.length * 10 + 10;

        while (checkWidth > fullWidth){
          additionFactor -= 0.5;
        };

        for (let i=0; i < steckImages.length; i++){
          steckImages[i].chancheHeight(startWidth + additionFactor - 0.5);
        }

        lineImages.push(steckImages);
        steckImages = [extraImages];
      };

      if (i === dataImages.length - 1){
        if (steckImages.length === 1){
          if (steckImages[0].width > fullWidth - 20){
            steckImages[0].chancheWidth(fullWidth - 20);
          }
        }
        lineImages.push(steckImages);
      };
    };

    return lineImages   
  };

  //---------------------------------------------------------------------------
  //  Загруска начальных изображений. 

  const requstImageURL = 'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json';
  const initionImages = JSONImagesPars(requstJSON(requstImageURL)['galleryImages']);
  useEffect(() => parsNewImages(initionImages), []);
  

  //  Раздел с хуками и работой с Dom
  const [countReaction, setCountReaction] = useState(0);
  const [countLine, setCountLine] = useState([]);
  const [countWidth, setCountWidth] = useState(0);

  function buildingImagesTile(arrMyImages, cWidth) {
    setCountLine(lineConstructor(arrMyImages, cWidth).map((i) => 
    <Line
      line={i}
      deleteImages={deleteImages}
      key={getRandomInt()}
      getRandomInt={getRandomInt}
     />))
  };

  useEffect(() => {
    setCountWidth(document.getElementById('photoBoard').clientWidth);
  }, []);

  useEffect(() => {
    setCountWidth(document.getElementById('photoBoard').clientWidth);
    buildingImagesTile(count, countWidth);
  }, [countWidth]);

  function handleResize(){
    setCountWidth(document.getElementById('photoBoard').clientWidth);
  };

  window.addEventListener('resize', handleResize);
  //--------------------------------------------------------------------------- 
    // Удаляет элемент по индексу.

  function deleteImages(idDelete){
    let countCopyDelete = count;
    for (let i=0; i < countCopyDelete.length; i++){
      if (countCopyDelete[i].id === idDelete){
        countCopyDelete.splice(i, 1);
        setCount(countCopyDelete);
        buildingImagesTile(count, countWidth);
        break;
      }
    }
  };

  // -------------------------------------------------------------------------- 
  //  Добавляет новый элемент взависимости от optionAdd.
  // При значении 1 добавляет по ссылке на картинку.
  // При значении 2 добавляет из JSON как по ссылке в README.

  function addNewImages(urlNewImages, optionAdd){
    if (optionAdd === 1){
      parsNewImages([urlNewImages]);
    }else if (optionAdd === 2){
      try {
        const newArrUrl = requstJSON(urlNewImages);
      const newArrImages = JSONImagesPars(newArrUrl['galleryImages']);
      parsNewImages(newArrImages);
      } catch {
        alert('Возникла ошибка при загрузки JSON файла, убедитесь что ссылка работает');
      };
      
    };

    document.getElementById('inputURL').value = '';
  };

  // --------------------------------------------------------------------------
  // Модальное окно.

  const [countModal, setCountModal] = useState(
    'https://images5.alphacoders.com/904/904708.jpg'
  );
  const [countIdImage, setCountIdImage] = useState();

  function openImage(urlImageOpen, idImage){
    setCountModal(urlImageOpen);
    setCountIdImage(idImage);
    document.getElementById('modalWindow').style.display = 'block'
  };

  // --------------------------------------------------------------------------

  return (
  <Context.Provider value={
    openImage
  }>
    <Head
      addNewImages={addNewImages}
    />
    <div className='main' id='main'>
      <PhotoBoard 
        countLine = {countLine}
        parsNewImages = {parsNewImages}
        addNewImages = {addNewImages}
        setCountReaction = {setCountReaction}
        countReaction = {countReaction}
      />
    </div>
    <ModalWindow src={countModal} deleteImages={deleteImages} idImage={countIdImage}/>
  </Context.Provider>
  );
}

export default App;
