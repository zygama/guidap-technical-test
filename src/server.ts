import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import Routes from './routes';
// import { HobbyClub } from './entity/HobbyClub';
// import { Bootstrap } from './bootstrap';

createConnection().then(async (connection) => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', Routes);

    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });

    // console.log('Inserting a new hobby club into the database...');
    // const hobbyClub = new HobbyClub();
    // hobbyClub.name = 'Lac sesquierres';
    // hobbyClub.description = 'la description';
    // hobbyClub.address = '25 rue baqué';
    // hobbyClub.website = 'http://lacsesquieres.com';

    // await connection.manager.save(hobbyClub);
    // console.log(`Saved a new hobby club with id: ${hobbyClub.id}`);

    // console.log('Loading hobby clubs from the database...');
    // const hobbyClubs = await connection.manager.find(HobbyClub);
    // console.log('Loaded hobby clubs: ', hobbyClubs);

    // console.log('Here you can setup and run express/koa/any other framework.');
    // Bootstrap()
    //     .catch((err) => {
    //         console.log(err);
    //     });
}).catch((err) => console.log(err));
