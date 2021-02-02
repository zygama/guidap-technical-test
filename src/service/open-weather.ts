import axios from 'axios';
import { Coordinates, Weather } from '../types';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const exclude = 'minutely,hourly,daily,alerts';

const getWeatherFromCoordinates = async (addressCoordinates: Coordinates): Promise<Weather> => {
    try {
        const response = await axios.get(`${openWeatherUrl}`, {
            params: {
                lat: addressCoordinates.lat,
                lon: addressCoordinates.lon,
                appId: process.env.openweather_api_key,
                exclude // Only get current weather
            }
        });

        return {
            main: response.data.current.weather[0].main,
            description: response.data.current.weather[0].description
        };
    } catch (err) {
        console.log(err);
        throw new Error(`Cannot get weather from coordinates: ${addressCoordinates}`);
    }
};

export default {
    getWeatherFromCoordinates
};
