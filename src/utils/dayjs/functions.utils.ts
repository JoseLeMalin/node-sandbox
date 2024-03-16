import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);

export const getUTCFormattedDate = (date?: string) => {
  if (!date) return dayjs().utc().toISOString();
  return dayjs(date).utc().toISOString();
}
;
export const getUTCDatePostGres = (date?: string) => {
  if (!date) return dayjs().utc().toDate();
  return dayjs(date).utc().toDate();
};

export const sortAscendDates = (datesToSort: string[]) =>
  datesToSort.sort((a, b) =>
    dayjs(a).isBefore(b) ? -1 : dayjs(a).isAfter(b) ? 1 : 0,
  );

export const sortDescDates = (datesToSort: string[]) =>
  datesToSort.sort((a, b) =>
    dayjs(a).isBefore(b) ? 1 : dayjs(a).isAfter(b) ? -1 : 0,
  );
