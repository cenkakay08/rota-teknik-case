import { useState } from "react";
import fire from "../firebase";

export const CustomerBill = ({ sale, selectedCustomerName }) => {
  const [installmentStatus, setInstallmentStatus] = useState(sale.installments);

  const handleCheckBox = (e, index) => {
    const newInstallmentStatus = [...installmentStatus];
    newInstallmentStatus[index] = e.target.checked;
    setInstallmentStatus(newInstallmentStatus);
  };
  const handleUpdate = () => {
    const db = fire.firestore();
    db.collection("sales")
      .doc(sale.id)
      .set({ ...sale, installments: installmentStatus });
  };
  return (
    <>
      {sale.customerName == selectedCustomerName ? (
        <>
          <div>{sale.customerName}</div>
          {sale.installments.map((month, index) => {
            return (
              <input
                type="checkbox"
                key={index}
                onClick={(e) => handleCheckBox(e, index)}
                checked={installmentStatus[index]}
              ></input>
            );
          })}
          {sale.installments.length > 0 && (
            <button onClick={handleUpdate}>Taksitleri güncelle!</button>
          )}
        </>
      ) : null}
    </>
  );
};
