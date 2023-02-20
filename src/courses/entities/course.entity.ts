import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Tag } from "./tags.entity";

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @DeleteDateColumn()
    deletedAt: Timestamp;

    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.courses, { cascade: true })
    tags: Tag[];
}
