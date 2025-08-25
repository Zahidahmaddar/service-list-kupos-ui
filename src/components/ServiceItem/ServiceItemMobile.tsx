import React from "react";
import LottiePlayer from "../../assets/LottiePlayer";
import DateService from "../../utils/DateService";
import { MobileServiceItemProps } from "./mobileTypes";

const SEAT_EXCEPTIONS = ["Asiento mascota"];

const exceptions = [
  "gy",
  ".gy",
  "GY",
  ".GY",
  "Gy",
  ".Gy",
  "BLANCO",
  "blanco",
  "asiento_mascota",
];

function ServiceItemMobile({
  serviceItem,
  onBookButtonPress,
  colors,
  busStage,
  orignLabel,
  destinationLabel,
  amenitiesData,
  setShowDropdown,
  showDropdown,
  setAmenetiesAtomValue,
}: MobileServiceItemProps): React.ReactElement {
  const isPetSeat = (Object.keys(serviceItem?.pet_seat_info) || []).length > 0;
  let isSoldOut = serviceItem.available_seats <= 0;

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

  const getServiceStars = (serviceItem) => {
    try {
      return serviceItem.operator_details && serviceItem.operator_details[1]
        ? serviceItem.operator_details[1].toFixed(1)
        : "0.0";
    } catch (e) {
      return "";
    }
  };

  const seatTypes = () => {
    let seatTypes = serviceItem.seat_types
      ?.filter((item) => getFilteredSeats(item.label))
      ?.sort((a, b) => a.fare - b.fare) // Add this line to sort by fare
      ?.slice(0, 2)
      ?.map((type, i) =>
        exceptions.includes(type.label) ? null : (
          <div
            className={
              serviceItem.seat_types?.length > 2
                ? "w-[100%] flex flex-row justify-between "
                : "w-[100%] flex flex-row justify-between items-center"
            }
            key={i}
          >
            <span className="text-[13px] " style={{ marginLeft: "10px" }}>
              {type.label}
            </span>
            <span
              className={"text-[13px]  bold-text"}
              style={{ color: isSoldOut ? "#c0c0c0" : colors.priceColor }}
            >
              {currency(type.fare)}
            </span>
          </div>
        )
      );
    return seatTypes;
  };

  const getFilteredSeats = (item) => {
    return item;
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

  const amenities = () => {
    const raw = serviceItem?.operator_details?.[3];
    const list = Array.isArray(raw)
      ? raw
      : typeof raw === "string"
      ? raw.split("|").filter(Boolean)
      : [];

    const nodes = list
      .slice(0, 2)
      .map((am, i) => (
        <img
          key={i}
          className="amenity"
          height={15}
          src={getAmenitiesImage(amenitiesData?.[am]?.toLowerCase())}
          alt="icon"
        />
      ));

    return nodes;
  };

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

  let isConexion = false;

  if (serviceItem?.is_transpordo) {
    isConexion = true;
  }

  return (
    <div
      className={`relative  ${
        serviceItem.offer_text || serviceItem?.is_direct_trip
          ? "mb-[60px]"
          : "mb-[20px]"
      } ${
        serviceItem?.is_direct_trip ||
        isConexion ||
        serviceItem?.train_type_label === "Tren Express (Nuevo)" ||
        showTopLabel
          ? "mt-[30px]"
          : "mt-[20px]"
      }	`}
      style={{ backgroundColor: "#fff", zIndex: 1 }}
    >
      <div
        className={"border border-[#E6E6E6] rounded-[20px]"}
        style={{ backgroundColor: "#fff", zIndex: 1 }}
      >
        <div
          className={`p-[15px] ${
            serviceItem?.train_type_label === "Tren Express (Nuevo)" ||
            showTopLabel ||
            serviceItem?.is_direct_trip ||
            serviceItem?.is_transpordo
              ? "mt-[10px]"
              : ""
          }`}
        >
          {/* Header with operator info and favorite */}
          <div className="flex justify-between  mb-[8px]">
            <div className="flex items-center w-[50%] justify-between">
              <div className="w-[120px] overflow-y-hidden">
                <img
                  src={serviceItem.operator_details[0]}
                  alt="service logo"
                  className={`w-[100px] h-auto object-contain ${
                    isSoldOut ? "grayscale" : ""
                  }`}
                />
              </div>
              <div className="flex  text-[13px] bold-text">
                <img
                  src={serviceItem.icons.rating}
                  alt="origin"
                  className={`w-[10px] h-[10px] mr-[4px] object-contain mt-[2px]  ${
                    isSoldOut ? "grayscale" : ""
                  }`}
                />
                {getServiceStars(serviceItem)}
              </div>
            </div>
            <div className="flex justify-end  -mt-[5px] -mb-[5px] items-center pt-[5px] pb-[5px] text-center ">
              {serviceItem?.available_seats < 10 &&
                serviceItem?.available_seats > 0 && (
                  <span
                    className="text-[12px] text-[red] mt-1   flex
   justify-end
   
   
    pt-[5px] pb-[5px] pl-[15px] pr-[15px]
    rounded-[8px] bg-[#DE051414]"
                  >
                    ¡ Últimos Asientos!
                  </span>
                )}
            </div>
          </div>

          <div
            className="flex justify-between gap-[5px] w-full"
            onClick={onBookButtonPress}
          >
            {/* DATE AND TIME */}
            <div className="min-h-[2.5rem] flex flex-col justify-between gap-[4px] w-[50%]">
              <div
                className={`flex items-center text-[13px] justify-between  ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                <div className="flex items-center bold-text capitalize group ">
                  {orignLabel ? (
                    <div className="w-[60px]">{orignLabel}</div>
                  ) : (
                    <div className="w-[14px] h-auto mr-[5px]">
                      <img
                        src={serviceItem.icons?.origin}
                        alt="origin"
                        className={`w-[14px] h-auto mr-[5px] ${
                          isSoldOut ? "grayscale" : ""
                        }`}
                      />
                    </div>
                  )}
                  <span className="cursor-pointer black-text">
                    {DateService.getServiceItemDate(serviceItem.travel_date)}
                  </span>
                </div>
                <div className="mx-[8px]">•</div>
                <div className="font-[900] relative black-text">
                  {DateService.formatTime(serviceItem.dep_time)}
                </div>
              </div>
              <div
                className={`flex items-center text-[13px] justify-between ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                <div className="flex items-center bold-text capitalize group ">
                  {destinationLabel ? (
                    <div className="w-[60px]">{destinationLabel}</div>
                  ) : (
                    <div className="w-[14px] h-auto mr-[5px]">
                      <img
                        src={serviceItem.icons?.destination}
                        className={`w-[14px] h-auto mr-[5px] ${
                          isSoldOut ? "grayscale" : ""
                        }`}
                      />
                    </div>
                  )}
                  <span className="cursor-pointer black-text">
                    {DateService.getServiceItemDate(serviceItem.arrival_date)}
                  </span>
                </div>
                <div className="mx-[8px]">•</div>
                <div className="font-[900] black-text">
                  {DateService.formatTime(serviceItem.arr_time)}
                </div>
              </div>
            </div>
            {/* SEATS */}
            <div className="content-center w-[47%]">
              <div className="flex flex-col justify-between h-[2.5rem] gap-[5px]">
                {seatTypes()}

                {isSoldOut ? (
                  <div>
                    <span className={"text-[13px]"}>Agotado</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="bg-[#E6E6E6] -ml-[12px] -mr-[12px] mt-[10px] mb-[10px] h-[1px]"></div>
          <div
            className={`${"flex justify-between items-center mt-[15px] items-center "}`}
          >
            {/* Rating */}
            <div>
              <div className="flex items-center ">
                <div
                  className="flex items-center cursor-pointer "
                  style={{ color: isSoldOut ? "#c0c0c0" : "" }}
                >
                  <span className="ml-[3px] text-[#464647] text-[13px] bold-text">
                    {serviceItem.operator_details[2]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex  relative text-[#464647]">
              <div
                className={`w-[12px] h-auto mr-[2px] ${
                  isSoldOut ? "grayscale" : ""
                }`}
              >
                {renderIcon("hours", "12px")}
              </div>
              <div
                className={`cursor-default group text-[13px] ${
                  isSoldOut ? "text-[#c0c0c0]" : ""
                }`}
              >
                {serviceItem.duration}hrs
              </div>
            </div>

            <div>{amenities()}</div>

            {(serviceItem.is_change_ticket || isPetSeat) && (
              <div
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setAmenetiesAtomValue({
                    service: serviceItem,
                    showTopLabel: showTopLabel,
                  });
                }}
                className="flex items-center"
              >
                {serviceItem.pet_seat_info &&
                Object.keys(serviceItem.pet_seat_info).length > 0 ? (
                  <div className="flex items-center">
                    <div className={`relative group cursor-default `}>
                      <div className="flex items-center">
                        <div
                          className={`mr-[5px] ${isSoldOut ? "grayscale" : ""}`}
                        >
                          <LottiePlayer
                            animationData={serviceItem.icons.petFriendlyAnim}
                            width="20px"
                            height="20px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Flexible ticket */}
                {serviceItem.is_change_ticket && (
                  <div className="flex items-center">
                    <div className="relative group cursor-default">
                      <div className="flex items-center">
                        <div
                          className={`mr-[5px] ${isSoldOut ? "grayscale" : ""}`}
                        >
                          <LottiePlayer
                            animationData={serviceItem.icons.flexibleAnim}
                            width="20px"
                            height="20px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

                {(serviceItem.is_change_ticket || isPetSeat) && (
                  <img src={serviceItem.icons.plus} alt="icon" width={11} />
                )}
              </div>
            )}
          </div>
        </div>

        {serviceItem?.offer_text && (
          <div
            className={` text-white p-[10px_15px] text-left w-full flex items-center absolute -bottom-[36px] pt-[50px] z-10 rounded-b-[14px] text-[14px]`}
            style={{
              backgroundColor: isSoldOut ? "" : colors?.bottomStripColor,
              zIndex: -1,
              color: "#fff",
            }}
          >
            <LottiePlayer
              animationData={serviceItem.icons.promoAnim}
              width="18px"
              height="18px"
            />
            <span className="ml-[10px] text-[#fff] text-[13px]">
              {serviceItem?.offer_text}
            </span>
          </div>
        )}

        <div className="absolute -top-[14px] left-0  w-full flex items-center justify-end gap-[12px] pr-[20px] z-10 ">
          {showTopLabel && (
            <div
              className={`flex items-center gap-[2px] py-[5px] px-[10px] rounded-[38px] text-[12px]  z-20 ${
                isSoldOut ? "bg-[#ddd]" : ``
              }`}
              style={{
                backgroundColor: !isSoldOut && colors.ratingBottomColor,
              }}
            >
              <div className={isSoldOut ? "grayscale" : ""}>
                <LottiePlayer
                  animationData={serviceItem.icons.priorityStageAnim}
                  width="18px"
                  height="18px"
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

          {isConexion && (
            <div
              className={`flex items-center gap-[2px] py-[5px] text-white px-[10px] rounded-[38px] text-[12px] z-20 ${
                isSoldOut ? "text-white" : `text-[${colors.topLabelColor}]`
              }`}
              style={{
                backgroundColor: !isSoldOut && colors.ratingBottomColor,
              }}
            >
              {renderIcon("airportIcon", "14px")}

              <div>Conexión</div>
            </div>
          )}
          {serviceItem?.is_direct_trip && (
            <div
              className={`flex items-center gap-[2px] py-[5px] text-white px-[10px] rounded-[38px] text-[12px] z-20 `}
              style={{
                backgroundColor: isSoldOut ? "#ddd" : colors.tooltipColor,
              }}
            >
              <LottiePlayer
                animationData={serviceItem.icons.directoAnim}
                width="20px"
                height="20px"
              />
              <div>Directo</div>
            </div>
          )}
          {serviceItem?.train_type_label === "Tren Express (Nuevo)" && (
            <div
              className={`flex items-center gap-[2px] py-[5px] text-white px-[10px] rounded-[38px] text-[12px] z-20 `}
              style={{
                backgroundColor: isSoldOut ? "#ddd" : colors.tooltipColor,
              }}
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
    </div>
  );
}

export default ServiceItemMobile;
