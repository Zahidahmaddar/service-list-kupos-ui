/**
 * DateService utility for formatting dates and times
 */
const datePostfix = "T00:00:00.000Z";

const DateService = {
  changeDateFormat: (
    date: string,
    fromFormat = "dd/mm/yyyy",
    toFormat = "mm-dd-yyyy",
  ): string => {
    if (date) {
      let d, m, y;

      if (fromFormat == "dd/mm/yyyy" || fromFormat == "dd-mm-yyyy") {
        d = date.substr(0, 2);
        m = date.substr(3, 2);
        y = date.substr(6, 4);
      } else if (fromFormat == "mm/dd/yyyy" || fromFormat == "mm-dd-yyyy") {
        m = date.substr(0, 2);
        d = date.substr(3, 2);
        y = date.substr(6, 4);
      } else if (fromFormat == "yyyy/mm/dd" || fromFormat == "yyyy-mm-dd") {
        y = date.substr(0, 4);
        m = date.substr(5, 2);
        d = date.substr(8, 2);
      }
      return toFormat.replace("dd", d).replace("mm", m).replace("yyyy", y);
    }
    return "";
  },

  getDayname: (day: number, type = "half"): string => {
    const days = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
    const fullDays = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    return type === "half" ? days[day] : fullDays[day];
  },

  getMonthName: (month: number, type = "half"): string => {
    const months = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];
    const fullMonths = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return type === "half" ? months[month] : fullMonths[month];
  },

  getDayNameFromDate: (
    date: string,
    format = "dd/mm/yyyy",
    type = "half",
  ): string => {
    let d = DateService.changeDateFormat(date, format, "yyyy-mm-dd");
    if (!d) {
      return "";
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let day = dt.getDay();
    return DateService.getDayname(day, type);
  },

  getDateFromDate: (dateStr: string, format = "yyyy-mm-dd"): string => {
    let d = DateService.changeDateFormat(dateStr, format, "yyyy-mm-dd");
    if (!d) {
      return "";
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let dateNum = dt.getDate().toString();
    return dateNum.length === 1 ? "0" + dateNum : dateNum;
  },

  getMonthFromDate: (dateStr: string, format = "yyyy-mm-dd"): string => {
    let d = DateService.changeDateFormat(dateStr, format, "yyyy-mm-dd");
    if (!d) {
      return "";
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let month = (dt.getMonth() + 1).toString();
    return month.length === 1 ? "0" + month : month;
  },

  getMonthNameFromDate: (
    dateStr: string,
    format = "dd/mm/yyyy",
    type = "half",
  ): string => {
    let d = DateService.changeDateFormat(dateStr, format, "yyyy-mm-dd");
    if (!d) {
      return "";
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let month = dt.getMonth();
    return DateService.getMonthName(month, type);
  },

  getYearFromDate: (dateStr: string, format = "dd/mm/yyyy"): string => {
    let d = DateService.changeDateFormat(dateStr, format, "yyyy-mm-dd");
    if (!d) {
      return "";
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let year = dt.getFullYear();
    return year.toString();
  },

  getServiceItemDate: (dateStr: string, format = "yyyy-mm-dd"): string => {
    let dayName = DateService.getDayNameFromDate(dateStr, format);
    let day = DateService.getDateFromDate(dateStr, format);
    let month = DateService.getMonthFromDate(dateStr, format);
    return dayName + ", " + day + "/" + month;
  },

  /**
   * Format time string (HH:MM) to AM/PM format
   */
  formatTime: (time: string): string => {
    if (time?.includes(":")) {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));

      let formattedHours = date.getHours();
      let formattedMinutes = date.getMinutes();

      if (formattedHours === 0) {
        formattedHours = 12;
      }

      const hoursStr =
        formattedHours < 10 ? "0" + formattedHours : formattedHours.toString();
      const minutesStr =
        formattedMinutes < 10
          ? "0" + formattedMinutes
          : formattedMinutes.toString();

      const format = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return format
        .format(date)
        .replace(/\d+:\d+/, `${hoursStr}:${minutesStr}`);
    } else {
      return time;
    }
  },
};

export default DateService;
