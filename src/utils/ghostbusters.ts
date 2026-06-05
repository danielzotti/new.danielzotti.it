import { DateTime } from "luxon";

export const GHOSTBUSTERS_MANUAL_ACTIVATION_KEY =
  "ghostbusters-manual-activation";
export const GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY =
  "ghostbusters-manual-activation-date";
export const GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT =
  "ghostbusters:manual-activation";

export function getGhostbustersStorageDay(): string {
  return DateTime.now().toISODate() ?? new Date().toDateString();
}

export function isGhostbustersManuallyActivatedToday(
  activation: string | null,
  activationDate: string | null,
): boolean {
  return (
    activation === "true" && activationDate === getGhostbustersStorageDay()
  );
}

export function isGhostbustersDay(): boolean {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const ghostbusterMonth = 6; // June
  const ghostbusterDay = 8;

  return month === ghostbusterMonth && day === ghostbusterDay;
}
