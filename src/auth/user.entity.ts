import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Institute } from "src/institute/entities/institute.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @OneToOne(type => Institute, institute => institute.user)
    institute: Institute;
}