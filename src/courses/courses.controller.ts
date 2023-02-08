import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCoursesDto } from './dto/create-courses.dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto/update-courses.dto';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {}
    
    @Get('list')
    findAll() {
        // return 'Listagem de cursos';
        return this.coursesService.findAll();
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param('id') id: string
    ) {
        return this.coursesService.findOne(id);
    }

    @Post('create')
    create(@Body() createCourseDTO: CreateCoursesDto) {
        return this.coursesService.create(createCourseDTO);
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCoursesDto) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete('/delete/:id')
    destroy(@Param('id') id: string){
        return this.coursesService.destroy(id);
    }

}
