import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './camera.css'
import { FaCamera } from "react-icons/fa";




import MyModal from '../components/modal';

const CameraComponent = ({capture,webcamRef,convertImageToText,onCancel,photoLoading,text,photo}) => {

 
  
 



  


  
  
  return (
     <MyModal
     data={text}
     label={<FaCamera size={30}/>}
     title={"Camera"}
     children={<div  className=''>
     
     {photo?  (
       <div className=' cameraPhoto'>
         <div className="photo ">
         <h2>Captured Photo:</h2>
         {<img src={photo} alt="Captured" />}

         <div className="flex justify-around mt-20">
         <button className='btn mt-20 btn-danger' onClick={()=>onCancel()}>Back</button>
         <button className='btn mt-20 btn-success' onClick={()=>convertImageToText()}>Convert to Text</button>
         
         </div>
         {photoLoading && <div className="photoLoading">Loading...</div>}
         </div>

         
       </div>
     ):<div className="w-full">
     <Webcam
    className="w-full"
       audio={false}
       ref={webcamRef}
       screenshotFormat="image/jpeg"
     />
     <button className='btn mt-20 btn-primary' onClick={capture}>Capture Photo</button>
     </div>}


    
   </div>}
   />
 
      
   
  );
};

export default CameraComponent;
