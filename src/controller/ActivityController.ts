import { getRepository } from 'typeorm';
import { Activity } from '../entity/Activity';

export class ActivityController {
    // static ActivityRepository = getRepository(Activity);

    static async getAll() {
        const activities = await getRepository(Activity).find();

        return activities;
    }

    static async findOne(id: number) {
        const results = await getRepository(Activity).findOne(id);
        console.log(results);

        return results;
    }
}
