import { useLocation } from "react-router-dom";
import BuyingBox from "../../components/BuyingBox/BuyingBox";
import DescriptionBoxProduct from "../../components/DescriptionBoxProduct/DescriptionBoxProduct";
import Navbar from "../../components/Navbar/Navbar";
import PhotoboxProduct from "../../components/PhotoboxProduct/PhotoboxProduct";
import "./DetailProduct.css";

const DetailProduct = () => {
  const location = useLocation();
  const { item } = location.state;

  return (
    <div>
      <Navbar />
      <h1>Product Detail</h1>
      <div className="flx">
        <PhotoboxProduct id={item?.id} />
        <DescriptionBoxProduct item={item} />
        <BuyingBox productId={item?.id} stock={item?.stock} />
      </div>
    </div>
  );
};
export default DetailProduct;