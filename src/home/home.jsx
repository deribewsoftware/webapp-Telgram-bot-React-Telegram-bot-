import React, {  useCallback, useEffect, useRef, useState } from 'react';
import './home.css'
import Tesseract from 'tesseract.js';




import { FaRegShareFromSquare } from "react-icons/fa6";

import { MdContentCopy, MdOutlineStarBorder } from "react-icons/md";
import TextArea from "../components/textarea/textarea";

import Container from "../components/container/container";
import { FaImage} from "react-icons/fa";

import Navbar from '../components/navbar/navbar';
import { useTheme } from '../hooks/useTheme';
import CameraComponent from '../camera/camera';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition/lib/SpeechRecognition";
import { AiFillAudio } from 'react-icons/ai';


const Home = () => {




 
  const webcamRef = useRef(null);
  const [photo,setPhoto]=useState(null);
  const [text,setText]=useState(null);
  const [geezData,setGeezData]=useState(null);
  const [englishData,setEnglishData]=useState(null);
  
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



const onTranslateGeez=useCallback(()=>{
try{
  axios.post('https://fasik.pythonanywhere.com/translate/geez',{geez_text:text}).then((response)=>{
   setGeezData(response.data.translatedText)
  });
}

catch(e){
  console.log("translate error", e);
}

})


const onTranslateEnglish=useCallback(()=>{
  try{
    axios.post('https://fasik.pythonanywhere.com/translate/english',{english_text:text}).then((response)=>{
     setEnglishData(response.data.translatedText)
     console.log(response.data);
    });
  }
  
  catch(e){
    console.log("translate error", e);
  }
  
  })















  const {
    
    transcript,
    browserSupportsSpeechRecognition,
   

  }=useSpeechRecognition();
 useEffect(() => {
setText(transcript);
  textChange(transcript);

    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.lang = "am-ET"; // Set the language for speech recognition
    }
  }, [browserSupportsSpeechRecognition,transcript]);
  if(!browserSupportsSpeechRecognition){
    return <div className="">
      your browser does't speech to text recognition
    </div>
  }






  return (<>  <div className="App flex justify-center">
   
  <div className='flex flex-col gap-20 width justify-center m-10  overflow-scroll-y'>
 
  <Navbar/>

   <Container>
     <div className='flex flex-col gap-10'>
     <div className='flex justify-between '>
      
    <div className='font_style_large font-bold'> {language==='amharic'? 'ግእዝ':'English'}</div>
    
    
     </div>

     <div>
      <div className="mt-10 relative ">
        {photo && (!text)&& <img src={photo} alt="photo"  className='w-300 h-400'/>}


        {Loading&& <div className='photoLoading font_style_large'>Loading...</div>}
      </div>
      
      {!text&&<p className='font_style_large'> {text}</p>}
       <div className="flex justify-center items-center">
       <TextArea value={text? text:""} onChange={handleChangeInput}/>
       </div>

       <div className='flex justify-between mt-10'>
    <div>
     <div className="flex">
      
     {!photo&&(!text )&&(<>
     <div className=" flex ">
     {language!=='amharic'&& (
     
      
       <button className="circle btn btn-none bg-success text-white  px-1 mx-2" onClick={SpeechRecognition.startListening}><AiFillAudio size={30} /></button>
    
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
     <button className={`btn btn-danger  text-sm ${language==='amharic'&&"amaric"}`} onClick={onCanceldata}> {language==='amharic'? 'ሰርዝ':'Cancel'}</button>
     <button className={`btn btn-success  text-sm ${language==='amharic'&&"amaric"}`} onClick={convertImageToText}> {language==='amharic'? 'ግወደ ጽሑፍ ቀይር':'convertTo Text'}</button>
     </div>}
     {text&&<button className="   btn btn-none bg-danger text-white text-sm mr-2 " onClick={onCanceldata}> {language==='amharic'? "ዳግም አስጀምር":"Reset"}</button>}</>)}
     
     
     </div>
    </div>
    
    {text&&language==='amharic'&&<button onClick={onTranslateGeez} className='btn btn-primary text-sm'>{language==='amharic'&&'ተርጉም'}</button>}

    {text&&language!=='amharic'&&<button onClick={onTranslateEnglish} className='btn btn-primary text-sm'>{language!=='amharic'&&'Translate'}</button>}
     </div>
     </div>

     </div>

   </Container>



   <Container>
     <div className='flex flex-col gap-10 min-h-400 relative'>
     <div className='flex justify-between'>
    <div className='font-bold font_style_large'> አማርኛ</div>
    
    
     </div>

     <div>
     <div className="flex justify-center items-center">
     {geezData&&!englishData&& <p className='note font_style_large'>
     {geezData}
      </p>}

      {!geezData&&englishData&& <p className='note font_style_large'>
     {englishData}
      </p>}
     </div>

       <div className='flex justify-end mt-20'>
         <div className='flex justify-between mt-10 absolute bottom-0 w-full'>

<MdContentCopy size={30}/>
<FaRegShareFromSquare size={30}/>
<MdOutlineStarBorder size={30}/>
         </div>
    
     </div>
     </div>

     </div>

   </Container>




 


  
  </div>


   </div></>);
}
 
export default Home;