import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeatherComponent } from './weather.component';

import { Observable, of } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import { IGeoLoc } from 'src/app/models/city.model';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import data from 'src/assets/data.json';
import forecastData from 'src/assets/forecast.data.json';

import { Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Forecast, IForecast } from 'src/app/models/forecast.model';

@Injectable()
class FakeCityService {

  constructor(
    private http: HttpClient,
  ) { }

  getCityFromAPI(location: String): Observable<any> {
    const { istanbul, berlin, amsterdam, london, prag } = data;
    switch (location) {
      case 'Istanbul': return of(istanbul);
      case 'Berlin': return of(berlin);
      case 'Amsterdam': return of(amsterdam);
      case 'London': return of(london);
      case 'Prag': return of(prag);
      default: return new Observable<any>();
    }
  }

  forecastHourlyInfoOfCity(geoLocation: IGeoLoc): Observable<any> {
    const { istanbul, berlin, amsterdam, london, prag } = forecastData;
    const locationName: String = this.getLocationNameFromGeoPoint(geoLocation);
    switch (locationName) {
      case 'istanbul': return of(istanbul);
      case 'berlin': return of(berlin);
      case 'amsterdam': return of(amsterdam);
      case 'london': return of(london);
      case 'prag': return of(prag);
      default: return new Observable<any>();
    }
  }

  private getLocationNameFromGeoPoint(geoLocation: IGeoLoc): String {
    const { istanbul, berlin, amsterdam, london, prag } = data;
    const { lon, lat } = geoLocation;
    if (istanbul.coord.lon == lon && istanbul.coord.lat == lat) {
      return "istanbul";
    }
    if (berlin.coord.lon == lon && berlin.coord.lat == lat) {
      return "berlin";
    }
    if (amsterdam.coord.lon == lon && amsterdam.coord.lat == lat) {
      return "amsterdam";
    }
    if (london.coord.lon == lon && london.coord.lat == lat) {
      return "london";
    }
    if (prag.coord.lon == lon && prag.coord.lat == lat) {
      return "prag";
    }

    return "";
  }
}

describe('WeatherComponent', () => {
  let comp: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let cityService: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AccordionModule
      ],
      // provide the component-under-test and dependent service
      providers: [
        WeatherComponent,
        { provide: CityService, useClass: FakeCityService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    cityService = TestBed.inject(CityService);
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it('should create', () => {
    expect(comp).toBeDefined();
  });

  it('should have cities to be empty after construction', () => {
    expect(comp.cities.length).toBe(0, 'cities must be empty');
  });

  it('should have selectedCityId to be 0 after construction', () => {
    expect(comp.selectedCityId).toBe(0, 'selected city id must be 0');
  });

  it('should have isLoading true after construction', () => {
    expect(comp.isLoading).toBeTrue();
  });

  it('should have oneAtATime false after construction', () => {
    expect(comp.oneAtATime).toBeTrue();
  });

  it('should have isClosed false after construction', () => {
    expect(comp.isClosed).toBeFalse();
  });

  it('should have hourlyForecast to be empty after construction', () => {
    expect(comp.hourlyForecast.length).toBe(0, 'Hourly forecast must be empty');
  });

  it('should have numberOfHourToBeShown to be set as 4 after construction', () => {
    expect(comp.numberOfHourToBeShown).toBe(4, '# of hours to be shown in the list');
  });

  it('should have isLoading false after initialization', () => {
    comp.ngOnInit();
    expect(comp.isLoading).toBeFalse();
  });

  it('cities\'s length should be 5 after initialization', () => {
    comp.ngOnInit();
    expect(comp.cities.length).toBe(5);
  });

  it('should display cities in UI after initialization', () => {
    fixture.detectChanges();
    const numberOfItem = el.querySelectorAll('accordion-group').length;
    expect(numberOfItem).toBe(5);
  });

  describe('should display 4 hours forecast in UI', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(cityService, 'forecastHourlyInfoOfCity');
    });

    it('after clicking Istanbul', fakeAsync(() => {
      let accordionGroup = el.querySelectorAll('accordion-group')[0]; // istanbul
      let btn: any = accordionGroup.querySelector('div[role="button"]');
      btn.click();
      tick(); // fixture.whenStable()
      fixture.detectChanges();
      expect(cityService.forecastHourlyInfoOfCity).toHaveBeenCalled();
    }));

    it('after clicking Berlin', fakeAsync(() => {
      let accordionGroup = el.querySelectorAll('accordion-group')[1]; // Berlin
      let btn: any = accordionGroup.querySelector('div[role="button"]');
      btn.click();
      tick(); // fixture.whenStable()
      fixture.detectChanges();
      expect(cityService.forecastHourlyInfoOfCity).toHaveBeenCalled();
    }));

    it('after clicking Amsterdam', fakeAsync(() => {
      let accordionGroup = el.querySelectorAll('accordion-group')[2]; // Amsterdam
      let btn: any = accordionGroup.querySelector('div[role="button"]');
      btn.click();
      tick(); // fixture.whenStable()
      fixture.detectChanges();
      expect(cityService.forecastHourlyInfoOfCity).toHaveBeenCalled();
    }));

    it('after clicking London', fakeAsync(() => {
      let accordionGroup = el.querySelectorAll('accordion-group')[3]; // London
      let btn: any = accordionGroup.querySelector('div[role="button"]');
      btn.click();
      tick(); // fixture.whenStable()
      fixture.detectChanges();
      expect(cityService.forecastHourlyInfoOfCity).toHaveBeenCalled();
    }));

    it('after clicking Prag', fakeAsync(() => {
      let accordionGroup = el.querySelectorAll('accordion-group')[4]; // Prag
      let btn: any = accordionGroup.querySelector('div[role="button"]');
      btn.click();
      tick(); // fixture.whenStable()
      fixture.detectChanges();
      expect(cityService.forecastHourlyInfoOfCity).toHaveBeenCalled();
    }));
  });

  it('should have isClosed false after closing forecast weather info of Istanbul', fakeAsync(() => {
    fixture.detectChanges();
    // open forecast weather info
    let accordionGroup = el.querySelectorAll('accordion-group')[0]; // Istanbul
    let btn: any = accordionGroup.querySelector('div[role="button"]');
    btn.click();
    tick(); // fixture.whenStable()
    fixture.detectChanges();

    // close info
    btn.click();
    tick();
    fixture.detectChanges();
    expect(comp.isClosed).toBeFalse();
  }));

  it('should have hourlyForecast empty after closing forecast weather info of Istanbul', fakeAsync(() => {
    fixture.detectChanges();
    // open forecast weather info
    let accordionGroup = el.querySelectorAll('accordion-group')[0]; // Istanbul
    let btn: any = accordionGroup.querySelector('div[role="button"]');
    btn.click();
    tick(); // fixture.whenStable()
    fixture.detectChanges();

    // close info
    btn.click();
    tick();
    fixture.detectChanges();
    expect(comp.hourlyForecast.length).toBe(0);
  }));

  it('should show 4 hours forecast data for Istanbul', fakeAsync(() => {
    fixture.detectChanges();
    // open forecast weather info
    let accordionGroup = el.querySelectorAll('accordion-group')[0]; // Istanbul
    let btn: any = accordionGroup.querySelector('div[role="button"]');
    btn.click();
    tick(); // fixture.whenStable()
    fixture.detectChanges();

    let listElement: any = accordionGroup.querySelector('.panel-body.card-block.card-body div');
    expect(listElement.children.length).toBe(4);
  }));

});
