import { HobbyClub } from '../entity/HobbyClub';

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Weather {
    main: string;
    description: string;
}

export interface HobbyClubWithWeather extends HobbyClub {
    weather: Weather;
}
