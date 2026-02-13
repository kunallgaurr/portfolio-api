import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {
    constructor() { }

    private isLeapYear(year: number) {
        if (year % 400 === 0) return true;
        if (year % 100 === 0) return false;
        return year % 4 === 0;
    }

    private getMonthName(monthIndex) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return months[monthIndex] ?? null;
    }

    private getDayName(dayIndex) {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        return days[dayIndex] ?? null;
    }

    private getRemainingDaysInYear(now: Date) {
        const end = new Date(now.getFullYear(), 11, 31);
        const diff = end.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    getDateInfo() {
        const now = new Date();
        return {
            date: now.getDate(),
            month: this.getMonthName(now.getMonth()),
            year: now.getFullYear(),
            day: this.getDayName(now.getDay()),
            totalDays: this.isLeapYear(now.getFullYear()) ? 366 : 365,
            remainingDays: this.getRemainingDaysInYear(now)
        }
    }
}