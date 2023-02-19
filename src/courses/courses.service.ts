import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoursesDto } from './dto/create-courses.dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto/update-courses.dto';
import { Course } from './entitites/course.entity';

@Injectable()
export class CoursesService {

    constructor(@InjectRepository(Course) private readonly courseRepository: Repository<Course>) {}
    

    findAll() {
        return this.courseRepository.find();
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne({ where: { id: +id } });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return course;
    }

    create(createCourseDto: CreateCoursesDto) {
        const course =  this.courseRepository.create(createCourseDto);
        
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCoursesDto) {
        const course = await this.courseRepository.preload({ 
            id: +id,
            ...updateCourseDto
        });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.save(course);
    }

    async destroy(id:string) 
    {
        const course = await this.courseRepository.findOne({ where: { id: +id } });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.remove(course);

    }

}
