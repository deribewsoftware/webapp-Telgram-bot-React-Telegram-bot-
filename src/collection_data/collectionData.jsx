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
  const [showAmModal, setShowAmModal] = useState(false);
  const [showGeModal, setShowGeModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const [isAmCropping, setIsAmCropping] = useState(false);
  const [isGeCropping, setIsGeCropping] = useState(false);

  const handleAmCropComplete = (croppedPhoto) => {
    setAmPhoto(croppedPhoto);
  };

  const handleGeCropComplete = (croppedPhoto) => {
    setGePhoto(croppedPhoto);
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

  const handlePaste = (e, setPhoto, setIsCropping, setShowModal) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhoto(e.target.result);
          console.log("target point ", e.target, e.target.result)
          setIsCropping(true);
          setShowModal(true);
        };
        reader.readAsDataURL(blob);
        e.preventDefault();
        break;
      }
    }
  };


  const geCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setGePhoto(imageSrc);
  }, [webcamRef]);
  
  
  
  console.log("data  entry",dataEntry)
  console.log("data set :",dataset)

  const handledataSave= async () =>{
    console.log("data entry", dataEntry)
    console.log("entries", amText, geText)
    if (!dataEntry.geez || !dataEntry.amaric) {
      alert("Both Geez and Amharic text are required.");
      return;
    }
    setIsSaving(true)
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
    } finally {
      setIsSaving(false);
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
        <div className="col-sm-12 col-lg-5 col-md-5"
         onPaste={(e) => handlePaste(e, setGePhoto, setIsGeCropping, setShowGeModal)}
        >
          
      <Container>
        <div className="flex flex-col">
        <h1>Geez</h1>
        <div className="mt-10 relative">
        {
        gePhoto && (!geText)&& 
        (<div className='flex flex-col justify-center items-center gap-4'>
            <img src={gePhoto} alt="photo"  className='w-300 h-400'/>
            <button className='btn btn-success' onClick={convertGeezImageToText}>
                Convert to Text
            </button>
        </div>)
        }
        {geLoading&& <div className='photoLoading'>Loading...</div>}
      </div>
      <TextArea 
          value={geText} 
          onChange={(e) => {
            const updatedText = e.target.value;
            setGeText(updatedText);
            setDataEntry((prevData) => ({ ...prevData, geez: updatedText }));
          }} 
        />
        
        <div className="flex ">
          {!geText && (
            <>
              <CameraComponent
                photo={gePhoto}
                capture={geCapture}
                text={geText}
                convertImageToText={convertGeezImageToText}
                photoLoading={geLoading}
                webcamRef={webcamRef}
                onCancel={onCanceldata}
                isCropping={isGeCropping}
                onCropComplete={handleGeCropComplete}
                onCroppingChange={setIsGeCropping}
                showModal={showGeModal}
                setShowModal={setShowGeModal}
                onModalClose={(shouldShow) => setShowGeModal(shouldShow)}
              />
              <Photo setPhoto={setGePhoto} onUpload={
                () => {
                  setIsGeCropping(true)
                  setShowGeModal(true);
                  }
              }/>
            </>
          )}
          {geText && (
            <div className="flex justify-around mt-20">
              <button className='btn btn-danger' onClick={() => {
                setGePhoto(null);
                setShowGeModal(false);
                setGeText(null);
                setIsGeCropping(false);
                setDataEntry({ ...dataEntry, geez: ""  });
              }}>
                Reset
              </button>
            </div>
          )}
        </div>      
        </div>
      </Container>
      
      </div>

      <div className="col-sm-12 col-lg-5 col-md-5"
        onPaste={(e) => handlePaste(e, setAmPhoto, setIsAmCropping, setShowAmModal)}
      >
      <Container>
        <div className="flex flex-col">
        <h1>Amharic</h1>
        <div className="mt-10 relative ">
        {
        amPhoto && (!amText)&& (
          <div className='flex flex-col justify-center items-center gap-4'>
            <img src={amPhoto} alt="photo"  className='w-300 h-400'/>
            <button className='btn btn-success' onClick={convertAmaricImageToText}>
                Convert to Text
            </button>
          </div>   
      )
        }
        {amLoading&& <div className='photoLoading'>Loading...</div>}
        </div>
     
        <TextArea 
          value={amText} 
          onChange={(e) => {
            const updatedText = e.target.value;
            setAmText(updatedText);
            setDataEntry((prevData) => ({ ...prevData, amaric: updatedText }));
          }} 
        />

        <div className="flex ">
          {!amText &&  (
            <>
              <CameraComponent
               photo={amPhoto}
               capture={amCapture}
               text={amText}
               convertImageToText={convertAmaricImageToText}
               photoLoading={amLoading}
               webcamRef={webcamRef}
               onCancel={() => {
                setAmPhoto(null);
                setShowAmModal(false);
              }}
               onCropComplete={handleAmCropComplete}
               isCropping={isAmCropping}
               onCroppingChange={setIsAmCropping} 
               showModal={showAmModal}
               setShowModal={setShowAmModal}
               onModalClose={(shouldShow) => setShowAmModal(shouldShow)}
              />
              <Photo setPhoto={setAmPhoto}  onUpload={
                () => {
                  setIsAmCropping(true)
                  setShowAmModal(true);
                  }}/>
            </>
          )}
          {amText && (
            <div className="flex justify-around mt-20">
              <button className='btn btn-danger' onClick={() => {
                setAmPhoto(null);
                setShowAmModal(false);
                setAmText(null);
                setIsAmCropping(false);
                setDataEntry({ ...dataEntry, amaric: ""  });
              }}>
                Reset
              </button>
            </div>
          )
          }
        </div>
        </div>
      </Container>
      
      </div>
    </div>
    <div className="flex justify-around px-1  w-full">
      <button className='btn btn-primary' onClick={handledataSave} disabled={isSaving}>Save data</button>
    </div>
    </div>
  )
}

export default CollectionData