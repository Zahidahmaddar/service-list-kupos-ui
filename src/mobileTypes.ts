import React from "react";

// Define types for ServiceItemPB component
export interface MobileServiceItemProps {
  busStage?: Record<string, string>;
  amenitiesData?: any;
  serviceItem: {
    id: string;
    is_transpordo: boolean;
    operator_details: [
      string,
      string | number,
      string,
      string | string[],
      string[],
      number?,
      Record<string, number>?,
      boolean?,
      number?,
      boolean?,
    ]; // [logo, rating, name, category, amenities, unknown, ratingData, unknown, unknown, unknown]
    travel_date: string;
    arrival_date: string;
    dep_time: string;
    arr_time: string;
    available_seats: number;
    busstages?: Record<string, string>;
    seat_types: Array<{
      label: string;
      fare: number;
    }>;
    boarding_stages?:
      | Array<{
          label: string;
          time: string;
        }>
      | {
          label: string;
          time: string;
        }
      | string;
    dropoff_stages?:
      | Array<{
          label: string;
          time: string;
        }>
      | {
          label: string;
          time: string;
        };
    pet_seat_info?: Record<string, any>;
    is_change_ticket?: boolean;
    change_ticket_hours?: number;
    duration?: number;
    train_type_label?: string;
    offer_text?: string;
    is_direct_trip?: boolean;
    is_train_type?: boolean;
    operator_service_name?: string;
    dep_validation_text?: string;
    metaData?: {};
    is_tracking_enabled?: boolean;
    show_top_label?: boolean;
    lottie?: {
      location?: string;
      flexible?: string;
    };
    amenities?: Array<{
      icon: string;
      label: string;
    }>;
    rating_details?: {
      bus_quality: number;
      punctuality: number;
      service_quality: number;
      service_recommendation: number;
      total_reviews: number;
    };
    icons?: {
      origin?: string;
      destination?: string;
      rating?: string;
      duration?: string;
      hours?: string;
      flexibleAnim?: string;
      locationAnim?: string;
      announcement?: string;
      directo?: string;
      directoAnim?: string;
      petFriendlyAnim?: string;
      priorityStageAnim?: string;
      promoAnim?: string;
      priority?: string;
      changeTicket?: string;
      plus?: string;
      petSeat?: string;
      warningIcon?: string;
      soldOutIcon?: string;
      airConditionIcon?: string;
      baggageIcon?: string;
      chargingIcon?: string;
      coffeeIcon?: string;
      foodIcon?: string;
      gamingIcon?: string;
      handicapIcon?: string;
      mobileTicketIcon?: string;
      movieIcon?: string;
      restroomsIcon?: string;
      snackIcon?: string;
      wifiIcon?: string;
      cortinaIcon?: string;
      frazaIcon?: string;
      airportIcon?: string;
      [key: string]: string | Record<string, string | undefined> | undefined;
    };
    useLottieFor?: string[];
  };
  onBookButtonPress?: () => void;
  terminals?: any[];
  showDropdown?: boolean;
  setShowDropdown?: (value: boolean) => void;
  setAmenetiesAtomValue: (
    value:
      | {
          service: MobileServiceItemProps["serviceItem"];
          showTopLabel: string | boolean;
        }
      | null
      | ((curr:
          | {
              service: MobileServiceItemProps["serviceItem"];
              showTopLabel: string | boolean;
            }
          | null) =>
          | {
              service: MobileServiceItemProps["serviceItem"];
              showTopLabel: string | boolean;
            }
          | null)
  ) => void;
  hours?: number;
  change_ticket_hours?: number;
  colors: {
    kuposButtonColor?: string;
    topLabelColor?: string;
    tooltipColor?: string;
    ratingBorderColor?: string;
    ratingBottomColor?: string;
    priceColor?: string;
    secondaryBgColor?: string;
    secondaryTextColor?: string;
    primaryButtonTextColor?: string;
    bottomStripColor?: string;
  };

  orignLabel?: string;
  destinationLabel?: string;
  variant?: "desktop" | "mobile" | "auto";
}
