export interface IForecast {
    temp: string;
    windSpeed: string;
    weather: IWeather;
    time: number;
}
export interface IWeather {
    main: string;
    desc: string;
    icon: string;
}

export class Forecast {
    public temp: string;
    public windSpeed: string;
    public weather: IWeather;
    public time: number;

    constructor(forecast: IForecast) {
        const { temp, windSpeed, weather, time } = forecast;
        this.temp = temp;
        this.windSpeed = windSpeed;
        this.weather = weather;
        this.time = time;
    }
}