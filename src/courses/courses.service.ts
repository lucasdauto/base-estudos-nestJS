import { Injectable } from '@nestjs/common';
import { Course } from './entitites/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Fundamentos do framework NestJS',
            description: "Curso do framework NestJS",
            tags: [
                "NodeJS",
                "NestJS",
                "Javascript",
                "Framework"
            ]
        },
    ];

    findAll() {
        return this.courses;
    }

    findOne(id: string) {
        return this.courses.find((course: Course) => course.id === Number(id));
    }

    create(createCourseDto: any) {
        this.courses.push(createCourseDto);
    }

    update(id: string, updateCourseDto: any) {
        const indexCourses = this.courses.findIndex(course => course.id === Number(id))

        this.courses[indexCourses] = updateCourseDto;
    }

    destroy(id:string) 
    {
        const index =  this.courses.findIndex(course => course.id === Number(id));

        if(index >= 0){
            this.courses.splice(index, 1);
        }
    }

}
