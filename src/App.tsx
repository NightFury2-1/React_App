import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
//import login from "./pages/loginPage";

import "./css/Allcss.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/loginPage";
import Navbar from "./component/navbar";
export const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="container  mt-cus">
          <div className="card ">
            <div className="card-body">
              <div className="row ">
                <Routes>
                  <Route index element={<Home />}></Route>

                  <Route path="/create" element={<CreateProduct />}></Route>
                  <Route path="/create/:id" element={<CreateProduct />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
