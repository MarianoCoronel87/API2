import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../../products/products";
import { ProductCard } from "../../common/ProductCard/ProductCard";
const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { name } = useParams();
  let productsFiltered = products.filter(
    (element) => element.category === name
  );
  return (
    <div>
      {items.map((elemento) => {
        return (
          <ProductCard
            key={elemento.id}
            imageUrl={elemento.imageUrl}
            title={elemento.title}
            price={elemento.price}
            description={elemento.description}
            stock={elemento.stock}
            category={elemento.category}
            id={elemento.id}
          />
        );
      })}
    </div>
  );
};
export default ItemListContainer;
