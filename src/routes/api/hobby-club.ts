import { Request, Response, Router } from 'express';
import { UpdateResult } from 'typeorm';
import { HobbyClubController } from '../../controller/HobbyClubController';
import { HobbyClub } from '../../entity/HobbyClub';
import mapboxService from '../../service/mapbox';
import openWeatherService from '../../service/open-weather';
import { HobbyClubWithWeather } from '../../types';

const routes = Router();

routes.get('/', async (req: Request, res: Response) => {
    try {
        const { skip, limit } = req.query;
        const hobbyClubs = await HobbyClubController.getAll(
            parseInt(skip as string, 10),
            parseInt(limit as string, 10)
        );

        res.status(200).send({
            data: hobbyClubs,
            count: hobbyClubs.length
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

routes.get('/with-weather/:activity?', async (req: Request, res: Response) => {
    // Param :activity? is optionnal here so we can also get all hobby clubs with weather
    try {
        const hobbyClubsWithWeather: HobbyClubWithWeather[] = [];
        let hobbyClubs: HobbyClub[] = null;
        const skip = parseInt(req.query.skip as string, 10);
        const limit = parseInt(req.query.limit as string, 10);

        if (req.params.activity) {
            hobbyClubs = await HobbyClubController.findByActivity(
                req.params.activity,
                skip,
                limit
            );
        } else hobbyClubs = await HobbyClubController.getAll(skip, limit);

        for (const hobbyClub of hobbyClubs) {
            // Get [lat,lon] coordinates for this hobby club
            const hobbyClubCoordinates = await mapboxService.getLatLonFromAddress(hobbyClub.address);
            // Get weather from those coordinates
            const hobbyClubWeather = await openWeatherService.getWeatherFromCoordinates(hobbyClubCoordinates);

            hobbyClubsWithWeather.push({ ...hobbyClub, weather: { ...hobbyClubWeather } });
        }

        res.status(200).send({
            data: hobbyClubsWithWeather,
            count: hobbyClubsWithWeather.length
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routes.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await HobbyClubController.findOne(id);

        if (!result) {
            res.status(404).send({ message: 'Hobby club was not found' });
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
        const newHobblyClub = await HobbyClubController.save(req.body);

        res.status(201).send(newHobblyClub);
    } catch (err) {
        if (err.message) res.status(500).json({ message: err.message });
        else res.status(500).send(err);
    }
});

routes.patch('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        let updateResult: boolean = null;
        const potentialHobbyClub = await HobbyClubController.findOne(id);

        if (!potentialHobbyClub) {
            res.status(404).send({ message: 'Hobby club was not found. Impossible to update.' });
        } else if (!req.body.activities) {
            updateResult = await HobbyClubController.update(id, req.body);

            if (updateResult) res.status(200).send(updateResult);
            else res.status(404).send('Hobby club was not found');
        } else {
            // Delete and recreate (because of the relation not handled by type-orm)
            await HobbyClubController.delete(id);

            const updatedHobbyClub = HobbyClubController.save({
                ...potentialHobbyClub,
                activities: req.body.activities
            });
            res.status(200).send(updatedHobbyClub);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

routes.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleteResult = await HobbyClubController.delete(id);

        if (deleteResult) res.status(200).send(deleteResult);
        else res.status(404).send('Hobby club was not found');
    } catch (err) {
        res.status(500).send(err);
    }
});

export default routes;
