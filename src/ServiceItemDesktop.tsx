import React from "react";
import ServiceItemPB from "./ServiceItemPb";
import { ServiceItemProps } from "./types";

// Desktop variant simply uses the current implementation
export default function ServiceItemDesktop(props: ServiceItemProps) {
  return <ServiceItemPB {...props} />;
}
