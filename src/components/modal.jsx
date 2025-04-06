import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';

const MyModal = ({children, title, label, data, show, onClose, setShowModal}) => {
  const {theme} = useTheme()

  return (
    <>
      <button 
        className={`btn btn-none ${theme === 'light' ? 'text-black' : 'text-white'}`} 
        onClick={() => setShowModal(true)}
      >
        {label}
      </button>
      
      <Modal show={show} onHide={() => onClose(false)} dialogClassName={theme}>
        <div className={theme}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => onClose(false)}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
