import { useRef } from "react";

export const CalculateTextareaHeight = () => {
  // Adjust this value based on your styling (font-size, line-height, etc.)
  const lineHeight = 20;
  const textareaRef = useRef(null);

  // Calculate the number of lines by dividing the content height by line height
  if( !textareaRef.current){
    return '100px'
  }
  console.log('textref:',textareaRef)
  const numberOfLines = Math.ceil(textareaRef.current.scrollHeight / lineHeight);
  
  // Set the height of the textarea dynamically
  const newHeight = numberOfLines * lineHeight;
  return `${newHeight}px`;
};