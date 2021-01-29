import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', async (req: Request, res: Response) => {
    res.send('hobby club');
});

export default routes;
