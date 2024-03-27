import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExampleDto } from '../dto/example.dto';

@ApiTags('example')
@Controller('example')
export class ExampleController {
    @Get()
    findAll(): string {
        // Implement logic to fetch all examples from the database
        return 'Get all examples';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        // Implement logic to fetch a specific example by id from the database
        return `Get example with id ${id}`;
    }

    @Post()
    create(@Body() exampleDto: ExampleDto): string {
        // Implement logic to create a new example in the database using the provided exampleDto
        return 'Create example';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() exampleDto: ExampleDto): string {
        // Implement logic to update a specific example by id in the database using the provided exampleDto
        return `Update example with id ${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        // Implement logic to delete a specific example by id from the database
        return `Delete example with id ${id}`;
    }
}
