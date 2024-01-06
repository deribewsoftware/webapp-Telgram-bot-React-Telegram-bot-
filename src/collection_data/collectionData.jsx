import React, { useCallback, useEffect, useRef, useState } from 'react'
import Container from '../components/container/container'
import TextArea from '../components/textarea/textarea'
import CameraComponent from '../camera/camera'
import Photo from '../components/photo/photo'
import Tesseract from 'tesseract.js'
import { useTheme } from '../hooks/useTheme'

const CollectionData = () => {
  const webcamRef = useRef(null);
  const [amPhoto,setAmPhoto]=useState(null)
  const [gePhoto,setGePhoto]=useState(null)
  const [amLoading,setAmLoading]=useState(false);
  const [geLoading,setGeLoading]=useState(false);
  const [amText,setAmText]=useState(null)
  const [geText,setGeText]=useState(null);
  
  const { language,data ,resetData,textChange,dataset,setDataSet} = useTheme()
  
  
const onCanceldata=()=>{
  setAmPhoto(null);
  setAmText(null);
  resetData();
  window.location.reload();
}

  const convertAmaricImageToText = () => {
   
    setAmLoading(true);
    
      Tesseract.recognize(
        amPhoto,
        'amh',
         { logger: (info) => console.log(info) }
       ).then(({ data: { text } }) => {
         setAmText(text);
         
       }).finally(() => {
         setAmLoading(false);
         setAmPhoto(null)
       });
    
 
    
  };


  const convertGeezImageToText = () => {
   
    setGeLoading(true);
    
      Tesseract.recognize(
        gePhoto,
        'amh',
         { logger: (info) => console.log(info) }
       ).then(({ data: { text } }) => {
         setGeText(text);
         
       }).finally(() => {
         setGeLoading(false);
         setGePhoto(null)
       });
    
 
    
  };



  const amCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setAmPhoto(imageSrc);
  }, [webcamRef]);
  
  useEffect(()=>{
    if(amText){
      textChange(amText);
    }
    else{
      resetData();
    }
  },[amText])



  const geCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setGePhoto(imageSrc);
  }, [webcamRef]);
  
  useEffect(()=>{
    if(geText || amText){
     setDataSet({...dataset,amaric:amText,geez:geText})
    }
    else{
      resetData();
    }
  },[geText])

  
  console.log("data set",dataset)
  return (
    <div className='p-3 mt-5 p-lg-5 p-sm-5  row justify-content-around gap-20 '>
        <div className="col-sm-12 col-lg-5 col-md-5">
      <Container>
        <div className="flex flex-col">
        <h1>Geez</h1>
        <div className="mt-10 relative ">
        {gePhoto && (!geText)&& <img src={gePhoto} alt="photo"  className='w-300 h-400'/>}


        {geLoading&& <div className='photoLoading'>Loading...</div>}
      </div>
      <p>{geText}</p>
        <TextArea/>
        <div className="flex ">
        {!gePhoto&&!geText&&<>  <div className=""><CameraComponent
     photo={gePhoto}
     capture={geCapture}
     text={geText}
     convertImageToText={convertGeezImageToText}
     photoLoading={geLoading}
     webcamRef={webcamRef}
     onCancel={onCanceldata}
     />
         </div>
          <div className=""><Photo setPhoto={setGePhoto}/></div></>}

          {gePhoto&&!geText&&<div className="">
            <button className='btn btn-primary' onClick={convertGeezImageToText}>Convert to text</button>
          </div>}
         
          
        </div>
       {geText&& <div className="">
          <button className='btn btn-success mb-5' onClick={()=>{}}>Save Text</button>
        </div>}
        </div>
      </Container>
      
      </div>





      <div className="col-sm-12 col-lg-5 col-md-5">
      <Container>
        <div className="flex flex-col">
        <h1>Amharic</h1>
        <div className="mt-10 relative ">
        {amPhoto && (!amText)&& <img src={amPhoto} alt="photo"  className='w-300 h-400'/>}


        {amLoading&& <div className='photoLoading'>Loading...</div>}
      </div>
      <p>{amText}</p>
        <TextArea/>
        <div className="flex ">
        {!amPhoto&&!amText&&<>  <div className="">
        <CameraComponent
     photo={amPhoto}
     capture={amCapture}
     text={amText}
     convertImageToText={convertAmaricImageToText}
     photoLoading={amLoading}
     webcamRef={webcamRef}
     onCancel={onCanceldata}
     />
          
          </div>
          <div className=""><Photo setPhoto={setAmPhoto}/></div></>}

          {amPhoto&&!amText&&<div className="">
            <button className='btn btn-primary' onClick={convertAmaricImageToText}>Convert to text</button>
          </div>}
         
          
        </div>
       {amText&& <div className="">
          <button className='btn btn-success mb-5' onClick={()=>{}}>Save Text</button>
        </div>}
        </div>
      </Container>
      
      </div>

      
    </div>
  )
}

export default CollectionData