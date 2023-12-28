import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../state/store";
import { setLink } from "../state/counter/counterSlice";

// interface ParentProps {
//   stateChanger: (value: number) => void;
//props: ParentProps
// }

const CreateProduct = () => {
  //const link = useSelector((state: Rootstate) => state.counter.pglink);
  //const isLoggedIn = useSelector((state: Rootstate) => state.counter.islogin);
  const dispatch = useDispatch();
  const goPage = useNavigate();
  const isLoggedin = useSelector((state: Rootstate) => state.counter.islogin);
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
  });
  const [isAddPage, setIsAddPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id }: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      if (id != undefined) {
        getProduct();
        //props.stateChanger(1);
        dispatch(setLink(1));
        setIsAddPage(false);
      }
    } else {
      dispatch(setLink(1));
      toast.error("Invalid login");
      goPage("/login");
    }
  }, []);

  const getProduct = async () => {
    try {
      setLoading(true);
      const item = await axios.get(`${API_URL}/api/Getproduct/${id}`);
      setLoading(false);
      setProduct(item.data);
      console.log(product);
    } catch (error) {
      setLoading(false);
      toast.error("Error in processing the request");
    }
  };

  const saveProduct = async (e: any) => {
    e.preventDefault();
    if (
      product.name != "" ||
      product.price != 0 ||
      product.quantity != 0 ||
      product.image != ""
    ) {
      try {
        setLoading(true);
        if (isAddPage) {
          const response = await axios.post(
            `${API_URL}/api/Addproduct`,
            product
          );
          console.log("add");
          toast.success(`Saved ${response.data.name} successfully`);
        } else {
          console.log("update", product);
          await axios.put(`${API_URL}/api/Updateproduct/${id}`, product);
          // props.stateChanger(0);
          dispatch(setLink(0));
          toast.info("Updated successfully");
        }

        setLoading(false);
        navigate("/");
        console.log(product);
      } catch (error) {
        console.log(error);
        toast.error("Error in processing the request");
        setLoading(false);
      }
    } else {
      alert("fill out all the input fields");
      return;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center  ">
        <div className="box">
          <form
            onSubmit={(e) => {
              saveProduct(e);
            }}
          >
            <div className="p-3 d-flex flex-column gap-3 ">
              <div className="text-center mb-2 ">
                <h4 className="fw-bold font-under  ">
                  {isAddPage
                    ? "Add Product"
                    : `Update Product - ${product.name}`}
                </h4>
              </div>
              <div>
                <h5>Name:</h5>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                  }}
                  className="form-control border-black "
                />
              </div>
              <div>
                <h5>Price:</h5>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: Number(e.target.value) });
                  }}
                  min={1}
                  className="form-control border-black "
                />
              </div>
              <div>
                <h5>Quantity:</h5>
                <input
                  type="number"
                  min={1}
                  value={product.quantity}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      quantity: Number(e.target.value),
                    });
                  }}
                  className="form-control border-black "
                />
              </div>
              <div>
                <h5>Image URL:</h5>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) => {
                    setProduct({ ...product, image: e.target.value });
                  }}
                  className="form-control border-black "
                />
              </div>
              <div className="my-3 text-center ">
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <button className="btn btn-success col-12">
                    {isAddPage ? "Save" : "Update"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
