import { useState } from "react";
import fire from "../firebase";
import moment from "moment";

export const CustomerBill = ({ sale, selectedCustomerName }) => {
  // Installments array that coming from database, saved to state.
  const [installmentStatus, setInstallmentStatus] = useState(sale.installments);
  // Created variable for store first month of installment.
  // Moment js library used for manipulate the date.
  const firstDateofInstallment = moment(
    sale.startOfInstallmentDate,
    "DD-MM-YYYY"
  );

  const handleCheckBox = (e, index) => {
    // After checkbox event triggered, installment array updated.
    const newInstallmentStatus = [...installmentStatus];
    newInstallmentStatus[index] = e.target.checked;
    setInstallmentStatus(newInstallmentStatus);
  };
  const handleUpdate = () => {
    // After clicked the update installment button.
    // Updated installment array updated to the database.
    const db = fire.firestore();
    db.collection("sales")
      .doc(sale.id)
      .set({ ...sale, installments: installmentStatus });
    // Alert showed after button click.
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
          <div id="sales-customer-cash-given-constainer">
            <h5>Verilen Peşinat</h5>
            <span>{sale.cashGiven} TL</span>
          </div>
          <div className="sales-product-container">
            <h5 className="sales-product-title">Satılan Ürünler</h5>
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
            <h5 className="sales-installments-title">Taksit Durumu</h5>
            <div className="sales-installments-sub-container">
              {sale.installments.map((month, index) => {
                return (
                  <div
                    key={index}
                    className="sales-installments-month-status-container"
                  >
                    <div className="sales-installment-date">
                      {
                        /* Added one month according to installment array length and substring to to show only month and year. */
                        firstDateofInstallment
                          .add(1, "M")
                          .format("DD-MM-YYYY")
                          .substring(3)
                      }
                    </div>
                    <input
                      className="form-check-input"
                      id="sales-installments-checkbox"
                      type="checkbox"
                      key={index}
                      onChange={(e) => handleCheckBox(e, index)}
                      checked={installmentStatus[index]}
                    ></input>
                    <div>{sale.installmentAmount.toFixed(2)}TL</div>
                  </div>
                );
              })}
            </div>
            {sale.installments.length > 0 && (
              <button
                className="btn btn-danger"
                id="sales-installments-update-button"
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
