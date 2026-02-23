import { Injectable } from "@nestjs/common";
import { constants } from "src/utils";

@Injectable()
export class StatusService {
    constructor() {}

    getStatus () {
        const startTime = constants.START_TIME;
        const endTime = constants.END_TIME;

        const istHour = Number(
            new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                hour12: false,
            }).format(new Date()),
        );

        if(istHour >= startTime && istHour < endTime) {
            return {
                status: "Online",
                reason: "Working hours."
            }
        }else {
            return {
                status: "Offline",
                reason: "Outside of working hours."
            }
        }
    }
}