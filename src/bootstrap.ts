import { getRepository } from 'typeorm';
import { HobbyClub } from './entity/HobbyClub';
import { Activity } from './entity/Activity';

export const Bootstrap = async () => {
    // Create activities
    const activityRepo = getRepository(Activity);
    const activity1 = activityRepo.create({
        name: 'Accrobranche'
    });
    await activityRepo.save(activity1).catch((err) => {
        console.log(err);
    });
    const activity2 = activityRepo.create({
        name: 'Escalade'
    });
    await activityRepo.save(activity2).catch((err) => {
        console.log(err);
    });

    // const activities = await getRepository(Activity)
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Activity)
    //     .values([
    //         { name: 'Kitesurf' },
    //         { name: 'Karting' }
    //     ])
    //     .execute();

    // const test = await getRepository(HobbyClub)
    //     .createQueryBuilder('hobby_club')
    //     .leftJoinAndSelect('hobby_club.activities', 'Kitesurf')
    //     .getMany();
    // console.log(test[0].activities);

    // Create hobby clubs
    const hobbyClubRepo = getRepository(HobbyClub);
    const hobbyClub = hobbyClubRepo.create({
        name: 'Lac sesquierres 4',
        description: 'la description 3',
        address: '28 rue baqué, 31200 toulouse',
        website: 'http://lacsesquieres3.com',
        activities: [activity1, activity2]
    });
    await hobbyClubRepo.save(hobbyClub).catch((err) => {
        console.log(err);
    });
    console.log('Saved a new hobby club', hobbyClub);
};
