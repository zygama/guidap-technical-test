import { getRepository } from 'typeorm';
import { Activity } from '../entity/Activity';

export class ActivityController {
    // static ActivityRepository = getRepository(Activity);
    // pagination : https://stackoverflow.com/questions/53922503/how-to-implement-pagination-in-nestjs-with-typeorm

    static async getAll(): Promise<Activity[]> {
        const activities = await getRepository(Activity).find();

        return activities;
    }

    static async findOne(id: number): Promise<Activity> {
        const results = await getRepository(Activity).findOne(id);
        console.log(results);

        return results;
    }

    static async findByName(name: string): Promise<Activity> {
        const results = await getRepository(Activity).find({ where: { name } });

        return results[0];
    }

    static async create(name: string): Promise<Activity> {
        const results = await getRepository(Activity).save({ name });

        return results;
    }
}
