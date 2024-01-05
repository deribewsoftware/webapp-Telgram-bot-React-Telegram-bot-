import { useEffect } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition/lib/SpeechRecognition";
import { useTheme } from "../../hooks/useTheme";
import { AiFillAudio } from "react-icons/ai";
import './audio.css'

const SpeechToText  = () => {
  const {textChange}=useTheme();
  const {
    
    transcript,
    browserSupportsSpeechRecognition,
   

  }=useSpeechRecognition();
 useEffect(() => {

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
  return ( <div className=
  
  "">
    <button className="circle btn btn-none bg-success text-white  px-1 mx-2" onClick={SpeechRecognition.startListening}><AiFillAudio size={30} /></button>
    {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button> */}
   
  </div> );
}
 
export default SpeechToText ;