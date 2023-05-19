import { toFormattedDate, toFormattedDateTime } from '../utils/date';

export const useDate = () => {
  return {
    toDate: toFormattedDate,
    toDateTime: toFormattedDateTime
  };
};
