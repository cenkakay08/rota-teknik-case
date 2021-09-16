import { useEffect, useState } from "react";
import { CustomerBill } from "../components/CustomerBill";
import { Link } from "react-router-dom";
import fire from "../firebase";
import "./CustomerInfo.css";

const CustomerInfo = () => {
  // Created state for store the all sales info.
  const [sales, setSales] = useState([]);
  // Created state for store dropdown option values.(Customer Names)
  const [customerList, setCustomerList] = useState([]);
  // Created state for sote selected customer name.
  const [selectedCustomerName, setSelectedCustomerName] = useState([]);

  const handleCustomerSelection = (e) => {
    // Set selected customer name.
    setSelectedCustomerName(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // All sales info fetched  and saved to state.
      const db = fire.firestore();
      const data = await db.collection("sales").get();
      const dataArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSales(dataArray);
      // Dublicate items deleted for customer name dropdown options.
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
