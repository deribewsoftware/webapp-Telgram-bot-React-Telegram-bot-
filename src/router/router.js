import { createBrowserRouter,createRoutesFromElements,Route } from "react-router-dom";
import Layout from "../layout/layout";
import CameraComponent from "../camera/camera";
import Home from "../home/home";

export const router=createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
        <Route path="/camera" element={<CameraComponent/>}/>
    </Route>

  )
)