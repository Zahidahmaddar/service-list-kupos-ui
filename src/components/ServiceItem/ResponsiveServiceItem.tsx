import React from "react";
import { ServiceItemProps } from "./types";
import ServiceItemDesktop from "../ServiceItem/ServiceItemDesktop";
import ServiceItemMobile from "../ServiceItem/ServiceItemMobile";

export default function ResponsiveServiceItem(props: ServiceItemProps) {
  const { variant } = props;

  if (variant === "mobile") {
    return <ServiceItemMobile {...props} />;
  }

  return <ServiceItemDesktop {...props} />;
}
