import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const { id } = useParams();
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const item = await axios.get(
        `http://localhost:3000/api/Getproduct/${id}`
      );
      setIsLoading(false);
      setProduct(item.data);
      console.log(product);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error in processing the request");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {isloading ? (
        <div className="text-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div>{id}</div>
      )}
    </div>
  );
};
export default EditPage;
