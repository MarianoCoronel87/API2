import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export const ProductCard = ({ imageUrl, title, price, description, id }) => {
  return (
    <div style={{ border: "2px solid black", width: "300px" }}>
      <img src={imageUrl} style={{ width: "100px" }} />
      <h2>{title}</h2>
      <h2>{price}</h2>
      <h2>{description}</h2>
      <Link to={`/detail/${id}`}>
        <Button variant="contained">Ver detalle</Button>
      </Link>

      <button className="bg-red mt-2 font-2rem "></button>
    </div>
  );
};
