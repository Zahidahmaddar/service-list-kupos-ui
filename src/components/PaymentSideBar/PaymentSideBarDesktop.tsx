import React from "react";
import { PaymentSideBarProps } from "./types";

const PaymentSideBarDesktop: React.FC<PaymentSideBarProps> = (props) => {
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
      className="payment-sidebar-desktop"
      style={{
        backgroundColor: colors.backgroundColor || "#ffffff",
        color: colors.textColor || "#333333",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: colors.primaryColor || "#333" }}>
        Payment Details
      </h2>

      {showSummary && orderDetails && (
        <div className="order-summary" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>Order Summary</h3>
          {orderDetails.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
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
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
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
                  marginBottom: "5px",
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
                  marginBottom: "5px",
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
                marginTop: "10px",
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

      <div className="payment-methods" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>Payment Methods</h3>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
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
                  style={{ width: "24px", height: "24px", marginRight: "10px" }}
                />
              )}
              <span>{method.name}</span>
            </div>
          ))
        ) : (
          <p>No payment methods available</p>
        )}
      </div>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: colors.buttonColor || "#007bff",
          color: colors.buttonTextColor || "#ffffff",
          padding: "12px 20px",
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

export default PaymentSideBarDesktop;
