import { Link } from "react-router-dom";

interface Props {
  item: {
    _id?: any;
    name: string;
    image?: string;
    quantity?: number;
    price?: number;
  };
  delfunc: (id: any) => void;
}

const Products = ({ item, delfunc }: Props) => {
  return (
    <>
      <div className="col-lg-3 col-md-5 col-10 m-1 rounded  py-3 mx-4 d-flex flex-column align-items-center gap-2 bg-danger-subtle  ">
        <img src={item.image} width={220} height={150} className="p-2" />

        <h4> {item.name}</h4>
        <h5>Quantity: {item.quantity}</h5>
        <h5>&#8377; {item.price}</h5>
        <div className="col-12 d-flex justify-content-evenly ">
          <Link to={`/create/${item._id}`} className=" btn btn-success col-4">
            Edit
          </Link>
          <button
            onClick={() => {
              delfunc(item._id);
            }}
            className=" btn btn-danger col-4"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
