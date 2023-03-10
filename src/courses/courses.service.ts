import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoursesDto } from './dto/create-courses.dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto/update-courses.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course) 
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}
    

    findAll() {
        return this.courseRepository.find({ relations: ['tags'] });
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne({ where: { id: +id }, relations: ['tags'] });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return course;
    }

    async create(createCourseDto: CreateCoursesDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadTagsByName(name))
        );
        const course =  this.courseRepository.create({
            ...createCourseDto,
            tags,
        });
        
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCoursesDto) {

        const tags = updateCourseDto.tags && (await Promise.all(
            updateCourseDto.tags.map(name => this.preloadTagsByName(name))
        ));

        const course = await this.courseRepository.preload({ 
            id: +id,
            ...updateCourseDto,
            tags,
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

        return this.courseRepository.softDelete({ id: +id });

    }

    private async preloadTagsByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ where: { name } });

        if(tag) {
            return tag;
        }

        return this.tagRepository.create({ name });
    }

}
