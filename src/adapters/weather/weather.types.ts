export enum WeatherApiMethods {
    CURRENT_WEATHER='/current.json',
    FORECAST='/forecast.json',
    SEARCH_OR_AUTOCOMPLETE='/search.json',
    HISTORY='/history.json',
    ALERTS='/alerts.json',
    MARINE='/marine.json',
    FUTURE='/future.json',
    TIMEZONE='/timezone.json',
    SPORTS='/sports.json',
    ASTRONOMY='/astronomy.json',
    IP_LOOKUP='/ip.json'
}

export interface WeatherParams {
    method: WeatherApiMethods,
    query: Record<string, string>
}

export interface WeatherApiErrorResponse {
    error: {
        code: number,
        message: string;
    }
}