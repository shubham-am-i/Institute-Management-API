import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "src/auth/user.entity";

@Entity()
export class Institute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    description: string;

    @Column("simple-array")
    subjects: string[];

    @OneToOne(type => User, user => user.institute, { eager: true })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
