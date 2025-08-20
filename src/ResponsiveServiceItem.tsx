import React from "react";
import { MobileServiceItemProps } from "./mobileTypes";
import ServiceItemDesktop from "./ServiceItemDesktop";
import ServiceItemMobile from "./ServiceItemMobile";

export default function ResponsiveServiceItem(props: MobileServiceItemProps) {
  const { variant } = props;

  if (variant === "mobile") {
    return <ServiceItemMobile {...props} />;
  }

  return <ServiceItemDesktop {...props} />;
}
