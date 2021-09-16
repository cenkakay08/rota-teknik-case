import { useEffect, useState } from "react";
import { CustomerBill } from "../components/CustomerBill";
import { Link } from "react-router-dom";
import fire from "../firebase";
import "./CustomerInfo.css";

const CustomerInfo = () => {
  const [sales, setSales] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState([]);

  const handleCustomerSelection = (e) => {
    setSelectedCustomerName(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      const data = await db.collection("sales").get();
      const dataArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSales(dataArray);
      setCustomerList([...new Set(dataArray.map((item) => item.customerName))]);
    };
    fetchData();
  }, []);
  return (
    <div className="customer-info-page-container">
      <h1 className="customer-info-page-title">Müşteri Bilgileri</h1>
      <div className="sub-title-and-dropdown-container">
        <h3>Müşteri Seçimi</h3>
        <select
          className="form-select"
          id="customer-name-dropdown"
          name="customerNames"
          onChange={handleCustomerSelection}
        >
          <option value="">Bir Müşteri Seçin</option>
          {customerList.map((customer, index) => (
            <option key={index}>{customer}</option>
          ))}
        </select>
      </div>
      <hr className="line-after-dropdown"></hr>
      {sales.map((sale, index) => (
        <CustomerBill
          key={index}
          sale={sale}
          selectedCustomerName={selectedCustomerName}
        />
      ))}
      <div className="sticky-link-to-back">
        <Link
          to={{
            pathname: "/",
          }}
        >
          <h3>&#8592; Ürün Satış Sayfasına Geri Dön</h3>
        </Link>
      </div>
    </div>
  );
};

export default CustomerInfo;
