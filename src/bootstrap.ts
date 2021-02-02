import { getRepository } from 'typeorm';
import { HobbyClub } from './entity/HobbyClub';
import { Activity } from './entity/Activity';

export const Bootstrap = async () => {
    // ======
    // ====== Create activities ======
    // ======
    const activityRepo = getRepository(Activity);
    // ==> Wakeboard
    const activityWakeboard = activityRepo.create({
        name: 'Wakeboard'
    });
    await activityRepo.save(activityWakeboard).catch((err) => {
        console.log(err);
    });
    // ==> SkiNautique
    const activitySkiNautique = activityRepo.create({
        name: 'Ski nautique'
    });
    await activityRepo.save(activitySkiNautique).catch((err) => {
        console.log(err);
    });
    // ==> Kitesurf
    const activityKitesurf = activityRepo.create({
        name: 'Kitesurf'
    });
    await activityRepo.save(activityKitesurf).catch((err) => {
        console.log(err);
    });
    // ==> Canoe
    const activityCanoe = activityRepo.create({
        name: 'Canoe'
    });
    await activityRepo.save(activityCanoe).catch((err) => {
        console.log(err);
    });
    // ==> Parapente
    const activityParapente = activityRepo.create({
        name: 'Parapente'
    });
    await activityRepo.save(activityParapente).catch((err) => {
        console.log(err);
    });

    // ======
    // ====== Create hobby clubs ======
    // ======
    const hobbyClubRepo = getRepository(HobbyClub);

    // ==> 1: Base de Loisirs Sesquières
    let hobbyClub = hobbyClubRepo.create({
        name: 'Base de Loisirs Sesquières',
        description: 'Base de Loisirs Sesquières description',
        address: 'Allée des Foulques, 31200 toulouse',
        website: 'https://www.wampark.fr/toulouse-sesquieres/',
        activities: [activityWakeboard, activitySkiNautique]
    });
    await hobbyClubRepo.save(hobbyClub).catch((err) => {
        console.log(err);
    });
    // ==> 2: Akila Gruissan
    hobbyClub = hobbyClubRepo.create({
        name: 'Akila Gruissan',
        description: 'Akila Gruissan description',
        address: '50 avenue de la jetée, 11430 Gruissan',
        website: 'https://www.akila-centers.com/',
        activities: [activityKitesurf]
    });
    await hobbyClubRepo.save(hobbyClub).catch((err) => {
        console.log(err);
    });
    // ==> 3: Canoe 31
    hobbyClub = hobbyClubRepo.create({
        name: 'Canoe 31',
        description: 'Canoe 31 description',
        address: 'Chemin de Catcharry, 31150 Gagnac',
        website: 'https://canoe31.fr/fr',
        activities: [activityCanoe]
    });
    await hobbyClubRepo.save(hobbyClub).catch((err) => {
        console.log(err);
    });
    // ==> 4: Kymaya
    hobbyClub = hobbyClubRepo.create({
        name: 'Kymaya',
        description: 'Kymaya description',
        address: '3 Chemin de Rouy, 09400 Mercus-Garrabet',
        website: 'https://www.kymaya.com/',
        activities: [activityParapente]
    });
    await hobbyClubRepo.save(hobbyClub).catch((err) => {
        console.log(err);
    });
};
