import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import Routes from './routes';

// import { Bootstrap } from './bootstrap';

createConnection().then(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', Routes);

    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });

    // Bootstrap()
    //     .catch((err) => {
    //         console.log(err);
    //     });
}).catch((err) => console.log(err));
