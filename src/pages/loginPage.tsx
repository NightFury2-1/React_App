import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { API_URL } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLink, setLogin } from "../state/counter/counterSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [bgcolor, setBgcolor] = useState("0px 0px 10px 2px rgb(110 255 3)");
  const GoPage = useNavigate();

  const loginGo = async (e: any) => {
    e.preventDefault();
    if (details.email != "" && details.password != "") {
      try {
        setLoading(true);
        await axios.post(`${API_URL}/api/login`, details).then((res) => {
          if (res.data.A == 1) {
            setBgcolor("0px 0px 10px 2px rgb(110 255 3)");
            dispatch(setLogin(true));
            toast.success(res.data.M);
            dispatch(setLink(0));
            GoPage("/");
          } else {
            setBgcolor("0px 0px 10px 2px  #d71a1a");
            toast.error(res.data.E);
          }
        });
        // toast.success("Logged in successfully");
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.error("Error in processing the request");
      }
    }
  };

  const [seePass, SetseePass] = useState(false);
  const viewPassword = (seeing: boolean) => {
    let x = document.getElementById("passbox") as HTMLInputElement;
    if (seeing && x.type === "password") {
      SetseePass(true);
      x.type = "text";
    } else {
      x.type = "password";
      SetseePass(false);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          loginGo(e);
        }}
      >
        <div className="row justify-content-center ">
          <h2 className="text-center ">Login</h2>
          <div className="loginbox" style={{ boxShadow: bgcolor }}>
            <div className="px-2 py-4 d-flex flex-column gap-3">
              <div>
                <h4>Email</h4>
                <input
                  type="email"
                  className="form-control "
                  value={details.email}
                  onChange={(e) => {
                    setDetails({ ...details, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="position-relative">
                <h4>Password</h4>
                <input
                  id="passbox"
                  type="password"
                  value={details.password}
                  onChange={(e) => {
                    setDetails({ ...details, password: e.target.value });
                  }}
                  className="form-control pe-5 "
                  required
                />
                {seePass ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="text-primary lgneye"
                    onClick={() => {
                      viewPassword(false);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-primary lgneye"
                    onClick={() => {
                      viewPassword(true);
                    }}
                  />
                )}
              </div>
              <div>
                <div className="my-3 text-center ">
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <button className="form-control btn btn-primary ">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
