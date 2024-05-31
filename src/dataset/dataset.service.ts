import { Injectable } from '@nestjs/common';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dataset } from './entities/dataset.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as cvs from 'csv-parser';

interface CsvRow {
  [key: string]: string;
}

@Injectable()
export class DatasetService {
  constructor(@InjectRepository(Dataset) private datasetRepository: Repository<Dataset>) { }

  create(createDatasetDto: CreateDatasetDto) {
    try {
      // Save the dataset to the database
      return this.datasetRepository.save(createDatasetDto);
    }
    catch (error) {
      // Return the error
      return error;
    }
  }

  findAll() {
    return this.datasetRepository.find();
  }

  findOne(id: number) {
    return this.datasetRepository.findOneBy({ id });
  }

  getData(id: number) {
    this.findOne(id).then((dataset) => {
      const result: CsvRow[] = [];
      fs.createReadStream(`./${dataset.data}`)
        .pipe(cvs())
        .on('data', (data) => result.push(data))
        .on('end', () => {
          console.log(result);
          return result;
        })
    }
    ).catch((error) => {
      return error;
    });
  };

  update(id: number, updateDatasetDto: UpdateDatasetDto) {
    return this.datasetRepository.update(id, updateDatasetDto);
  }

  remove(id: number) {
    return this.datasetRepository.delete(id);
  }
}
