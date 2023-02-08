import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        const course = this.courses.find((course: Course) => course.id === Number(id));

        if(!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return course;
    }

    create(createCourseDto: any) {
        try {
            this.courses.push(createCourseDto);
            return `Curso foi criado`;
        }
        catch(error) {
            throw new HttpException(`Error in Created course`, HttpStatus.NOT_ACCEPTABLE);
        }
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
