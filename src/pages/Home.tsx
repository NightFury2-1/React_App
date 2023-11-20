import { useEffect, useState } from "react";
import axios from "axios";
import Products from "../component/Products";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { API_URL } from "../App";

const Home = () => {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteProduct = async (id: any) => {
    const result = await Swal.fire({
      title: "do you really want to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "delete",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/Deleteproduct/${id}`);
        toast.success("Deleted successfully");
        getProduct();
      } catch (error: any) {
        toast.error("Error in processing the request", error);
      }
    }
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/AllProducts`);
      console.log(response.data);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsError(true);
      setIsLoading(false);
      toast.error("Network Error, Unable to get products", error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-center col-12">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {isError ? (
            <div className="d-flex justify-content-center ">Network error</div>
          ) : (
            <div className="d-flex p-0 flex-wrap justify-content-center justify-content-lg-start justify-content-md-between gap-lg-4   ">
              {product.length > 0
                ? product.map((product, index) => {
                    return (
                      <Products
                        key={index}
                        item={product}
                        delfunc={deleteProduct}
                      />
                    );
                  })
                : "No products available"}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
