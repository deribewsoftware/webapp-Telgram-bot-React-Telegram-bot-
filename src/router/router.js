import { createBrowserRouter,createRoutesFromElements,Route } from "react-router-dom";
import Layout from "../layout/layout";
import CameraComponent from "../camera/camera";
import Home from "../home/home";
import CollectionData from "../collection_data/collectionData";

export const router=createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
        <Route path="/camera" element={<CameraComponent/>}/>
        <Route path="/collection" element={<CollectionData/>}/>
    </Route>

  )
)