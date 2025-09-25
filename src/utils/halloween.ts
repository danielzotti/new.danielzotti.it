import {DateTime} from "luxon";

export function isHalloween(): boolean {
    const month = DateTime.now().month;
    const day = DateTime.now().day;

    const halloweenMonth = 10;
    const halloweenDay = 31;

    return month === halloweenMonth && day === halloweenDay;
};
