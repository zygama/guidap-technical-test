import { Request, Response, Router } from 'express';
import { ActivityController } from '../../controller/ActivityController';

const routes = Router();

routes.get('/', async (req: Request, res: Response) => {
    try {
        const results = await ActivityController.getAll();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

routes.get('/names', async (req: Request, res: Response) => {
    try {
        const results = (await ActivityController.getAll()).map((activity) => activity.name);
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default routes;
