import { Component, OnInit } from '@angular/core';
import { City, ECity, ICity, IGeoLoc } from '../../models/city.model';
import { Forecast, IForecast } from '../../models/forecast.model';

import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cities: City[] = [];
  selectedCityId: number = 0;

  isLoading: boolean = true;
  oneAtATime: boolean = true;
  isClosed: boolean = false;

  hourlyForecast: Forecast[] = [];
  numberOfHourToBeShown: number = 4; // # of hours to be shown in the list

  constructor(
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
    const cities = [
      { name: 'Istanbul', type: ECity.Istanbul, averageTemp: 0, windStrength: 0 },
      { name: 'Berlin', type: ECity.Berlin, averageTemp: 0, windStrength: 0 },
      { name: 'Amsterdam', type: ECity.Amsterdam, averageTemp: 0, windStrength: 0 },
      { name: 'London', type: ECity.London, averageTemp: 0, windStrength: 0 },
      { name: 'Prag', type: ECity.Prag, averageTemp: 0, windStrength: 0 },
    ];
    cities.map(async c => {
      await this.cityService.getCityFromAPI(c.name).subscribe((res: any) => {
        const {
          weather,
          main: { temp_min, temp_max },
          wind: { speed },
          coord: { lon, lat }
        } = res;
        const geoLoc: IGeoLoc = {
          lat,
          lon
        };
        let city = new City({
          ...c,
          averageTemp: Math.floor((temp_max + temp_min) / 2),
          windStrength: speed,
          icon: weather[0].icon,
          iconText: weather[0].description,
          geoLoc
        });
        this.cities.push(city);
      });
    });
    this.isLoading = false;
  }

  loadCityInfo(event: boolean, object: IGeoLoc, id: number) {
    this.selectedCityId = id;
    this.isClosed = event;
    if (event) {
      // this means it is opened
      let count: number = this.numberOfHourToBeShown;
      this.cityService.forecastHourlyInfoOfCity(object).subscribe((res: any) => {
        const { hourly } = res;
        hourly.every((hour: any) => {
          count -= 1;
          const {
            temp,
            wind_speed,
            dt,
            weather
          } = hour;
          const { main, description, icon } = weather[0];
          let forecast: IForecast = new Forecast({
            temp,
            windSpeed: wind_speed,
            weather: {
              main,
              desc: description,
              icon
            },
            time: dt
          });
          this.hourlyForecast.push(forecast);

          if (count === 0) {
            return false;
          }
          return true;
        });
      });
    } else {
      // close 
      // clear array
      this.hourlyForecast = [];
    }
  }

  formatTemp(text: string) {
    const decimalNumber = Number(text.toString().split(".")[1]);
    if (decimalNumber > 50) {
      return Math.floor(Number(text));
    }
    return Math.ceil(Number(text));
  }
}
