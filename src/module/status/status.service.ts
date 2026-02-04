import { Injectable } from "@nestjs/common";
import { last } from "rxjs";
import { WeatherAdapter } from "src/adapters/weather/weather.adapter";
import { constants } from "src/utils";

@Injectable()
export class StatusService {
    constructor() {}

    getStatus () {
        const startTime = constants.START_TIME;
        const endTime = constants.END_TIME;

        const date = new Date();
        const hour = date.getHours();

        if(hour >= startTime && hour < endTime) {
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