import { useEffect, useState } from "react";
import products from "../../../products/products";
import { useParams } from "react-router-dom";
import "./ItemDetail.css";
const ItemDetail = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {
    let productSelected = products.find((product) => product.id === id);
    setItem(productSelected);
  }, [id]);
  return (
    <div>
      <img src={item.imageUrl} alt="" />
      <h2>{item.title}</h2>
      <h2>{item.price}</h2>
    </div>
  );
};
export default ItemDetail;
