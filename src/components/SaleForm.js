import { useState } from "react";
import fire from "../firebase";

const SaleForm = (props) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCashGiven, setCustomerCashGiven] = useState(0);
  const [customerInstallmentQuantity, setCustomerInstallmentQuantity] =
    useState(0);

  const handleFormUpload = () => {
    let montlyInstallmentAmount =
      (props.totalPrice - customerCashGiven) / customerInstallmentQuantity;
    const db = fire.firestore();
    db.collection("sales").add({
      customerName: customerName,
      customerAddress: customerAddress,
      selledProducts: props.selledProducts,
      cashGiven: Number(customerCashGiven),
      installments: Array.from(
        { length: customerInstallmentQuantity },
        (i) => (i = false)
      ),
      installmentAmount: montlyInstallmentAmount,
      startOfInstallmentDate:
        new Date().getDate().toString() +
        "/" +
        (new Date().getMonth() + 1).toString() +
        "/" +
        new Date().getFullYear().toString(),
    });
  };

  return (
    <div className="form-container">
      <div className="customer-name-container">
        <div>Müşteri Adı:</div>
        <input
          className="form-inputs"
          value={customerName || ""}
          onChange={(e) => setCustomerName(e.target.value)}
        ></input>
      </div>
      <div className="customer-adress-container">
        <div>Müşteri Adresi:</div>
        <textarea
          className="form-inputs"
          value={customerAddress || ""}
          onChange={(e) => setCustomerAddress(e.target.value)}
        ></textarea>
      </div>
      <div className="customer-money-container">
        <div>Müşteri Peşinat:</div>
        <input
          className="form-inputs"
          defaultValue={0}
          type="number"
          min="0"
          onKeyUp={(e) => {
            if (e.target.value > props.totalPrice) {
              e.target.value = props.totalPrice;
            }
          }}
          onChange={(e) => setCustomerCashGiven(e.target.value)}
        ></input>
      </div>
      <div className="customer-installment-container">
        <div>Taksit sayısı:</div>
        <input
          className="form-inputs"
          defaultValue={0}
          type="number"
          min="0"
          onChange={(e) => setCustomerInstallmentQuantity(e.target.value)}
        ></input>
      </div>
      <div className="finish-sell-button-container">
        <button onClick={handleFormUpload}>Satışı Tamamla</button>
      </div>
    </div>
  );
};

export default SaleForm;
