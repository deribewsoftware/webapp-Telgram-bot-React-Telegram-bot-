
import { useTheme } from '../../hooks/useTheme';
import { CalculateTextareaHeight } from './textAreaHeight';
import './textarea.css'
const TextArea = ({value,onChange}) => {

  

  const autoIncreaseHeight = (event) => {
    const textarea = event.target;

    // Check if the textarea is defined before accessing its style property
    if (textarea) {
      // Set the height to auto before getting the scroll height
      textarea.style.height = 'auto';

      // Set the height to the scroll height of the content
      textarea.style.height = `${textarea.scrollHeight}px`;

      // Update the state with the current content
      
    }
  };

 
  const {theme}=useTheme()
  return ( <textarea 
    onChange={onChange}
    className={`textarea ${theme==='light' ? 'text-black':'text-white'}`}
    style={{height:CalculateTextareaHeight()}} 
    value={value || ''}/>);
}
 
export default TextArea;