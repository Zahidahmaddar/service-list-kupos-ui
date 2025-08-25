import React from "react";
import { PaymentSideBarProps } from "./types";
import PaymentSideBarDesktop from "./PaymentSideBarDesktop";
import PaymentSideBarMobile from "./PaymentSideBarMobile";

export default function ResponsivePaymentSideBar(props: PaymentSideBarProps) {
  const { variant } = props;

  if (variant === "mobile") {
    return <PaymentSideBarMobile {...props} />;
  }

  return <PaymentSideBarDesktop {...props} />;
}
