import {
    Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
} from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class HobbyClub {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ unique: true })
    address: string;

    @Column({ nullable: true })
    website: string;

    @ManyToMany(() => Activity)
    @JoinTable({ name: 'hobby_club_activities' })
    activities: Activity[];
}
