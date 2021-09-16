import { useState } from "react";
import fire from "../firebase";
import moment from "moment";

export const CustomerBill = ({ sale, selectedCustomerName }) => {
  const [installmentStatus, setInstallmentStatus] = useState(sale.installments);
  const firstDateofInstallment = moment(
    sale.startOfInstallmentDate,
    "DD-MM-YYYY"
  );

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
    alert("Taksitler Güncellendi.");
  };
  return (
    <>
      {sale.customerName === selectedCustomerName ? (
        <div className="sales-container">
          <div className="sales-customer-name-container">
            <h4>Müşteri Adı</h4>
            <span>{sale.customerName}</span>
          </div>
          <div className="sales-product-container">
            <h4 className="sales-product-title">Satılan Ürünler</h4>
            {sale.selledProducts.map((product, index) => {
              return (
                <div key={index}>
                  <span>{product.productType} - </span>
                  <span>{product.productBrand} - </span>
                  <span>{product.productModel} - </span>
                  <span>{product.productPrice} TL </span>
                </div>
              );
            })}
          </div>
          <div className="sales-installments-container">
            <h4 className="sales-installments-title">Taksit Durumu</h4>
            <div className="sales-installments-sub-container">
              {sale.installments.map((month, index) => {
                return (
                  <div
                    key={index}
                    className="sales-installments-month-status-container"
                  >
                    <div className="sales-installment-date">
                      {firstDateofInstallment
                        .add(1, "M")
                        .format("DD-MM-YYYY")
                        .substring(3)}
                    </div>
                    <input
                      className="sales-installments-checkbox"
                      type="checkbox"
                      key={index}
                      onChange={(e) => handleCheckBox(e, index)}
                      checked={installmentStatus[index]}
                    ></input>
                    <div>{sale.installmentAmount.toFixed(2)} TL</div>
                  </div>
                );
              })}
            </div>
            {sale.installments.length > 0 && (
              <button
                className="sales-installments-update-button"
                onClick={handleUpdate}
              >
                Taksitleri güncelle!
              </button>
            )}
            <hr className="line-end-sale"></hr>
          </div>
        </div>
      ) : null}
    </>
  );
};
