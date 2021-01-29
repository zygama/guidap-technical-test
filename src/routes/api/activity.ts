import { Request, Response, Router } from 'express';
import { ActivityController } from '../../controller/ActivityController';

const routes = Router();
// const ActivityController = new ActivityController();

routes.get('/', async (req: Request, res: Response) => {
    // const results = (await ActivityController.getAll()).map((activity) => activity.name);
    const results = await ActivityController.getAll();
    return res.send(results);
});

export default routes;
