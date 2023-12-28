import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Rootstate } from "../state/store";
import { setLink, setLogin } from "../state/counter/counterSlice";
import { useRef } from "react";

const Navbar = () => {
  let file: any = null;
  const GoPage = useNavigate();
  const lnk = useRef(null);
  const chgLogin = () => {
    file.current.click();
    //console.log(lnk.current, file);
    if (isloggedIn) {
      dispatch(setLogin(false));
      dispatch(setLink(1));
    }
    GoPage("/login");
  };
  const chngpage = () => {
    file.current.click();
    //alert("hi");
    dynamicLink == 0
      ? (dispatch(setLink(1)), GoPage("/create"))
      : (dispatch(setLink(0)), GoPage("/"));
    //console.log(lnk.current, file);
  };
  const isloggedIn = useSelector((state: Rootstate) => state.counter.islogin);
  const dynamicLink = useSelector((state: Rootstate) => state.counter.pglink);

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark fixed-top px-3 py-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h4>SHOPIT</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={(file = lnk)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end me-3"
          id="navbarText"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <button
                onClick={chngpage}
                className="text-white btn cus-btn"
                aria-current="page"
              >
                {dynamicLink == 0 ? "Add" : "Home"}
              </button>
            </li>
            <li className="nav-item">
              <button onClick={chgLogin} className="text-white btn cus-btn">
                {isloggedIn ? "Log Out" : "Log In"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
