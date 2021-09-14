import { useState } from "react";
import fire from "../firebase";

const SaleForm = (props) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCashGiven, setCustomerCashGiven] = useState(0);
  const [customerInstallmentQuantity, setCustomerInstallmentQuantity] =
    useState("");

  const handleFormUpload = () => {
    let montlyInstallmentAmount =
      (props.selledProduct.productPrice - customerCashGiven) /
      customerInstallmentQuantity;
    const db = fire.firestore();
    db.collection("sales").add({
      customerName: customerName,
      customerAddress: customerAddress,
      cashGiven: Number(customerCashGiven),
      installments: Array.from(
        { length: customerInstallmentQuantity },
        (i) => (i = false)
      ),
      installmentAmount: montlyInstallmentAmount,
      startOfInstallmentDate:
        (new Date().getMonth() + 2).toString() +
        "/" +
        new Date().getFullYear().toString(),
    });
  };

  return (
    <>
      <div>
        <input
          value={customerName || ""}
          onChange={(e) => setCustomerName(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          value={customerAddress || ""}
          onChange={(e) => setCustomerAddress(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          defaultValue={0}
          type="number"
          min="0"
          onKeyUp={(e) => {
            if (e.target.value > props.selledProduct.productPrice) {
              e.target.value = props.selledProduct.productPrice;
            }
          }}
          onChange={(e) => setCustomerCashGiven(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          defaultValue={0}
          type="number"
          min="0"
          onChange={(e) => setCustomerInstallmentQuantity(e.target.value)}
        ></input>
      </div>
      <div>{props.selledProduct?.productBrand}</div>
      <button onClick={handleFormUpload}>Satışı Tamamla</button>
    </>
  );
};

export default SaleForm;
