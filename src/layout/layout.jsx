import { AiFillAudio } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { Link, Outlet,useLocation  } from "react-router-dom";



const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // #262f3d
  // #031525
  return (

    <div className="" >
      <Outlet/>
       {/* bottom navbar */}

<div className='flex justify-around b-navabar mt-20'>

<Link to="/" className={`
${currentPath==="/"? 'active':'link'}
`}>
<div className=""><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 21l-4-4m4 0l-4 4m0-16l4 4m-4 0l4-4M7 4l-4 4m4 0L3 4m0 16l4-4m-4 0 4 4" />
    </svg></div>
<p  className='label'>Data Translator</p>
</Link>

<Link to="/collection"  className={`
${currentPath==="/collection"?'active':'link'}
`}>
<div className="">
<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
</div>
<p  className='label'>Data Collection</p>
</Link>





</div>
    </div>
    );
}
 
export default Layout;