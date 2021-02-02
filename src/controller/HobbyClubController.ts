import { getRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Activity } from '../entity/Activity';
import { HobbyClub } from '../entity/HobbyClub';
import { ActivityController } from './ActivityController';

const defaultSkip = 0;
const defaultTake = 10;

export class HobbyClubController {
    static async getAll(skip: number = defaultSkip, take: number = defaultTake) {
        const results = await getRepository(HobbyClub).find({ relations: ['activities'], skip, take });

        return results;
    }

    static async findOne(id: number) {
        const results = await getRepository(HobbyClub).find({ where: { id }, relations: ['activities'] });

        return results[0];
    }

    static async findByActivity(activityName: string, skip: number = defaultSkip, take: number = defaultTake) {
        const formattedActivityName = activityName[0].toUpperCase() + activityName.toLowerCase().slice(1);

        const results = await getRepository(HobbyClub)
            .createQueryBuilder('hobby_club')
            .innerJoinAndSelect('hobby_club.activities', 'activity')
            .where('activity.name = :activityName', { activityName: formattedActivityName })
            .skip(skip)
            .take(take)
            .getMany();

        return results;
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

        return newHobbyClub.affected > 0;
    }

    static async delete(id: number) {
        const newHobbyClub = await getRepository(HobbyClub).delete(id);
        console.log(newHobbyClub);

        return newHobbyClub.affected > 0;
    }
}
