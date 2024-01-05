import { FaLongArrowAltRight } from "react-icons/fa";
import Container from "../container/container";
import { useTheme } from "../../hooks/useTheme";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import './navbar.css'
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme,language,languageChange } = useTheme();
  const [selectedValue,setSelectedValue]=useState('amaric')
  const handleSelectChange=(event)=>{
    setSelectedValue(event.target.value);
    languageChange(event.target.value)
  }
  
  return ( <Container>
    <div className="flex justify-between " style={{width:'100%'}}>
    <div className='flex justify-between  ' style={{width:'80%'}}>
   <div className='font-bold'>
   <select value={selectedValue} onChange={handleSelectChange} className={`bg-transparent  p-2 ${theme==='light'? 'text-black':'text-white'}`}>
        
        <option className={`bg-transparent text-black p-2`} value="amharic" >{language==='amharic'? 'ግእዝ':'Geez'}</option>
        <option className={`bg-transparent text-black p-2`} value="english"> {language==='amharic'? 'እንግሊዝኛ':'English'}</option>
       
      </select>
   
   </div>
  <FaLongArrowAltRight size={30}/>
   <div className='font-bold'> {language==='amharic'? 'አማርኛ':'Amharic'}</div>
    </div>
    <button  style={{width:'100px'}} className=' toggle-btn' onClick={toggleTheme}>{theme==='light'? <IoMoonOutline size={30} color={"black"}/>:<MdOutlineWbSunny size={30} color={"white"}/>}</button>
    </div>

  </Container> );
}
 
export default Navbar;