import React from "react";
import { ServiceItemProps } from "./types";
import LottiePlayer from "./assets/LottiePlayer";
import DateService from "./utils/DateService";
import ModalEventManager from "./utils/ModalEventManager";
import InternationalServicePopupBody from "./components/InternationalServicePopupBody";

const SEAT_EXCEPTIONS = ["Asiento mascota"];

function ServiceItemPB({
  serviceItem,
  onBookButtonPress,
  colors,
  metaData,
  children,
  busStage,
  serviceDetailsLoading,
  cityOrigin,
  cityDestination,
  translation,
  orignLabel,
  destinationLabel,
  t = (key: string) => key,
}: ServiceItemProps): React.ReactElement {
  const SvgAmenities = ({
    moreAnemities,
    name,
    color,
  }: {
    moreAnemities: boolean;
    name: string;
    color?: string;
  }) => {
    const amenityKey = name.toLowerCase().replace(/\s/g, "_");

    const getIconPath = () => {
      const amenityFileName = `${amenityKey}.png`;
      const imagePath = getAmenitiesImage(amenityFileName);

      if (!imagePath) {
        return `/public/images/amenities/${amenityKey}.svg`;
      }

      return imagePath;
    };

    const iconPath = getIconPath();

    return (
      <img
        src={iconPath}
        alt={name}
        style={{
          filter: color === "white" ? "brightness(0) invert(1)" : "",
        }}
        className={`object-contain ${
          moreAnemities ? "w-[20px] h-[20px]" : "w-[16px] h-[16px]"
        }`}
      />
    );
  };

  const getAmenitiesImage = (name: string): string => {
    switch (name) {
      case "air_condtion.png": {
        return serviceItem?.icons?.airConditionIcon;
      }
      case "baggage.png": {
        return serviceItem?.icons?.baggageIcon;
      }
      case "charging_plug.png": {
        return serviceItem?.icons?.chargingIcon;
      }
      case "coffee.png": {
        return serviceItem?.icons?.coffeeIcon;
      }
      case "food_new_icon.png": {
        return serviceItem?.icons?.foodIcon;
      }
      case "gaming.png": {
        return serviceItem?.icons?.gamingIcon;
      }
      case "handicap.png": {
        return serviceItem?.icons?.handicapIcon;
      }
      case "mobile_ticket.png": {
        return serviceItem?.icons?.mobileTicketIcon;
      }
      case "movie.png": {
        return serviceItem?.icons?.movieIcon;
      }
      case "restrooms.png": {
        return serviceItem?.icons?.restroomsIcon;
      }
      case "snacks_new.png": {
        return serviceItem?.icons?.snackIcon;
      }
      case "wifi.png": {
        return serviceItem?.icons?.wifiIcon;
      }
      case "cortina_divisoria.png": {
        return serviceItem?.icons?.cortinaIcon;
      }
      case "frazada.png": {
        return serviceItem?.icons?.frazaIcon;
      }
      default: {
        return "";
      }
    }
  };

  const getAmenityName = (rawAmenity: string): string => {
    switch (rawAmenity) {
      case "mobile ticket":
        return "Ticket móvil";
      case "charging plug":
        return "Cargador";
      case "wifi":
        return "WiFi";
      case "movie":
        return "Entretenimiento";
      case "baggage":
        return "Equipaje";
      case "Restrooms":
        return "Baños";
      case "air condtion":
        return "Aire acondicionado";
      case "snacks new":
        return "Snacks";
      case "coffee":
        return "Café";
      case "cortina divisoria":
        return "Cortina Divisoria";
      case "frazada":
        return "";
      default:
        return rawAmenity;
    }
  };

  const currency = (amount: number) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + formattedAmount;
  };

  const labelId =
    typeof serviceItem.boarding_stages === "string"
      ? serviceItem.boarding_stages.split("|")[0]
      : "";

  const showTopLabel =
    busStage &&
    busStage[labelId] &&
    busStage[labelId].split("|")[1] === "true" &&
    busStage[labelId].split("|")[0];

  const renderStages = (stageData: any) => {
    if (typeof stageData === "string") {
      return (
        <div className="flex flex-col space-y-1 text-justify gap-[4px]">
          {stageData.split(",").map((stageInfo: string, index: number) => {
            const parts = stageInfo.split("|");
            const id = parts[0];
            const time = parts[1];
            const label = parts[3] || ""; // Skip empty part [2]
            return (
              <div key={index}>
                {label} | {time}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };
  let isSoldOut = serviceItem.available_seats <= 0;

  const renderIcon = (iconKey: string, size: string = "14px") => {
    const iconValue = serviceItem.icons?.[iconKey];
    if (iconValue) {
      if (typeof iconValue === "string") {
        return (
          <img
            src={iconValue}
            alt={iconKey}
            className={`${`w-[${size}] h-[${size}]`} mr-[5px]`}
          />
        );
      }
    }
    return null;
  };

  const getSortedSeatTypes = () => {
    if (!serviceItem?.seat_types?.length) {
      return [{ label: "Salon cama", price: 0 }];
    }

    let seatTypesWithPrices = serviceItem.seat_types
      .filter((item) => getFilteredSeats(item))
      .map((val) => ({
        label: val?.label,
        price: val?.fare,
      }));

    seatTypesWithPrices.sort((a, b) => a.price - b.price);
    const premiumIndex = seatTypesWithPrices.findIndex(
      (item) => item.label === "Premium"
    );

    if (premiumIndex >= 3) {
      seatTypesWithPrices[2] = seatTypesWithPrices[premiumIndex];
    }

    seatTypesWithPrices = seatTypesWithPrices.slice(0, 2);

    return seatTypesWithPrices;
  };

  const getNumberOfSeats = () => {
    return serviceItem.seat_types.filter(
      (val) => !SEAT_EXCEPTIONS.includes(val.label)
    ).length;
  };

  const getSeatNames = () => {
    const sortedSeatTypes = getSortedSeatTypes();
    return sortedSeatTypes.map((val, key: number) =>
      SEAT_EXCEPTIONS.includes(val.label) ? null : (
        <span
          key={key}
          className={`flex items-center justify-between  text-[13.33px] ${
            isSoldOut ? "text-[#c0c0c0]" : ""
          }`}
        >
          {typeof val.label === "string" || typeof val.label === "number"
            ? val.label
            : null}
        </span>
      )
    );
  };

  const getSeatPrice = () => {
    const sortedSeatTypes = getSortedSeatTypes();
    return sortedSeatTypes.map((val, key: number) =>
      SEAT_EXCEPTIONS.includes(val.label) ? null : (
        <span
          key={key}
          className="flex items-center justify-between text-[13.33px]"
        >
          {typeof val.price === "string"
            ? currency(val.price)
            : typeof val.price === "number"
            ? currency(val.price)
            : null}
        </span>
      )
    );
  };

  const getFilteredSeats = (item) => {
    return item;
  };

  const checkMidnight = () => {
    if (
      cityOrigin?.label &&
      cityDestination?.label &&
      ((cityOrigin.label.toLowerCase().includes("argentina") &&
        !cityDestination.label.toLowerCase().includes("argentina")) ||
        (!cityOrigin.label.toLowerCase().includes("argentina") &&
          cityDestination.label.toLowerCase().includes("argentina")))
    ) {
      ModalEventManager.showPopup({
        modalIcon: serviceItem?.icons?.warningIcon,
        title: translation?.title,
        showPrimaryButton: false,
        primaryButtonText: translation?.continueButton,
        onSecondaryButtonClick: () => {
          onBookButtonPress && onBookButtonPress();
        },
        secondaryButtonText: translation?.okContinueButton,
        primaryButtonBgColor: colors?.kuposButtonColor,
        primaryButtonTextColor: colors?.primaryButtonTextColor,
        secondaryButtonBgColor: colors?.secondaryBgColor,
        secondaryButtonTextColor: colors?.secondaryTextColor,
        children: <InternationalServicePopupBody />,
      });
      return;
    }

    if (serviceItem.dep_validation_text) {
      ModalEventManager.showPopup({
        body: serviceItem.dep_validation_text,
        primaryButtonText: translation?.continueButton,
        secondaryButtonText: translation?.chooseAnotherTripButton,
        onPrimaryButtonClick: () => {
          onBookButtonPress && onBookButtonPress();
        },
        primaryButtonBgColor: colors?.kuposButtonColor,
        primaryButtonTextColor: colors?.primaryButtonTextColor,
        secondaryButtonBgColor: colors?.secondaryBgColor,
        secondaryButtonTextColor: colors?.secondaryTextColor,
      });
      return;
    }

    if (
      serviceItem.operator_service_name === "Classe Reale " &&
      cityOrigin.label.toLowerCase() === "santiago,chile" &&
      cityDestination.label.toLowerCase() === "portillo,chile"
    ) {
      ModalEventManager.showPopup({
        modalIcon: serviceItem?.icons?.warningIcon,
        title: translation?.title,
        primaryButtonText: translation?.okContinueButton,
        secondaryButtonText: translation?.chooseAnotherTripButton,
        onPrimaryButtonClick: () => {
          onBookButtonPress && onBookButtonPress();
        },
        showSecondaryButton: false,
        primaryButtonBgColor: colors?.kuposButtonColor,
        primaryButtonTextColor: colors?.primaryButtonTextColor,
        children: (
          <>
            <p className="mt-[5px] text-justify">
              {translation.classeNormalText}
              <span className="bold-text">
                &nbsp;{translation.classeBoldText}
              </span>
              {translation.classeNormalText1}
            </p>
            <p className="mt-[10px] text-justify">
              {translation.classeNormalText2}&nbsp;
              <span className="bold-text">
                &nbsp;{translation.classeBoldText1}
              </span>{" "}
              {translation.classeNormalText3}
            </p>
          </>
        ),
      });
      return;
    } else {
      onBookButtonPressHandler();
    }
  };

  const onBookButtonPressHandler = () => {
    onBookButtonPress();
  };

  return (
    <div
      className={`relative ${
        serviceItem.offer_text || serviceItem?.is_direct_trip
          ? "mb-[60px]"
          : "mb-[20px]"
      } ${
        serviceItem?.is_direct_trip ||
        serviceItem?.train_type_label === "Tren Express (Nuevo)" ||
        showTopLabel
          ? "mt-[30px]"
          : "mt-[20px]"
      }	`}
      //  ${
      //   serviceItem?.is_direct_trip ||
      //   serviceItem?.train_type_label === "Tren Express (Nuevo)" ||
      //   !showTopLabel
      //     ? "mb-[60px]"
      //     : ""
      // }
    >
      <div
        className={
          "bg-white rounded-[20px] shadow-service mb-[10px] mx-auto relative"
        }
      >
        <div className="p-[15px]">
          {/* Header with operator info and favorite */}
          <div className="flex justify-between items-center mb-[15px]">
            <div className="w-[120px] overflow-y-hidden">
              <img
                src={serviceItem.operator_details[0]}
                alt="service logo"
                className={`w-[120px] h-auto object-contain ${
                  isSoldOut ? "grayscale" : ""
                }`}
              />
            </div>
          </div>

          {/* <div className="grid grid-cols-[1.5fr_1fr_auto] gap-[3rem] sm:gap-[4rem] md:gap-[5rem] lg:gap-[6rem] xl:gap-[5rem] 2xl:gap-[7rem] text-[#464647]"> */}
          <div className="grid text-[#464647] w-full [grid-template-columns:minmax(0,1.4fr)_minmax(0,0.2fr)_minmax(0,1fr)_auto] gap-x-[7rem] min-[640px]:gap-x-[6rem] min-[768px]:gap-x-[4rem] min-[1024px]:gap-x-[4rem] min-[1280px]:gap-x-[4rem] min-[1380px]:gap-x-[5rem]">
            {/* DATE AND TIME */}
            <div className="min-h-[2.5rem] flex flex-col justify-between gap-[10px]">
              <div
                className={`flex items-center text-[13.33px] justify-between  ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                <div className="flex items-center bold-text capitalize group ">
                  {orignLabel ? (
                    <div className="w-[60px]">{orignLabel}</div>
                  ) : (
                    <div className="w-[18px] h-auto mr-[8px]">
                      <img
                        src={serviceItem.icons?.origin}
                        alt="origin"
                        className={`w-[18px] h-auto mr-[8px] ${
                          isSoldOut ? "grayscale" : ""
                        }`}
                      />
                    </div>
                  )}
                  <span className="cursor-pointer bold-text">
                    {DateService.getServiceItemDate(serviceItem.travel_date)}
                  </span>

                  {/* Boarding stage tooltip */}
                  {serviceItem.boarding_stages && (
                    <div
                      className="hidden group-hover:block absolute top-[29%] left-[35%] ml-2 text-white px-3 py-2 rounded-[10px] whitespace-normal z-10 shadow-service  "
                      style={{ backgroundColor: colors?.tooltipColor }}
                    >
                      <div
                        className="tooltip-arrow absolute top-2 -left-[7px] w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent"
                        style={{ borderRightColor: colors?.tooltipColor }}
                      ></div>
                      <div className="text-center text-[14px]">
                        {renderStages(serviceItem.boarding_stages)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mx-[8px]">•</div>
                <div className="font-[900] relative">
                  {DateService.formatTime(serviceItem.dep_time)}
                </div>
              </div>
              <div
                className={`flex items-center text-[13.33px] justify-between ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                <div className="flex items-center bold-text capitalize group ">
                  {destinationLabel ? (
                    <div className="w-[60px]">{destinationLabel}</div>
                  ) : (
                    <div className="w-[18px] h-auto mr-[8px]">
                      <img
                        src={serviceItem.icons?.destination}
                        className={`w-[18px] h-auto mr-[8px] ${
                          isSoldOut ? "grayscale" : ""
                        }`}
                      />
                    </div>
                  )}
                  <span className="cursor-pointer bold-text">
                    {DateService.getServiceItemDate(serviceItem.arrival_date)}
                  </span>

                  {/* Dropping stage tooltip */}
                  {serviceItem.dropoff_stages && (
                    <div
                      className={`hidden group-hover:block absolute top-[46%] left-[35%] ml-2 text-white px-3 py-2 rounded-[10px] whitespace-normal z-10 shadow-service`}
                      style={{ backgroundColor: colors?.tooltipColor }}
                    >
                      {/* Tooltip arrow */}
                      <div
                        className="tooltip-arrow absolute top-2 -left-[7px] w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent"
                        style={{ borderRightColor: colors?.tooltipColor }}
                      ></div>
                      <div className="text-center text-[14px]">
                        {renderStages(serviceItem.dropoff_stages)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mx-[8px]">•</div>
                <div className="font-[900]">
                  {DateService.formatTime(serviceItem.arr_time)}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "1px",
                height: "2.5rem",
                backgroundColor: "#ccc",
                margin: "auto",
              }}
            ></div>
            {/* SEATS */}
            <div className="content-center">
              <div
                className={`flex gap-[10px] text-[13.33px] justify-between min-h-[2.5rem] ${
                  getNumberOfSeats() < 3 ? "" : ""
                }`}
                style={getNumberOfSeats() < 2 ? { alignItems: "center" } : {}}
              >
                <div
                  className="flex flex-col justify-between"
                  // className={`flex flex-col ${
                  //   getNumberOfSeats() < 3 ? "justify-between" : ""
                  // }`}
                >
                  {getSeatNames()}
                </div>
                <div
                  className="flex flex-col justify-between"
                  // className={`flex flex-col ${
                  //   getNumberOfSeats() < 3 ? "justify-between" : ""
                  // }`}
                  style={{ color: isSoldOut ? "#c0c0c0" : colors.priceColor }}
                >
                  {getSeatPrice()}
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div>
              <button
                onClick={() => (!isSoldOut ? checkMidnight() : null)}
                disabled={serviceDetailsLoading}
                className={`w-full  ${
                  serviceDetailsLoading || isSoldOut ? "py-[6px]" : "py-[12px]"
                } text-[13.33px] font-bold text-white rounded-[10px] border-none px-[20px] flex items-center justify-center`}
                style={{
                  backgroundColor:
                    serviceDetailsLoading || isSoldOut
                      ? "lightgray"
                      : colors.kuposButtonColor,
                  cursor:
                    serviceDetailsLoading || isSoldOut
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <span className="min-w-[75px] flex justify-center items-center bold-text">
                  {isSoldOut ? renderIcon("soldOutIcon", "14px") : null}

                  {serviceDetailsLoading ? (
                    <span className="loader-circle"></span>
                  ) : !isSoldOut ? (
                    translation?.buyButton
                  ) : (
                    translation?.soldOutButton
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="flex justify-end mr-[11px]">
            {serviceItem?.available_seats < 10 &&
              serviceItem?.available_seats > 0 && (
                <div className="text-[12px] text-[red] mt-1 text-center">
                  ¡ Últimos Asientos!
                </div>
              )}
          </div>

          <div
            // className={`${
            //   serviceItem.is_change_ticket &&
            //   serviceItem.pet_seat_info &&
            //   serviceItem?.is_tracking_enabled &&
            //   Object.keys(serviceItem.pet_seat_info || {}).length > 0
            //     ? "grid grid-cols-[1.4fr_4.8fr] gap-[3.4rem] mt-[15px] text-[13px] items-center border-t border-[#eee] mt-[15px] pt-[12px]"
            //     : "grid grid-cols-[3.17fr_4.8fr] gap-[3rem] mt-[15px] text-[13px] items-center border-t border-[#eee] mt-[15px] pt-[12px]"
            // }`}
            className={`${"flex justify-between items-center mt-[15px] items-center border-t border-[#eee] mt-[15px] pt-[12px]"}`}
          >
            {/* Rating */}
            <div>
              <div className="flex items-center ">
                <div
                  className="flex items-center cursor-pointer "
                  style={{ color: isSoldOut ? "#c0c0c0" : "" }}
                >
                  <div className="flex items-center">
                    <div className="w-[18px] h-auto mr-[4px] relative">
                      <img
                        src={serviceItem.icons.rating}
                        alt="origin"
                        className={`w-[16px] h-[16px] mr-[4px] object-contain mb-[4px] ${
                          isSoldOut ? "grayscale" : ""
                        }`}
                        onMouseEnter={(e) => {
                          const tooltip = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (tooltip) tooltip.style.display = "block";
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (tooltip) tooltip.style.display = "none";
                        }}
                      />
                      <div
                        className="hidden group-hover:block absolute left-[80px] -bottom-[160px] z-20 mt-2 w-[280px] rounded-lg shadow-service-2 bg-white overflow-hidden  rounded-[14px] border-[2px]"
                        style={{
                          borderColor: colors.ratingBorderColor,
                          color: isSoldOut ? "#c0c0c0" : "",
                        }}
                      >
                        <div className="pt-[20px] text-center">
                          <div className="text-[12px] bold-text text-[#464647]">
                            PUNTUACIÓN
                          </div>
                          <div className="text-[12px] font-light text-[#464647]">
                            {serviceItem.operator_service_name}
                          </div>
                        </div>

                        {/* Rating categories */}
                        <div className="px-3 py-2 flex flex-col gap-[10px]">
                          {[
                            { key: "1", label: "Calidad del bus" },
                            { key: "2", label: "Puntualidad" },
                            {
                              key: "3",
                              label: "Calidad del servicio",
                            },
                            {
                              key: "4",
                              label: "Recomendación del servicio",
                            },
                          ].map((rating, index, array) => {
                            const isLast = index === array.length - 1;
                            // Use operator_details[6] for rating values
                            const ratingData =
                              serviceItem.operator_details[6] || {};
                            const value = ratingData?.[rating.key] || 0;
                            return (
                              <div
                                key={rating.key}
                                className={`flex items-center ${
                                  isLast ? "mb-2" : ""
                                }`}
                              >
                                <div className="relative w-[3rem] h-[3rem]">
                                  <div className="absolute inset-0 w-full h-full rounded-full">
                                    <div className="w-full h-full rounded-full border-[2px] border-[lightgray]"></div>
                                  </div>

                                  {/* Colored progress arc based on value */}
                                  <div className="absolute inset-0 w-full h-full">
                                    <svg
                                      className="w-full h-full"
                                      viewBox="0 0 100 100"
                                    >
                                      <circle
                                        cx="50"
                                        cy="50"
                                        r="48"
                                        fill="none"
                                        strokeWidth="4"
                                        stroke={
                                          value >= 4
                                            ? "#00A650"
                                            : colors.ratingBorderColor
                                        }
                                        strokeDasharray={
                                          value > 0
                                            ? `${value * 75.4} 301.6`
                                            : "150.8 301.6"
                                        }
                                        strokeDashoffset="75.4"
                                        transform="rotate(-90, 50, 50)"
                                      />
                                    </svg>
                                  </div>

                                  {/* Center with value */}
                                  <div className="absolute inset-0 flex items-center justify-center top-[40%] left-[36%]">
                                    <span className="text-[#464647] font-medium text-[12px] ">
                                      {value.toFixed(1)}
                                    </span>
                                  </div>
                                </div>

                                <span className="text-[#464647] text-[13.33px] ml-[10px]">
                                  {rating.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Footer */}
                        <div
                          className="px-1 py-2 text-center text-[12px] text-[#ff8f45]"
                          style={{ backgroundColor: colors.ratingBottomColor }}
                        >
                          Esta puntuación se obtuvo de las opiniones de{" "}
                          {serviceItem.operator_details[5] || 0} usuarios.
                        </div>
                      </div>
                    </div>
                    <span className="text-[#464647] bold-text text-[13.33px]">
                      {typeof serviceItem.operator_details[1] === "number"
                        ? serviceItem.operator_details[1].toFixed(1)
                        : serviceItem.operator_details[1]}
                    </span>
                  </div>
                  <span className="ml-[10px] text-[#464647] text-[13.33px]">
                    {serviceItem.operator_details[2]}
                  </span>
                </div>

                {/* Rating tooltip */}
              </div>
            </div>

            {/* <div className="flex justify-between items-center gap-[10px]"> */}
            {/* Duration */}
            <div className="flex items-baseline relative text-[#464647]">
              {/* {renderIcon("duration", "14px")} */}
              <div
                className={`w-[18px] h-auto mr-[4px] ${
                  isSoldOut ? "grayscale" : ""
                }`}
              >
                {renderIcon("hours", "14px")}
              </div>
              <div
                className={`cursor-default group text-[13.33px] ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                {serviceItem.duration} {translation.hours}
                <div
                  className=" hidden group-hover:block absolute top-[24px] left-1/2 -translate-x-1/2 text-white p-3 rounded-[14px] whitespace-normal z-10 mt-2.5 w-[230px] text-center break-normal shadow-service"
                  style={{ backgroundColor: colors.tooltipColor }}
                >
                  {/* Tooltip arrow */}
                  <div
                    className="tooltip-arrow absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent"
                    style={{ borderBottomColor: colors.tooltipColor }}
                  ></div>
                  Duración estimada del viaje
                </div>
              </div>
            </div>

            {serviceItem.pet_seat_info &&
            Object.keys(serviceItem.pet_seat_info).length > 0 ? (
              <div className="flex items-center">
                <div className={`relative group cursor-default `}>
                  <div className="flex items-center">
                    <div className={`mr-[5px] ${isSoldOut ? "grayscale" : ""}`}>
                      <LottiePlayer
                        animationData={serviceItem.icons.petFriendlyAnim}
                        width="20px"
                        height="20px"
                      />
                    </div>
                    <div className="h-auto mr-[4px] text-[13px] text-[#464647]">
                      <span>{translation?.petFriendly}</span>
                    </div>
                  </div>
                  <div
                    className=" hidden group-hover:block absolute top-[24px] left-1/2 -translate-x-1/2 text-white p-3 rounded-[14px] whitespace-normal z-10 mt-2.5 w-[230px] text-center break-normal shadow-service"
                    style={{ backgroundColor: colors?.tooltipColor }}
                  >
                    <div
                      className="tooltip-arrow absolute text-[13.33px] -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent"
                      style={{ borderBottomColor: colors?.tooltipColor }}
                    ></div>
                    Este servicio incluye asientos para mascotas.
                  </div>
                </div>
              </div>
            ) : null}

            {/* Flexible ticket */}
            {serviceItem.is_change_ticket && (
              <div className="flex items-center">
                <div className="relative group cursor-default">
                  <div className="flex items-center">
                    <div className={`mr-[5px] ${isSoldOut ? "grayscale" : ""}`}>
                      <LottiePlayer
                        animationData={serviceItem.icons.flexibleAnim}
                        width="20px"
                        height="20px"
                      />
                    </div>
                    <div className="h-auto mr-[4px] text-[13px] text-[#464647]">
                      <span>{translation?.flexible}</span>
                    </div>
                  </div>
                  <div
                    className="hidden group-hover:block absolute top-[24px] left-1/2 -translate-x-1/2 text-white p-3 rounded-[14px] whitespace-normal z-10 mt-2.5 w-[230px] text-center break-normal shadow-service text-[13.33px]"
                    style={{ backgroundColor: colors.tooltipColor }}
                  >
                    {/* Tooltip arrow */}
                    <div
                      className="tooltip-arrow absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent "
                      style={{ borderBottomColor: colors.tooltipColor }}
                    ></div>
                    Esta empresa permite cambios sin costo hasta (
                    {serviceItem?.change_ticket_hours ?? 6}) horas antes del
                    viaje.
                  </div>
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="flex items-center">
              <div>
                {serviceItem?.is_tracking_enabled && (
                  <div className="flex items-center mr-[10px]">
                    <div
                      className={`h-auto mr-[4px] text-[13px] text-[#464647] ${
                        isSoldOut ? "grayscale" : ""
                      }`}
                    >
                      <LottiePlayer
                        animationData={serviceItem.icons.locationAnim}
                        width="20px"
                        height="20px"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                {metaData && serviceItem.operator_details[4] && (
                  <div className="flex items-center gap-[6px]">
                    {/* Show first three amenities */}
                    {(serviceItem.operator_details[3]?.includes("18")
                      ? [...serviceItem.operator_details[4], "18"]
                      : serviceItem.operator_details[4]
                    ).map((val, key) => {
                      return (key < 3 &&
                        metaData?.amenities[val]
                          ?.split(".")[0]
                          ?.toUpperCase() !== "WATER") ||
                        val === "18" ? (
                        <div key={key} className="relative mr-2 cursor-pointer">
                          <div className="group">
                            <div className={`${isSoldOut ? "grayscale" : ""}`}>
                              <SvgAmenities
                                moreAnemities={false}
                                name={metaData.amenities[val]
                                  ?.split(".")[0]
                                  .toLowerCase()}
                              />
                            </div>
                            <div
                              className="hidden group-hover:block absolute top-[24px] left-1/2 -translate-x-1/2 text-white p-3 rounded-[14px] whitespace-nowrap z-10 mt-2.5 text-center shadow-service text-[13.33px]"
                              style={{ backgroundColor: colors.tooltipColor }}
                            >
                              {/* Tooltip arrow */}
                              <div
                                className="tooltip-arrow absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent"
                                style={{
                                  borderBottomColor: colors.tooltipColor,
                                }}
                              ></div>
                              {getAmenityName(
                                metaData.amenities[val]
                                  ?.split(".")[0]
                                  .split("_")
                                  .join(" ")
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}

                    {/* Plus icon for more amenities */}
                    {serviceItem.operator_details[4]?.length > 3 && (
                      <div className="relative ml-1 cursor-pointer">
                        <div className="w-[16px] h-[16px] bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold ml-[5px] group">
                          <img
                            src={
                              serviceItem.icons?.plus ||
                              "/images/icons/amenities/icon_plus.svg"
                            }
                            className="w-[16px] h-[16px]"
                            alt="plus"
                          />
                          <div className="hidden group-hover:block absolute -top-[13px] left-[40px] z-20 pl-[10px]">
                            <div
                              className="flex flex-col gap-[10px] p-3 rounded-[8px] shadow-md animate-fadeIn relative"
                              style={{ backgroundColor: colors.tooltipColor }}
                            >
                              {/* Additional amenities */}
                              {metaData &&
                                serviceItem.operator_details[4]?.map(
                                  (val, key) => {
                                    const exceptions = [
                                      1, 2, 5, 7, 8, 9, 12, 13, 14, 15,
                                    ];
                                    return exceptions.includes(
                                      key
                                    ) ? null : key >= 3 &&
                                      metaData.amenities[val]
                                        ?.split(".")[0]
                                        ?.toUpperCase() !== "WATER" ? (
                                      <div
                                        key={key}
                                        className="flex items-center gap-[5px] whitespace-nowrap text-[13.33px]"
                                      >
                                        <div
                                          className={`${
                                            isSoldOut ? "grayscale" : ""
                                          }`}
                                        >
                                          <SvgAmenities
                                            moreAnemities={true}
                                            name={metaData.amenities[val]
                                              ?.split(".")[0]
                                              ?.toUpperCase()}
                                            color="white"
                                          />
                                        </div>
                                        <span className="text-white text-xs">
                                          {getAmenityName(
                                            metaData.amenities[val]
                                              ?.split(".")[0]
                                              ?.split("_")
                                              ?.join(" ")
                                          )}
                                        </span>
                                      </div>
                                    ) : null;
                                  }
                                )}
                              {/* Tooltip arrow */}
                              <div
                                className="tooltip-arrow absolute -left-[6px] top-[15px] w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent "
                                style={{
                                  borderRightColor: colors.tooltipColor,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {children}
      {/* Bottom discount banner */}
      {serviceItem?.offer_text && (
        <div
          className={`  text-white p-[10px_15px] text-left w-full flex items-center absolute -bottom-[36px] pt-[50px] -z-10 rounded-b-[14px] text-[14px]`}
          style={{ backgroundColor: isSoldOut ? "" : colors?.bottomStripColor }}
        >
          <LottiePlayer
            animationData={serviceItem.icons.promoAnim}
            width="18px"
            height="18px"
          />
          <span className="ml-[10px]">{serviceItem?.offer_text}</span>
        </div>
      )}

      <div className="absolute -top-[17px] left-0  w-full flex items-center justify-end gap-[12px] pr-[20px] z-10 ">
        {showTopLabel && (
          <div
            className={`flex items-center gap-[10px] py-[8px] px-[20px] rounded-[38px] text-[13.33px]  z-20 ${
              isSoldOut ? "bg-[#ddd]" : ``
            }`}
            style={{ backgroundColor: !isSoldOut && colors.ratingBottomColor }}
          >
            <div className={isSoldOut ? "grayscale" : ""}>
              <LottiePlayer
                animationData={serviceItem.icons.priorityStageAnim}
                width="20px"
                height="20px"
              />
            </div>
            <div
              className={
                isSoldOut ? "text-white" : `text-[${colors.topLabelColor}]`
              }
            >
              {showTopLabel}
            </div>
          </div>
        )}
        {serviceItem?.is_direct_trip && (
          <div
            className={`flex items-center gap-[10px] py-[8px] text-white px-[20px] rounded-[38px] text-[13.33px] z-20 ${
              isSoldOut ? "bg-[#ddd]" : `bg-[${colors.tooltipColor}]`
            }`}
          >
            <LottiePlayer
              animationData={serviceItem.icons.directoAnim}
              width="20px"
              height="20px"
            />
            <div>{translation?.directService}</div>
          </div>
        )}
        {serviceItem?.train_type_label === "Tren Express (Nuevo)" && (
          <div
            className={`flex items-center gap-[10px] py-[8px] text-white px-[20px] rounded-[38px] text-[13.33px] z-20 ${
              isSoldOut ? "bg-[#ddd]" : `bg-[${colors.tooltipColor}]`
            }`}
          >
            <LottiePlayer
              animationData={serviceItem.icons.directoAnim}
              width="20px"
              height="20px"
            />
            <div>{"Tren Express"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceItemPB;
