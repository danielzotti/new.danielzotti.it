import { DateTime } from "luxon";

export function isHalloween(): boolean {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const halloweenMonth = 10;
  const halloweenDay = 31;

  return month === halloweenMonth && day === halloweenDay;
}

export function isXmasTime(): boolean {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const isDecember = month === 11;
  const isJanuary = month === 0;
  const now = DateTime.now();

  const start = DateTime.local(isJanuary ? year - 1 : year, 12, 8, 0, 0);
  const end = DateTime.local(isDecember ? year + 1 : year, 1, 7, 0, 0);

  return now >= start && now <= end;
}
