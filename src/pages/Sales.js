import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SaleForm from "../components/SaleForm";
import fire from "../firebase";
import "./Sales.css";

const Sales = () => {
  const brandDropdownRef = useRef();
  const modelDropdownRef = useRef();

  const [products, setProducts] = useState([]);

  const [productTypesOptions, setProductTypesOptions] = useState([]);
  const [productBrandOptions, setProductBrandOptions] = useState([]);
  const [productModelOptions, setProductModelOptions] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [basket, setBasket] = useState([]);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("products").get();
      const dataArray = data.docs.map((doc) => doc.data());
      setProducts(dataArray);

      setProductTypesOptions([
        ...new Set(dataArray.map((item) => item.productType)),
      ]);
    };
    fetchData();
  }, []);

  const handleProductTypeChange = (e) => {
    setSelectedType(e.target.value);
    let filtered = products.filter(
      (item) => item.productType === e.target.value
    );
    brandDropdownRef.current.value = "";
    modelDropdownRef.current.value = "";
    setSelectedProduct(null);

    setProductBrandOptions([
      ...new Set(filtered.map((item) => item.productBrand)),
    ]);
  };

  const handleProductBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    let filtered = products.filter(
      (item) =>
        item.productType === selectedType &&
        item.productBrand === e.target.value
    );
    setSelectedProduct(null);
    modelDropdownRef.current.value = "";
    setProductModelOptions([
      ...new Set(filtered.map((item) => item.productModel)),
    ]);
  };
  const handleProductModelChange = (e) => {
    let filtered = products.filter(
      (item) =>
        item.productType === selectedType &&
        item.productBrand === selectedBrand &&
        item.productModel === e.target.value
    );

    setSelectedProduct(filtered[0]);
  };

  return (
    <>
      <div className="sales-page-container">
        <h1 className="product-sales-title">Ürün Satış</h1>
        <div className="subtitles-container">
          <h2 className="selection-title">Ürün Katolog</h2>
          {showForm && <h2 className="form-title">Satış Formu</h2>}
        </div>

        <div className="selection-and-form-container">
          <div className="product-selection-container">
            <div className="product-type-selection">
              <span>Ürün tipi: </span>
              <select
                className="dropdown"
                name="types"
                onChange={handleProductTypeChange}
              >
                <option value="">Choose a type</option>
                {productTypesOptions
                  ? productTypesOptions.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="product-brand-selection">
              <span>Ürün markası: </span>
              <select
                className="dropdown"
                name="brands"
                onChange={handleProductBrandChange}
                ref={brandDropdownRef}
              >
                <option value="">Choose a brand</option>
                {productBrandOptions
                  ? productBrandOptions.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="product-model-selection">
              <span>Ürün modeli: </span>
              <select
                className="dropdown"
                name="models"
                onChange={handleProductModelChange}
                ref={modelDropdownRef}
              >
                <option value="">Choose a model</option>
                {productModelOptions
                  ? productModelOptions.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {selectedProduct ? (
              <div className="product-price-button-container">
                <div className="product-price-info">
                  <span>Ürünün fiyatı: </span>
                  <span>{selectedProduct.productPrice} TL</span>
                </div>
                <div className="add-product-button-container">
                  <button
                    className="add-product-basket-button"
                    onClick={() => {
                      setBasket((oldArray) => [...oldArray, selectedProduct]);
                      setBasketTotalPrice(
                        (oldPrice) => oldPrice + selectedProduct.productPrice
                      );
                    }}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ) : null}
            {basket.length > 0 && (
              <div className="basket-info">
                <div className="basket-item-count-container">
                  <div>Sepetteki ürün sayısı: </div>
                  <div>{basket.length}</div>
                </div>
                <div className="basket-total-price-container">
                  <div>Sepetteki fiyat toplam: </div>
                  <div>{basketTotalPrice} TL </div>
                </div>
                <div className="sale-form-create-button-container">
                  <button onClick={() => setShowForm(true)}>
                    Satış Formu Oluştur
                  </button>
                </div>
              </div>
            )}
          </div>
          {showForm && (
            <SaleForm
              selledProducts={basket}
              totalPrice={basketTotalPrice}
            ></SaleForm>
          )}
        </div>

        <div className="link-container">
          <Link
            to={{
              pathname: "/customerInfo",
            }}
          >
            <h3>Müşteri Bilgileri Sayfasına Git &#8594;</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sales;
