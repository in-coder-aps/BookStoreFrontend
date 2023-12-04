import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { addItem, updateItem } from "../../actions/itemActions";
import styles from "./styles.module.css";

const categoryData = [
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

const ProductForm = ({ storeId, actiontype, editForm, cancel }) => {
  const { loading } = useSelector((state) => state.itemReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
    stock: "",
    condition: "",
  });

  const [rating, setRating] = useState(0);
  const [thumbnailImgFile, setThumbnailImgFile] = useState(null);
  const [thumbnailImgPreviewURL, setThumbnailImgPreviewURL] = useState("");

  const { title, description, category, price, thumbnail, stock, condition } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleRating = (rate) => {
    setRating(rate);
  };

  const onImageChange = (e) => {
    let files = e.target.files;
    console.log(e.target.files);

    if (FileReader && files && files.length) {
      const previewURL = URL.createObjectURL(files[0]);
      setThumbnailImgPreviewURL(previewURL);
      setThumbnailImgFile(files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!loading) {
      const data = {
        storeId: storeId,
        title: title,
        description: description,
        category: category,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        condition: condition,
        rating: rating,
      };

      // console.log("Data:",data)

      if (actiontype === "Add") {
        dispatch(addItem(data, thumbnailImgFile));
      } else {
        dispatch(updateItem(editForm.id, data, thumbnailImgFile));
      }
      setTimeout(() => {
        window.location.replace("/seller_product_list");
      }, 3000);
    }
  };

  useEffect(() => {
    if (Object.keys(editForm).length !== 0) {
      setFormData(editForm);
      setRating(editForm.rating);
    }
  }, [dispatch, editForm]);

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <div>
            <strong>Name :</strong>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <div>
            <strong>Description :</strong>
          </div>
          <textarea
            rows={5}
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div>
          <div>
            <strong>Category :</strong>
          </div>
          <select
            value={category}
            name="category"
            onChange={(e) => onChange(e)}
            required
          >
            <option value="" disabled>
              Category
            </option>
            {categoryData.map((e, i) => {
              return <option value={e.category}>{e.category}</option>;
            })}
          </select>
        </div>
        <div>
          <div>
            <strong>Price :</strong>
          </div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <div>
            <strong>Thumbnail :</strong>
          </div>
          <div>
            {thumbnail || thumbnailImgPreviewURL ? (
              <img
                src={
                  thumbnailImgPreviewURL ? thumbnailImgPreviewURL : thumbnail
                }
                alt="thumbnail-preview"
                width={200}
                height={200}
              />
            ) : (
              <span></span>
            )}
          </div>
          <div>
            <input
              type="file"
              name="thumbail"
              placeholder="Thumbnail"
              onChange={(e) => onImageChange(e)}
            />
          </div>
        </div>
        <div>
          <div>
            <strong>Stock :</strong>
          </div>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={stock}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <div>
            <strong>Condition :</strong>
          </div>
          <select
            value={condition}
            name="condition"
            onChange={(e) => onChange(e)}
            required
          >
            <option value="" disabled>
              Condition
            </option>
            <option value="New">New</option>
            <option value="Renewed">Renewed</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <div>
            <strong>Rating :</strong>
          </div>
          <Rating onClick={handleRating} ratingValue={rating} size={20} />
        </div>
        <button onClick={cancel}>Cancel</button>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
