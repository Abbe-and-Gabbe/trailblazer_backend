import { Injectable } from '@nestjs/common';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dataset } from './entities/dataset.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class DatasetService {
  constructor(
    @InjectRepository(Dataset) private datasetRepository: Repository<Dataset>,
  ) {}

  create(createDatasetDto: CreateDatasetDto) {
    try {
      return this.datasetRepository.save(createDatasetDto);
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.datasetRepository.find();
  }

  findOne(id: number) {
    return this.datasetRepository.findOneBy({ id });
  }

  async getData(id: number): Promise<any[]> {
    try {
      const dataset = await this.findOne(id);
      if (!dataset) {
        return ['Dataset not found'];
      }

      const result = [];

      return new Promise((resolve, reject) => {
        fs.createReadStream(`./${dataset.data}`)
          .pipe(csvParser())
          .on('data', (data) => result.push(data))
          .on('end', () => resolve(result))
          .on('error', (error) => reject(error));
      });
    } catch (error) {
      return [`Error retrieving data: ${error.message}`];
    }
  }

  async processCsv(file: Express.Multer.File): Promise<any[]> {
    const csvData = [];
    const stream = Readable.from(file.buffer.toString());

    return new Promise((resolve, reject) => {
      stream.pipe(csvParser())
        .on('data', (row) => csvData.push(row))
        .on('end', () => resolve(csvData))
        .on('error', (error) => reject(error));
    });
  }

  update(id: number, updateDatasetDto: UpdateDatasetDto) {
    return this.datasetRepository.update(id, updateDatasetDto);
  }

  remove(id: number) {
    return this.datasetRepository.delete(id);
  }
}
