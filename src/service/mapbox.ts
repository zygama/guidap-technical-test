import axios from 'axios';
import { Coordinates } from '../types';

const mapboxUrl = 'https://api.mapbox.com/geocoding/v5';

const getLatLonFromAddress = async (address): Promise<Coordinates> => {
    try {
        const response = await axios.get(`${mapboxUrl}/mapbox.places/${address}.json`, {
            params: {
                access_token: process.env.mapbox_token
            }
        });

        return {
            lat: response.data.features[0].center[1],
            lon: response.data.features[0].center[0]
        };
    } catch (err) {
        console.log(err);
        throw new Error(`Cannot get coordinates from address: ${address}`);
    }
};

export default {
    getLatLonFromAddress
};
