import { Request, Response, Router } from 'express';
import { UpdateResult } from 'typeorm';
import { HobbyClubController } from '../../controller/HobbyClubController';

const routes = Router();
// const hobbyClubController = new HobbyClubController();

routes.get('/', async (req: Request, res: Response) => {
    try {
        const results = await HobbyClubController.getAll();

        res.status(200).send(results);
    } catch (err) {
        res.status(500).send(err);
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
        let updateResult: UpdateResult = null;
        const potentialHobbyClub = await HobbyClubController.findOne(id);

        if (!potentialHobbyClub) {
            res.status(404).send({ message: 'Hobby club was not found. Impossible to update.' });
        } else if (!req.body.activities) {
            updateResult = await HobbyClubController.update(id, req.body);
            res.status(200).send(updateResult);
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
        const result = await HobbyClubController.delete(id);

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default routes;
