export interface ICity {
  name: string;
  type: ECity;
  averageTemp: number;
  windStrength: number;
  icon: string;
  iconText: string;
  geoLoc: IGeoLoc;
}

// Geographical coordinates (latitude, longitude)
export interface IGeoLoc {
  lat: number,
  lon: number
}

export enum ECity {
  Istanbul,
  Berlin,
  Amsterdam,
  London,
  Prag
}

export class City {
  public name: string;
  public type: ECity;
  public averageTemp: number;
  public windStrength: number;
  public icon: string;
  public iconText: string;
  public geoLoc: IGeoLoc;

  constructor(city: ICity) {
    const { name, type, averageTemp, windStrength, icon, iconText, geoLoc } = city;
    this.name = name;
    this.type = type;
    this.averageTemp = averageTemp;
    this.windStrength = windStrength;
    this.icon = icon;
    this.iconText = iconText;
    this.geoLoc = geoLoc
  }
}