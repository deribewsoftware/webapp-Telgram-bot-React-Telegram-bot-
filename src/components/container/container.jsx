
import { useTheme } from '../../hooks/useTheme';
import './container.css'

const Container = ({children}) => {
  const { theme, toggleTheme } = useTheme();
  return ( <div className={`container ${theme==='light'? 'light':'dark'}`}>{children}</div> );
}
 
export default Container;