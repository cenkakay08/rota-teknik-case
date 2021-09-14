import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaleForm from "../components/SaleForm";
import fire from "../firebase";

let products = [];

const Sales = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [productBrand, setProductBrand] = useState([]);
  const [productModel, setProductModel] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [price, setPrice] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState([]);

  const [showPrice, setShowPrice] = useState(false);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("products").get();
      products = data.docs.map((doc) => doc.data());

      /* let abcnew = products.map((item) => item.productType); */

      // copying array object
      /* const productTypes = products.map((object) => ({ ...object })); */

      setProductTypes([...new Set(products.map((item) => item.productType))]);
    };
    fetchData();
  }, []);

  const handleProductTypeChange = (e) => {
    console.log(e.target.value);
    setSelectedType(e.target.value);
    console.log(products);
    console.log(productTypes);
    let filtered = products.filter(
      (item) => item.productType == e.target.value
    );
    setProductBrand([...new Set(filtered.map((item) => item.productBrand))]);
    console.log(productBrand);
  };

  const handleProductBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    let filtered = products.filter(
      (item) =>
        item.productType == selectedType && item.productBrand == e.target.value
    );
    setProductModel([...new Set(filtered.map((item) => item.productModel))]);
    console.log(filtered);
  };
  const handleProductModelChange = (e) => {
    setSelectedModel(e.target.value);
    let filtered = products.filter(
      (item) =>
        item.productType == selectedType &&
        item.productBrand == selectedBrand &&
        item.productModel == e.target.value
    );
    setShowPrice(true);
    setPrice(filtered[0]?.productPrice);
    setSelectedProduct(filtered[0]);
    console.log(filtered);
  };

  return (
    <>
      <div className="sales-page-container">
        <div className="product-selection-container">
          <div className="product_type"></div>
        </div>
      </div>
      <select name="types" onChange={handleProductTypeChange}>
        <option value="" selected>
          Choose a type
        </option>
        {productTypes
          ? productTypes.map((product) => (
              <option value={product}>{product}</option>
            ))
          : null}
      </select>
      <select name="brands" onChange={handleProductBrandChange}>
        <option value="" selected>
          Choose a brand
        </option>
        {productBrand
          ? productBrand.map((product) => (
              <option value={product}>{product}</option>
            ))
          : null}
      </select>
      <select name="models" onChange={handleProductModelChange}>
        <option value="" selected>
          Choose a model
        </option>
        {productModel
          ? productModel.map((product) => (
              <option value={product}>{product}</option>
            ))
          : null}
      </select>
      {showPrice ? <div>{price}</div> : null}
      <button onClick={() => setShowForm(true)}>Form Oluştur</button>
      {showForm ? <SaleForm selledProduct={selectedProduct}></SaleForm> : null}
      <Link
        to={{
          pathname: "/customerInfo",
        }}
      >
        <button>Go to Customer Info Page</button>
      </Link>
    </>
  );
};

export default Sales;

// option üstüne onlick koymayı dene !!!!!
