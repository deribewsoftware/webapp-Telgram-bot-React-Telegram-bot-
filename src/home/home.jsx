import React, {  useCallback, useEffect, useRef, useState } from 'react';
import './home.css'
import Tesseract from 'tesseract.js';




import { FaRegShareFromSquare } from "react-icons/fa6";

import { MdContentCopy, MdOutlineStarBorder } from "react-icons/md";
import TextArea from "../components/textarea/textarea";

import Container from "../components/container/container";
import { FaImage} from "react-icons/fa";
import SpeechToText from '../components/audio/audio';
import Navbar from '../components/navbar/navbar';
import { useTheme } from '../hooks/useTheme';
import CameraComponent from '../camera/camera';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';


const Home = () => {




  const sourceText = 'Hello, world!';
  const targetLanguage = 'am'; // Amharic language code
  const apiKey = "AIzaSyDaEYOR-Q2p_djMG8-QGWKHTIJvLs9aCqI";

  useEffect(() => {
    const translateText = async () => {
      try {
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            q: sourceText,
            target: targetLanguage,
            key: apiKey,
          }
        );

        console.log(`Original text: ${sourceText}`);
        console.log(`Translated text: ${response.data.data.translations[0].translatedText}`);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    translateText();
  }, [apiKey, sourceText, targetLanguage]);



 
  const webcamRef = useRef(null);
  const [photo,setPhoto]=useState(null);
  const [text,setText]=useState(null);
  
  const { language,data ,resetData,textChange} = useTheme()

  

  const onDrop = useCallback((acceptedFiles) => {
    
    // Handle dropped files as needed
    
    const file = acceptedFiles[0]
    if(file ){
      const read=new FileReader();
      read.onload = () =>{
        setPhoto(read.result);
      }
      read.readAsDataURL(file )
    }
  }, []);


  const { getRootProps, getInputProps } = useDropzone({ onDrop,accept: 'image/*' });
  

  const [Loading,setLoading]=useState(false);
  
  
const onCanceldata=()=>{
  setPhoto(null);
  setText(null);
  resetData();
  window.location.reload();
}


const convertImageToText = () => {
  let lng=language==="amharic" ?'amh':'eng'
  setLoading(true);
   Tesseract.recognize(
   photo,
    lng,
    { logger: (info) => console.log(info) }
  ).then(({ data: { text } }) => {
    setText(text);
    
  }).finally(() => {
    setLoading(false);
    setPhoto(null)
  });
};


const capture = useCallback(() => {
  const imageSrc = webcamRef.current.getScreenshot();
  setPhoto(imageSrc);
}, [webcamRef]);

useEffect(()=>{
  if(text){
    textChange(text);
  }
  else{
    resetData();
  }
},[text])

const handleChangeInput=(e)=>{
  setText(e.target.value);
}
console.log("text", text);
  return (<>  <div className="App flex justify-center">
   
  <div className='flex flex-col gap-20 width justify-center m-10  overflow-scroll-y'>
   {/* <CameraComponent/> */}
  <Navbar/>

   <Container>
     <div className='flex flex-col gap-10'>
     <div className='flex justify-between '>
      
    <div className='font-bold'> {language==='amharic'? 'ግእዝ':'English'}</div>
    
    
     </div>

     <div>
      <div className="mt-10 relative ">
        {photo && (!text)&& <img src={photo} alt="photo"  className='w-300 h-400'/>}


        {Loading&& <div className='photoLoading'>Loading...</div>}
      </div>
      
      {!text&&<p>{data}</p>}
       <TextArea value={text} onChange={handleChangeInput}/>

       <div className='flex justify-between mt-10'>
    <div>
     <div className="flex">
      
     {!photo&&(!text )&&(<>
     <div className=" flex ">
     {language!=='amharic'&& (
     
      
      <SpeechToText/>
    
     )}
     
    

     <div {...getRootProps()} className="mt-10">
      <input {...getInputProps()} />
      <FaImage className="upload-icon" size={30}/>
      
     
    </div>
    


    
     <CameraComponent
     photo={photo}
     capture={capture}
     text={text}
     convertImageToText={convertImageToText}
     photoLoading={Loading}
     webcamRef={webcamRef}
     onCancel={onCanceldata}
     />

     </div></>)}
     {(<>{photo&&(!text)&&<div className='flex justify-around gap-10'>
     <button className='btn btn-danger  text-sm' onClick={onCanceldata}> {language==='amharic'? 'ሰርዝ':'Cancel'}</button>
     <button className='btn btn-success text-sm' onClick={convertImageToText}> {language==='amharic'? 'ግወደ ጽሑፍ ቀይር':'convertTo Text'}</button>
     </div>}
     {text&&<button className="   btn btn-none bg-danger text-white text-sm mr-2 " onClick={onCanceldata}> {language==='amharic'? "ዳግም አስጀምር":"Reset"}</button>}</>)}
     
     
     </div>
    </div>
    
    {text&&<button className='btn btn-primary text-sm'>{language==='amharic'? 'ተርጉም':'Translate'}</button>}
     </div>
     </div>

     </div>

   </Container>



   <Container>
     <div className='flex flex-col gap-10'>
     <div className='flex justify-between'>
    <div className='font-bold'> አማርኛ</div>
    
    
     </div>

     <div>
      <p className='note'>
     {data}
      </p>

       <div className='flex justify-end mt-20'>
         <div className='flex justify-between mt-10'>

<MdContentCopy size={24}/>
<FaRegShareFromSquare size={24}/>
<MdOutlineStarBorder size={24}/>
         </div>
    
     </div>
     </div>

     </div>

   </Container>




 


  
  </div>


   </div></>);
}
 
export default Home;