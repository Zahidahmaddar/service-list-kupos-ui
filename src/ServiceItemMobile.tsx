import React from "react";
import { MobileServiceItemProps } from "./mobileTypes";
import ServiceItemPBMobile from "./ServivceItemPbMobile";

export default function ServiceItemMobile(props: MobileServiceItemProps) {
  return <ServiceItemPBMobile {...props} />;
}
