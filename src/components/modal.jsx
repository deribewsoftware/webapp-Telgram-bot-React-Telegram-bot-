import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';

const MyModal = ({children,title,label,data}) => {
  const [showModal, setShowModal] = useState(false);
  const {theme}=useTheme()

  const closeModal = () => {
    // Implement your text condition here
     // Replace with your actual text condition check

    // If the text condition is true, close the modal
    if (!data) {
      console.log('data',true);
      setShowModal(true);
    }
    else{
      setShowModal(false);
      console.log('data',false);
    }
  };

  const onClose=() => {
    setShowModal(false);
  };
console.log("data",data);
  return (
    <>
    <button className={`btn btn-none ${theme==='light'? 'text-black ':'text-white'}`} onClick={()=>closeModal()}>{label}</button>
    {!data&&<div className={`container  ${theme==='light'? 'light ':'dark'}`} >
    
    <Modal show={showModal} onHide={closeModal}  dialogClassName={theme === 'light' ? 'light' : 'dark'}>
     <div className={`${theme === 'light' ? 'light' : 'dark'}`}>
     <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content */}
       {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
         Close
        </Button>
      </Modal.Footer>
     </div>
    </Modal>
  </div>}</>
  );
};

export default MyModal;
