import React from "react";
import ResponsiveServiceItem from "./components/ServiceItem/ResponsiveServiceItem";
import { MobileServiceItemProps } from "./components/ServiceItem/mobileTypes";
import { ResponsivePaymentSideBar } from "./components/PaymentSideBar";
import { ResponsiveServiceList } from "./components/ServiceList";
import { PaymentSideBarProps } from "./components/PaymentSideBar/types";
import { ServiceListProps } from "./components/ServiceList/types";

interface KuposUIComponentProps {
  typeOfComponent: "serviceitem" | "paymentsidebar" | "servicelist";
  variant?: "mobile" | "desktop";

  // Original ServiceItem props
  serviceItem?: any;
  onBookButtonPress?: () => void;
  colors?: any;
  metaData?: any;
  children?: React.ReactNode;
  busStage?: any;
  serviceDetailsLoading?: boolean;
  cityOrigin?: any;
  cityDestination?: any;
  translation?: any;
  orignLabel?: string;
  destinationLabel?: string;
  t?: (key: string) => string;

  // New ServiceItem props
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
  rating?: number;
  available?: boolean;
  featured?: boolean;
  duration?: string;
  location?: string;
  provider?: {
    name: string;
    imageUrl?: string;
    rating?: number;
  };
  onViewDetails?: () => void;

  // PaymentSideBar props
  orderSummary?: {
    subtotal: number;
    taxes: number;
    discount: number;
    total: number;
  };
  paymentMethods?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
  };
  orderDetails?: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  onPaymentMethodSelect?: (id: string) => void;
  onPayButtonClick?: () => void;

  // ServiceList props
  services?: Array<{
    id: string;
    name: string;
    description?: string;
    price?: number;
    currency?: string;
    imageUrl?: string;
    rating?: number;
    available?: boolean;
    featured?: boolean;
  }>;
  onServiceSelect?: (serviceId: string) => void;
  onServiceView?: (serviceId: string) => void;
  showFilters?: boolean;
  filters?: {
    categories?: string[];
    priceRange?: {
      min: number;
      max: number;
    };
    sortBy?: "price" | "rating" | "name";
    sortOrder?: "asc" | "desc";
  };
  onFilterChange?: (filters: any) => void;
}

// Using imported ResponsivePaymentSideBar component instead

export default function KuposUIComponent(
  props: KuposUIComponentProps
): React.ReactElement {
  const { typeOfComponent, ...restProps } = props;

  switch (typeOfComponent.toLowerCase()) {
    case "serviceitem":
      return (
        <ResponsiveServiceItem {...(restProps as MobileServiceItemProps)} />
      );

    case "paymentsidebar": {
      const { orderDetails, ...otherProps } = restProps;

      // Create a properly formatted PaymentSideBarProps object
      const paymentProps: PaymentSideBarProps = {
        ...otherProps,
        // If orderDetails exists, convert it to the expected format
        ...(orderDetails && {
          orderDetails: {
            items: orderDetails.map((item: any) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            subtotal: restProps.orderSummary?.subtotal || 0,
            tax: restProps.orderSummary?.taxes || 0,
            discount: restProps.orderSummary?.discount || 0,
            total: restProps.orderSummary?.total || 0,
          },
        }),
      };

      return <ResponsivePaymentSideBar {...paymentProps} />;
    }

    case "servicelist":
      return (
        <ResponsiveServiceList
          {...(restProps as unknown as ServiceListProps)}
        />
      );

    default:
      return (
        <div className="error-message">
          Invalid component type: {typeOfComponent}. Please use one of:
          "serviceitem", "paymentsidebar", or "servicelist".
        </div>
      );
  }
}
