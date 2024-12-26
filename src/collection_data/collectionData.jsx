import React, { useCallback, useEffect, useRef, useState } from 'react'
import Container from '../components/container/container'
import TextArea from '../components/textarea/textarea'
import CameraComponent from '../camera/camera'
import Photo from '../components/photo/photo'
import Tesseract from 'tesseract.js'
import { useTheme } from '../hooks/useTheme'
import { CSVLink} from "react-csv";
import useDrivePicker from 'react-google-drive-picker'
const CollectionData = () => {
  const webcamRef = useRef(null);
  const [amPhoto,setAmPhoto]=useState(null)
  const [gePhoto,setGePhoto]=useState(null)
  const [amLoading,setAmLoading]=useState(false);
  const [geLoading,setGeLoading]=useState(false);
  const [amText,setAmText]=useState(null)
  const [geText,setGeText]=useState(null);
  const [dataEntry,setDataEntry]=useState({geez:"",amaric:""});
  
  const {  resetData,dataset, handleDataSave} = useTheme()
  
  
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
         setDataEntry((prevData)=>({...prevData,amaric:text}));
         
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
         setDataEntry((prevData)=>({...prevData,geez:text.toString()}));
         
       }).finally(() => {
         setGeLoading(false);
         setGePhoto(null)
       });
    
 
    
  };



  const amCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setAmPhoto(imageSrc);
  }, [webcamRef]);
  
  // useEffect(()=>{
  //   if(amText){
  //     textChange(amText);
  //   }
  //   else{
  //     resetData();
  //   }
  // },[amText])



  const geCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setGePhoto(imageSrc);
  }, [webcamRef]);
  
  
  
  console.log("data  entry",dataEntry)
  console.log("data set :",dataset)

  const handledataSave= async () =>{
    if (!dataEntry.geez || !dataEntry.amaric) {
      alert("Both Geez and Amharic text are required.");
      return;
    }
  
    try {
      // Replace this URL with your deployed Apps Script URL
      const scriptUrl = "https://script.google.com/macros/s/AKfycbwTsMtr6MnegzaouOs0aBwyHmYO10DIwMzMGam-fPL1lpWw1ngjXbz1eLMspFu1QwmaBg/exec";
  
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          geezData: dataEntry.geez,
          amharicData: dataEntry.amaric,
        }),
      });
  
      const result = await response.json();
      handleDataSave(dataEntry)
      setAmText(null);
      setGeText(null);
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  }



  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; 
  // custom view

 
  const handleOpenPicker = () => {
    openPicker({
      clientId: "642268051554-rn46ebfm72qckris2nejh1nicea4t8fp.apps.googleusercontent.com",
      developerKey: "AIzaSyAHJ0-E4e3nMWjCvalKodHH7s_jzyB0f78",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }

  return (
    <div className="">
      <div className='p-3 mt-5 p-lg-5 p-sm-5  row justify-content-around gap-20 '>
        <div className="col-sm-12 col-lg-5 col-md-5">
      <Container>
        <div className="flex flex-col">
        <h1>Geez</h1>
        <div className="mt-10 relative ">
        {gePhoto && (!geText)&& <img src={gePhoto} alt="photo"  className='w-300 h-400'/>}


        {geLoading&& <div className='photoLoading'>Loading...</div>}
      </div>
      
        <TextArea value={geText}/>
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
     
        <TextArea value={amText}/>
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
       
        </div>
      </Container>
      
      </div>

      
    </div>
    <div className="flex justify-around px-1  w-full">
      <button className='btn btn-primary' onClick={handledataSave}>Save data</button>

      
    </div>
    </div>
  )
}

export default CollectionData