import { getRepository } from 'typeorm';
import { HobbyClub } from '../entity/HobbyClub';

export class HobbyClubController {
    // static hobbyClubRepository = getRepository(HobbyClub);

    static async getAll() {
        const results = await getRepository(HobbyClub).find();
        console.log(results);

        return results;
    }

    static async findOne(id: number) {
        const results = await getRepository(HobbyClub).findOne(id);
        console.log(results);

        return results;
    }
}
