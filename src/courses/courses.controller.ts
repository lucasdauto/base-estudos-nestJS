import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {}
    
    @Get('list')
    findAll(@Res() response) {
        // return 'Listagem de cursos';
        return response.status(200).send('Lista de cursos')
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param('id') id: string
    ) {
        return `Curso #${id}`;
    }

    @Post('create')
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body('name') body) {
        return body;
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() body) {
        return `Atualização do Curso #${id}`
    }

    @Delete('/delete/:id')
    destroy(@Param('id') id: string){
        return `O curso foi deletado #${id}`;
    }

}
