import { useEffect, useState } from "react";
import { CustomerBill } from "../components/CustomerBill";
import fire from "../firebase";

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
    <>
      <div className="customer-info"></div>
      <select name="customerNames" onChange={handleCustomerSelection}>
        <option value="Choose a customer Name">Choose a customer Name</option>
        {customerList.map((customer, index) => (
          <option key={index}>{customer}</option>
        ))}
      </select>
      {sales.map((sale, index) => (
        <CustomerBill
          key={index}
          sale={sale}
          selectedCustomerName={selectedCustomerName}
        />
      ))}
    </>
  );
};

export default CustomerInfo;

/*  <>
          <div>{customer.customerName}</div>
          {customer?.installments?.map((installment, index) => (
            <input checked={installment} type="checkbox"></input>
          ))}
        </>  */
