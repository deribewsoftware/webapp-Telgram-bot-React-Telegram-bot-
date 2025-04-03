import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ReactCrop, {centerCrop, makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './camera.css';
import { FaCamera } from "react-icons/fa";
import MyModal from '../components/modal';
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'


function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}


const CameraComponent = ({ capture, webcamRef, convertImageToText, onCancel, photoLoading, text, photo, onCropComplete, isCropping, onCroppingChange, showModal, setShowModal, onModalClose}) => {
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const hiddenAnchorRef = useRef(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)
  // const [isCropping, setIsCropping] = useState(false);

  // const videoConstraints = {
  //   facingMode: "user",
  // };

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const getCroppedImg = async () => {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }

    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(blob)
      })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )


  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const handleCropComplete = async () => {
    if (!photo) return;
    console.log('Image Ref:', imgRef.current);
    console.log('Canvas Ref:', previewCanvasRef.current);
    console.log('Completed Crop:', completedCrop);

    const croppedImage = await getCroppedImg(photo, crop, scale);
    onCropComplete(croppedImage);
    onCroppingChange(false);  
  };

  return (
    <MyModal
      show={showModal}
      setShowModal={setShowModal}
      onClose={onModalClose}
      data={text}
      label={<FaCamera size={30} />}
      title={"Camera"}
      children={
        <div className=''>
          {photo ? (
            <div className='cameraPhoto'>
              <div className="photo">
                <h2>Captured Photo:</h2>
                {isCropping ? (
                  <>
                    <ReactCrop
                      crop={crop}
                      onChange={c => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={undefined}
                    >
                      <img 
                        ref={imgRef}
                        src={photo} 
                        alt="Captured" 
                        style={{ transform: `scale(${scale})` }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                    {!!completedCrop && (
                      <>
                        <div>
                          <canvas
                            ref={previewCanvasRef}
                            style={{
                              border: '1px solid black',
                              objectFit: 'contain',
                              width: completedCrop.width,
                              height: completedCrop.height,
                            }}
                          />
                        </div>
                      </>)
                    }
                    <div className="zoom-controls">
                      <label>Zoom:</label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-around mt-20">
                      <button className='btn btn-danger' onClick={() => {
                        setCrop({ unit: '%', width: 50, height: 50 });
                        setScale(1);
                        onCancel();
                      }}>
                        Cancel
                      </button>
                      <button className='btn btn-success' onClick={handleCropComplete}>
                        Apply Crop
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={photo} alt="Captured" />
                    <div className="flex justify-around mt-20">
                      <button className='btn btn-danger' onClick={onCancel}>
                        Back
                      </button>
                      <button className='btn btn-success' onClick={convertImageToText}>
                        Convert to Text
                      </button>
                    </div>
                  </>
                )}
                {photoLoading && <div className="photoLoading">Loading...</div>}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Webcam
                className="w-full"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <button className='btn mt-20 btn-primary' onClick={() => {
                const imageSrc = webcamRef.current.getScreenshot();
                capture(imageSrc);
                onCroppingChange(true); 
              }}>
                Capture Photo
              </button>
            </div>
          )}
        </div>
      }
    />
  );
};

export default CameraComponent;