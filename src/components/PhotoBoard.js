import React, { useEffect, useState } from 'react';
import { Line } from './Line';

export function PhotoBoard(props){

  class MyImages {
    constructor(src, height, width){
      this.src = src;
      this.ratio = width / height;
      this.height = height;
      this.width = width;
    }

    chancheHeight(newHeight){
      this.height = newHeight;
      this.width = newHeight * this.ratio;
    }

    info(){
      console.log(this.ratio + '_' + this.height + '_' + this.width);
    }
  }

//---------------------------------------------------------------------------------------
  let parmsImages = {};

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
      )
    };
    return newParmsImages
  }
  
// --------------------------------------------------------------------------------------

  function lineConstructor(dataImages, fullWidth) {

    let lineImages = [];
    let steckImages = [];
    let lineWidth = 0;
    let startWidth = 250;

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
        
        const changesWidth = fullWidth - (lineWidth - steckImages[steckImages.length - 1].width);
        let extraImages = steckImages.pop();
        
        let sumRatio = 0;

        for (let i=0; i < steckImages.length; i++){
          sumRatio += steckImages[i].ratio;
        }

        const additionFactor = (changesWidth - (steckImages.length + 1) * 10)  / sumRatio;
        const checkWidth = additionFactor * steckImages.length + steckImages.length * 10 + 10

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

  const [count, setCount] = useState(parsNewImages(props.imagesPars));
  const [countTag, setCountTag] = useState([]);
  const [countWidth, setCountWidth] = useState(0)

  function startTag(cWidth) {
    setCountTag(lineConstructor(count, cWidth).map((i) => <Line line={i}/>))
  }

  useEffect(() => {
    console.log('effect');
    setCountWidth(document.getElementById('photoBoard').clientWidth);
    startTag(countWidth);
  }, [countWidth])

  function handleResize(){
    setCountWidth(document.getElementById('photoBoard').clientWidth)
  }

  window.addEventListener("resize", handleResize);

  return (
    <div className='photoBoard' id='photoBoard'>
      {countTag}
    </div>
  );
}

