import { getRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Activity } from '../entity/Activity';
import { HobbyClub } from '../entity/HobbyClub';
import { ActivityController } from './ActivityController';

export class HobbyClubController {
    // static hobbyClubRepository = getRepository(HobbyClub);

    static async getAll() {
        const results = await getRepository(HobbyClub).find({ relations: ['activities'] });

        return results;
    }

    static async findOne(id: number) {
        const results = await getRepository(HobbyClub).find({ where: { id }, relations: ['activities'] });

        return results[0];
    }

    static async save(hobbyClubData: HobbyClub) {
        const activitiesId = []; // [{ id: xxx }, { id: yyy }]

        // Check if there is at least one activity for this new hobby club
        if (!hobbyClubData.activities) {
            throw new Error('You need to set at least one activity for this hobby club');
        }

        // Save or get id of activities passed to this hobby club
        for (let i = 0; i < hobbyClubData.activities.length; i++) {
            let newActivity: Activity = null;
            const maybeNewActivity = hobbyClubData.activities[i];
            const activity = await ActivityController.findByName(maybeNewActivity as string);

            if (activity) activitiesId.push({ id: activity.id });
            else {
                newActivity = await ActivityController.create(maybeNewActivity as string);

                activitiesId.push({ id: newActivity.id });
            }
        }

        const newHobbyClub = await getRepository(HobbyClub).save({
            ...hobbyClubData,
            activities: activitiesId
        });

        return newHobbyClub;
    }

    static async update(id: number, updateData: QueryDeepPartialEntity<HobbyClub>) {
        const newHobbyClub = await getRepository(HobbyClub).update(id, updateData);

        return newHobbyClub;
    }

    static async delete(id: number) {
        const newHobbyClub = await getRepository(HobbyClub).delete(id);

        return newHobbyClub;
    }
}
