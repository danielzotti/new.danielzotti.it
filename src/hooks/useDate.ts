import { toFormattedDate, toFormattedDateTime } from 'src/utils/date';

export const useDate = () => {
  return {
    toDate: toFormattedDate,
    toDateTime: toFormattedDateTime
  };
};
