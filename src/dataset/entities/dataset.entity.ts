import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dataset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    // CSV file path
    @Column({ default: '' })
    data: string;

    @Column({ default: 1 })
    userId: number;

    @Column({ default: new Date()})
    createdAt: Date;

    @Column( { default: new Date()})
    updatedAt: Date;
}
