import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { format } from 'path';


@Controller('dataset')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        // Randomize the file name
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        // Add the file extension
        return cb(null, `${randomName}${file.originalname}`);
  
      }
    }),
    // Name of the file field
    
  }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        metadata: { type: 'string' },
        userId: { type: 'number' },
        file: { type: 'string', format: 'binary' },
      }
  }
  })
  create(@Body() createDatasetDto: CreateDatasetDto, @UploadedFile() file: Express.Multer.File){
    
    // The file uploaded should be a CSV file
    if(file.mimetype !== 'text/csv'){
      return 'The file uploaded should be a CSV file';
    }

    createDatasetDto.data = file.path;

    return this.datasetService.create(createDatasetDto);;
  }

  @Get()
  findAll() {
    return this.datasetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datasetService.findOne(+id);
  }

  // Get the csv file as a table
  @Get(':id/data')
  async getData(@Param('id') id: string) {
    return await this.datasetService.getData(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatasetDto: UpdateDatasetDto) {
    return this.datasetService.update(+id, updateDatasetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datasetService.remove(+id);
  }
}
