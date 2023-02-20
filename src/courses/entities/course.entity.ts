import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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
    deletedAt: Date;

    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.courses, { cascade: true })
    tags: Tag[];
}
