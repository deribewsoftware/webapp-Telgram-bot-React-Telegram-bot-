import { FaHome } from "react-icons/fa";
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
<div className=""> <FaHome size={30}/></div>
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