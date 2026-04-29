import { DateTime } from "luxon";

export function isAprilsFool(): boolean {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const aprilsFoolMonth = 4;
  const aprilsFoolDay = 1;

  return month === aprilsFoolMonth && day === aprilsFoolDay;
}
