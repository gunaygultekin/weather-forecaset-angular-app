import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CityService } from './city.service';
import { HttpClient } from '@angular/common/http';
import { IGeoLoc } from '../models/city.model';

declare var require: any; // http://www.sweet-web-design.com/wordpress/working-with-angular-how-to-fix-cannot-find-name-require-issue/3269/

describe('CityService', () => {
  let httpClient: HttpClient;
  let cityService: CityService;
  let httpMock: HttpTestingController;
  let data: any = require('../../assets/data.json');
  let forecastData: any = require('../../assets/forecast.data.json')

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CityService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    cityService = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Finally, assert that there are no outstanding requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(cityService).toBeTruthy();
  });

  describe('#getCityFromAPI', () => {

    it('should return weather information of Istanbul (called once)', (done) => {
      const name = "Istanbul";
      const { istanbul } = data;
      const expectedData: any = istanbul;
      // Make an HTTP GET request
      cityService.getCityFromAPI(name).subscribe((res: any) => {
        // When observable resolves, result should match test data
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw. 
      // City Service should have made one request to GET data from expected URL
      const apiURL = createAPIURL(name);

      // Assert that the request is a GET.
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      mockReq.flush(expectedData);
    });

    it('should return weather information of Berlin', () => {
      const name = "Berlin";
      const { berlin } = data;
      const expectedData: any = berlin;

      cityService.getCityFromAPI(name).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
      }, fail);

      const apiURL = createAPIURL(name);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return weather information of Amsterdam', () => {
      const name = "amsterdam";
      const { amsterdam } = data;
      const expectedData: any = amsterdam;

      cityService.getCityFromAPI(name).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
      }, fail);

      const apiURL = createAPIURL(name);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return weather information of London', () => {
      const name = "london";
      const { london } = data;
      const expectedData: any = london;

      cityService.getCityFromAPI(name).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
      }, fail);

      const apiURL = createAPIURL(name);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return weather information of Prag', () => {
      const name = "london";
      const { prag } = data;
      const expectedData: any = prag;

      cityService.getCityFromAPI(name).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
      }, fail);

      const apiURL = createAPIURL(name);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    function createAPIURL(location: String) {
      return "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=9c45acabb9a76fadf8628b03b205ec31&units=metric";
    }
  });

  describe('#forecastHourlyInfoOfCity', () => {
    it('should return forecast data for Istanbul', (done) => {
      const expectedData: any = forecastData.istanbul;
      const geoLocation: IGeoLoc = getGeoLocationFromData(data);
      cityService.forecastHourlyInfoOfCity(geoLocation).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      const apiURL = createAPIURL(geoLocation);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return forecast data for Amsterdam', (done) => {
      const expectedData: any = forecastData.amsterdam;
      const geoLocation: IGeoLoc = getGeoLocationFromData(data);
      cityService.forecastHourlyInfoOfCity(geoLocation).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      const apiURL = createAPIURL(geoLocation);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return forecast data for Berlin', (done) => {
      const expectedData: any = forecastData.berlin;
      const geoLocation: IGeoLoc = getGeoLocationFromData(data);
      cityService.forecastHourlyInfoOfCity(geoLocation).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      const apiURL = createAPIURL(geoLocation);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return forecast data for London', (done) => {
      const expectedData: any = forecastData.london;
      const geoLocation: IGeoLoc = getGeoLocationFromData(data);
      cityService.forecastHourlyInfoOfCity(geoLocation).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      const apiURL = createAPIURL(geoLocation);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    it('should return forecast data for Prag', (done) => {
      const expectedData: any = forecastData.prag;
      const geoLocation: IGeoLoc = getGeoLocationFromData(data);
      cityService.forecastHourlyInfoOfCity(geoLocation).subscribe((res: any) => {
        expect(res).toEqual(expectedData, 'should return expected data');
        done(); // called when the async work is complete.
      }, fail);

      const apiURL = createAPIURL(geoLocation);
      const mockReq = httpMock.expectOne(apiURL, 'response data from request');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(expectedData);
    });

    function createAPIURL(geoLocObj: IGeoLoc) {
      const { lat, lon } = geoLocObj;
      return "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=9c45acabb9a76fadf8628b03b205ec31&units=metric&exclude=current,minutely,daily,alerts";
    }

    function getGeoLocationFromData(data: any) {
      const {
        amsterdam: {
          coord: { lon, lat }
        }
      } = data;

      return {
        lat, lon
      };
    }
  });
});
