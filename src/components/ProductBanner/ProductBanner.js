import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { getItems } from "../../actions/itemActions";
import { useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import CategoryCard from "./CategoryCard/CategoryCard";

const category = [
  {
    id: 1,
    photo:
      "https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Fiction",
  },
  {
    id: 2,
    photo: "https://images.pexels.com/photos/4857773/pexels-photo-4857773.jpeg",
    category: "NonFiction",
  },
  {
    id: 3,
    photo:
      "https://images.pexels.com/photos/3207628/pexels-photo-3207628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Biography",
  },
  {
    id: 4,
    photo:
      "https://images.pexels.com/photos/3050829/pexels-photo-3050829.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Novel",
  },
];

const ProductBanner = () => {
  const { items } = useSelector((state) => state.itemReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems("api/product/"));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.new_product_container}>
        <h2>New Books</h2>
        <div className={styles.new_product}>
          {items.slice(0, 5).map((e, i) => {
            return <ProductCard key={i} item={e} />;
          })}
        </div>
        <div className={styles.category_product_container}>
          <h2>Shop By Category</h2>
          <div className={styles.category_product}>
            {category.slice(0, 5).map((e, i) => {
              return (
                <CategoryCard
                  key={i}
                  category={e.category}
                  photo={e.photo}
                  link={e.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
