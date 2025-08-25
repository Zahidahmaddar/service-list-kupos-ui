import React from "react";
import { PaymentSideBarProps } from "./types";

const PaymentSideBarMobile: React.FC<PaymentSideBarProps> = (props) => {
  const {
    amount = 0,
    currency = "$",
    paymentMethods = [],
    customerDetails,
    onPaymentComplete,
    onPaymentError,
    colors = {},
    showSummary = true,
    orderDetails,
  } = props;

  const handlePayment = () => {
    try {
      // Payment processing logic would go here
      onPaymentComplete && onPaymentComplete("payment-123");
    } catch (error) {
      onPaymentError && onPaymentError(error);
    }
  };

  return (
    <div
      className="payment-sidebar-mobile"
      style={{
        backgroundColor: colors.backgroundColor || "#ffffff",
        color: colors.textColor || "#333333",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <h2 
        style={{ 
          marginBottom: "15px", 
          color: colors.primaryColor || "#333",
          fontSize: "18px"
        }}
      >
        Payment Details
      </h2>

      {showSummary && orderDetails && (
        <div className="order-summary" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>Order Summary</h3>
          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
            {orderDetails.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  fontSize: "14px"
                }}
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  {currency}
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "8px",
              marginTop: "8px",
              fontSize: "14px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span>Subtotal</span>
              <span>
                {currency}
                {orderDetails.subtotal.toFixed(2)}
              </span>
            </div>
            {orderDetails.tax !== undefined && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span>Tax</span>
                <span>
                  {currency}
                  {orderDetails.tax.toFixed(2)}
                </span>
              </div>
            )}
            {orderDetails.discount !== undefined && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span>Discount</span>
                <span>
                  -{currency}
                  {orderDetails.discount.toFixed(2)}
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                marginTop: "8px",
                fontSize: "16px"
              }}
            >
              <span>Total</span>
              <span>
                {currency}
                {orderDetails.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="payment-methods" style={{ marginBottom: "15px" }}>
        <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>Payment Methods</h3>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  marginBottom: "6px",
                  border: `1px solid ${method.isSelected ? colors.primaryColor || "#007bff" : "#ddd"}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: method.isSelected ? "#f8f9fa" : "transparent",
                }}
              >
                {method.icon && (
                  <img
                    src={method.icon}
                    alt={method.name}
                    style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>{method.name}</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "14px" }}>No payment methods available</p>
          )}
        </div>
      </div>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: colors.buttonColor || "#007bff",
          color: colors.buttonTextColor || "#ffffff",
          padding: "10px 16px",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Pay {currency}
        {amount.toFixed(2)}
      </button>
    </div>
  );
};

export default PaymentSideBarMobile;
