//conver photo to text
import Tesseract from 'tesseract.js';


export const convertImageToText = (setPhotoLoading,capturedImage,setText) => {
  setPhotoLoading(true);
  Tesseract.recognize(
    capturedImage,
    'amh',
    { logger: (info) => console.log(info) }
  ).then(({ data: { text } }) => {
    setText(text);
  }).finally(() => {
    setPhotoLoading(false);
  });
};
