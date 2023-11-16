import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";

import "./css/Allcss.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [link, setLink] = useState(0);

  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary p-0 fixed-top ">
          <div className="container-fluid bg-dark p-1  justify-content-center justify-content-lg-between justify-content-md-between justify-content-sm-between flex-column flex-lg-row flex-md-row flex-sm-row ">
            <div>
              <Link to="/">
                <h2 className="text-white p-3 ">React CRUD</h2>
              </Link>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-5 col-2 m-1  ">
              <div className="text-white col-12">
                {link == 0 ? (
                  <Link
                    to="/create"
                    className="btn cus-btn"
                    onClick={() => {
                      setLink(1);
                    }}
                  >
                    <h5 className="text-white m-0">ADD</h5>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="btn cus-btn"
                    onClick={() => {
                      setLink(0);
                    }}
                  >
                    <h5 className="text-white m-0">HOME</h5>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="container  mt-cus">
          <div className="card ">
            <div className="card-body">
              <div className="row ">
                <Routes>
                  <Route index element={<Home />}></Route>
                  <Route
                    path="/create"
                    element={<CreateProduct stateChanger={setLink} />}
                  ></Route>
                  <Route
                    path="/create/:id"
                    element={<CreateProduct stateChanger={setLink} />}
                  ></Route>
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
