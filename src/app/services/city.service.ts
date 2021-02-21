import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IGeoLoc } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCityFromAPI(cityName: string) {
    const { apiURL, apiKey } = environment;
    const url = apiURL + 'weather?q=' + cityName + '&appid=' + apiKey + '&units=metric';
    return this.http.get(url);
  }

  forecastHourlyInfoOfCity(obj: IGeoLoc) {
    const { apiURL, apiKey } = environment;
    const { lat, lon } = obj;
    const url = apiURL + 'onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric&exclude=current,minutely,daily,alerts';
    return this.http.get(url);
  }
}
