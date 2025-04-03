import React, { useCallback} from 'react'
import { useDropzone } from 'react-dropzone';
import { FaImage } from 'react-icons/fa';

const Photo = ({setPhoto, onUpload}) => {

  const onDrop = useCallback((acceptedFiles) => {
    
    // Handle dropped files as needed
    
    const file = acceptedFiles[0]
    if(file ){
      const read=new FileReader();
      read.onload = () =>{
        setPhoto(read.result);
        onUpload?.()
      }
      read.readAsDataURL(file )
    }
  }, [setPhoto, onUpload]);




  const { getRootProps, getInputProps } = useDropzone({ onDrop,accept: 'image/*' });
  return (
    <div {...getRootProps()} className="mt-10">
      <input {...getInputProps()} />
      <FaImage className="upload-icon" size={30}/>
      
     
    </div>
  )
}

export default Photo