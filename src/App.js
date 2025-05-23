
import './App.css';
import { useTheme } from './hooks/useTheme';

import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';


function App() {
  const { theme, toggleTheme } = useTheme();
  console.log("apk", process.env.REACT_APP_API_KEY)
  return (
    <div className="App " style={{ background: theme === 'light' ? '#fff' : '#031525', color: theme === 'light' ? '#000' : '#fff' }}>
    <RouterProvider router={router} />
   </div>
  );
}

export default App;
