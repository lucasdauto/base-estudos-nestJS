import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

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
    create(@Body() body) {
        return this.coursesService.create(body);
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() body) {
        return this.coursesService.update(id, body);
    }

    @Delete('/delete/:id')
    destroy(@Param('id') id: string){
        return this.coursesService.destroy(id);
    }

}
