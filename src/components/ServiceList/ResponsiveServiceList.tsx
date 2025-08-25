import React from "react";
import { ServiceListProps } from "./types";
import ServiceListDesktop from "./ServiceListDesktop";
import ServiceListMobile from "./ServiceListMobile";

export default function ResponsiveServiceList(props: ServiceListProps) {
  const { variant } = props;

  if (variant === "mobile") {
    return <ServiceListMobile {...props} />;
  }

  return <ServiceListDesktop {...props} />;
}
