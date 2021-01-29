import { Request, Response, Router } from 'express';
import { HobbyClubController } from '../../controller/HobbyClubController';

const routes = Router();
// const hobbyClubController = new HobbyClubController();

routes.get('/', async (req: Request, res: Response) => {
    const results = await HobbyClubController.getAll();
    return res.send(results);
});

routes.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await HobbyClubController.findOne(id);

    return res.send(result);
});

export default routes;
